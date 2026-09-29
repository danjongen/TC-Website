"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Homepage hero point cloud on raw WebGL1 (no three.js).
 *
 * Each point is one pixel of a cover-fit photo. The cloud assembles from a
 * scatter, morphs between the slides, and disperses as the page scrolls
 * (setScroll). Rendering stops whenever the mount is off screen, the tab is
 * hidden, or the cloud is fully dispersed; one final frame is drawn so the
 * resting state is correct, and the clock only advances while running.
 */

const VERT = /* glsl */ `
  precision highp float;

  attribute vec2 aGrid;        // fixed xy position on the image plane
  attribute vec3 aScatter;
  attribute float aStagger;
  attribute vec3 aColorA;
  attribute vec3 aColorB;
  attribute float aDepthA;
  attribute float aDepthB;
  uniform mat4 uModelView;
  uniform mat4 uProjection;
  uniform float uProgress;     // 0 scattered -> 1 assembled
  uniform float uScroll;       // disperse on scroll
  uniform float uMix;          // morph between image A and B
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uPointScale;   // keeps dot coverage constant across grid densities
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float p = smoothstep(aStagger * 0.6, aStagger * 0.6 + 0.4, uProgress);
    float d = uScroll;

    // morph: per-point staggered crossfade between the two photos
    float m = smoothstep(aStagger * 0.4, aStagger * 0.4 + 0.6, uMix);
    vec3 color = mix(aColorA, aColorB, m);
    float depth = mix(aDepthA, aDepthB, m);

    vec3 target = vec3(aGrid, depth);
    vec3 pos = mix(aScatter, target, p);
    pos = mix(pos, aScatter * 1.6 + vec3(0.0, 0.0, 6.0), d * d);

    // swirl burst while morphing: the image dissolves and re-forms
    float burst = sin(m * 3.14159);
    pos.x += sin(aStagger * 40.0 + uTime) * 0.22 * burst;
    pos.y += cos(aStagger * 31.0 - uTime) * 0.18 * burst;
    pos.z += sin(aStagger * 17.0) * 0.9 * burst;

    // organic drift
    pos.x += sin(uTime * 0.4 + aGrid.y * 3.0) * 0.01 * p;
    pos.y += cos(uTime * 0.5 + aGrid.x * 3.0) * 0.01 * p;

    // mouse parallax + repulsion
    pos.xy += uMouse * 0.12 * (0.4 + pos.z);
    vec2 mpos = uMouse * vec2(2.4, 1.5);
    vec2 away = pos.xy - mpos;
    float rep = smoothstep(0.7, 0.0, length(away));
    pos.xy += normalize(away + vec2(0.0001)) * rep * 0.22 * p;
    pos.z += rep * 0.4 * p;

    vec4 mv = uModelView * vec4(pos, 1.0);
    gl_Position = uProjection * mv;
    gl_PointSize = (0.6 + 0.85 * p) * uPixelRatio * uPointScale * (3.2 / -mv.z);

    float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vColor = color * 1.7;
    // dark pixels stay nearly invisible so the photo reads crisply
    vAlpha = (0.2 + 0.8 * p) * (1.0 - d) * (0.15 + 0.85 * smoothstep(0.01, 0.2, lum));
  }
`

const FRAG = /* glsl */ `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float glow = smoothstep(0.5, 0.05, r);
    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`

export type PointCloudHandles = {
  setScroll: (v: number) => void
}

type Sampled = { colors: Float32Array; depths: Float32Array }

function sampleImage(img: HTMLImageElement, cols: number, rows: number): Sampled {
  const c = document.createElement("canvas")
  c.width = cols
  c.height = rows
  const cx = c.getContext("2d")!
  // cover-fit
  const scale = Math.max(cols / img.width, rows / img.height)
  const sw = cols / scale
  const sh = rows / scale
  cx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, cols, rows)
  const data = cx.getImageData(0, 0, cols, rows).data
  const n = cols * rows
  const colors = new Float32Array(n * 3)
  const depths = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const r = data[i * 4] / 255
    const g = data[i * 4 + 1] / 255
    const b = data[i * 4 + 2] / 255
    colors[i * 3] = r
    colors[i * 3 + 1] = g
    colors[i * 3 + 2] = b
    depths[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b - 0.5) * 0.5
  }
  return { colors, depths }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/* ---------- inline matrix helpers (column-major, as uniformMatrix4fv expects) */

const FOV_Y = (45 * Math.PI) / 180
const NEAR = 0.1
const FAR = 50

/** Same matrix as three's PerspectiveCamera(45, aspect, 0.1, 50). */
function perspective(out: Float32Array, aspect: number) {
  const f = 1 / Math.tan(FOV_Y / 2)
  out.fill(0)
  out[0] = f / aspect
  out[5] = f
  out[10] = -(FAR + NEAR) / (FAR - NEAR)
  out[11] = -1
  out[14] = (-2 * FAR * NEAR) / (FAR - NEAR)
}

/**
 * View * model for a camera at (0, 0, camZ) looking down -Z and a model
 * rotated by Euler (rx, ry, 0) in three's default XYZ order (R = Rx * Ry),
 * then uniformly scaled by s (cover-fit after a resize, see resize()).
 */
function modelView(out: Float32Array, rx: number, ry: number, camZ: number, s = 1) {
  const a = Math.cos(rx)
  const b = Math.sin(rx)
  const c = Math.cos(ry)
  const d = Math.sin(ry)
  // column 0
  out[0] = c * s
  out[1] = b * d * s
  out[2] = -a * d * s
  out[3] = 0
  // column 1
  out[4] = 0
  out[5] = a * s
  out[6] = b * s
  out[7] = 0
  // column 2
  out[8] = d * s
  out[9] = -b * c * s
  out[10] = a * c * s
  out[11] = 0
  // column 3: camera translation
  out[12] = 0
  out[13] = 0
  out[14] = -camZ
  out[15] = 1
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}

const ATTRS = ["aGrid", "aScatter", "aStagger", "aColorA", "aColorB", "aDepthA", "aDepthB"] as const

export function PointCloud({
  images,
  interval = 7000,
  onReady,
  onSlide,
  handlesRef,
}: {
  images: string[]
  interval?: number
  onReady?: () => void
  onSlide?: (index: number) => void
  handlesRef?: React.MutableRefObject<PointCloudHandles | null>
}) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  // Bumped when the viewport changes shape a lot (e.g. a phone rotating): the
  // effect re-runs and rebuilds a grid in the new shape.
  const [epoch, setEpoch] = useState(0)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const canvas = document.createElement("canvas")
    canvas.style.display = "block"
    canvas.style.width = "100%"
    canvas.style.height = "100%"

    let gl: WebGLRenderingContext | null = null
    try {
      gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }) as WebGLRenderingContext | null
    } catch {
      gl = null
    }
    if (!gl) {
      setFailed(true)
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vs || !fs || !program) {
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      if (program) gl.deleteProgram(program)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      setFailed(true)
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    ATTRS.forEach((name, i) => gl!.bindAttribLocation(program, i, name))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteProgram(program)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      setFailed(true)
      return
    }
    gl.useProgram(program)
    mount.appendChild(canvas)

    // Fixed pipeline state: additive, no depth. This is exactly what three's
    // AdditiveBlending sets for a non-premultiplied ShaderMaterial (colour
    // SRC_ALPHA, ONE; alpha ONE, ONE), so the canvas composites identically.
    gl.disable(gl.DEPTH_TEST)
    gl.depthMask(false)
    gl.enable(gl.BLEND)
    gl.blendEquation(gl.FUNC_ADD)
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE)
    gl.clearColor(0, 0, 0, 0)

    const loc = {
      modelView: gl.getUniformLocation(program, "uModelView"),
      projection: gl.getUniformLocation(program, "uProjection"),
      progress: gl.getUniformLocation(program, "uProgress"),
      scroll: gl.getUniformLocation(program, "uScroll"),
      mix: gl.getUniformLocation(program, "uMix"),
      time: gl.getUniformLocation(program, "uTime"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      pixelRatio: gl.getUniformLocation(program, "uPixelRatio"),
      pointScale: gl.getUniformLocation(program, "uPointScale"),
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
    gl.uniform1f(loc.pixelRatio, pixelRatio)

    const proj = new Float32Array(16)
    const mvMat = new Float32Array(16)

    // uniform state
    let progress = reduced ? 1 : 0
    let scroll = 0
    let mixV = 0
    const mouse = { x: 0, y: 0 }
    const mouseTarget = { x: 0, y: 0 }

    // geometry: static buffers plus two ping-pong slots for colour and depth
    const buffers: WebGLBuffer[] = []
    const colorBufs: WebGLBuffer[] = []
    const depthBufs: WebGLBuffer[] = []
    let slotA = 0 // which slot currently feeds aColorA / aDepthA
    let count = 0

    const makeBuffer = (data: Float32Array, usage: number) => {
      const buf = gl!.createBuffer()!
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.bufferData(gl!.ARRAY_BUFFER, data, usage)
      buffers.push(buf)
      return buf
    }
    const bindAttr = (index: number, buf: WebGLBuffer, size: number) => {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.enableVertexAttribArray(index)
      gl!.vertexAttribPointer(index, size, gl!.FLOAT, false, 0, 0)
    }
    const bindSlots = () => {
      const b = slotA ^ 1
      bindAttr(3, colorBufs[slotA], 3)
      bindAttr(4, colorBufs[b], 3)
      bindAttr(5, depthBufs[slotA], 1)
      bindAttr(6, depthBufs[b], 1)
    }
    const upload = (buf: WebGLBuffer, data: Float32Array) => {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, data)
    }

    // morph state
    const sampled: Sampled[] = []
    let current = 0
    let morphStart = -1
    let nextMorphAt = -1
    const MORPH_S = 2.2

    // The grid takes the shape of the viewport (object-cover style) so every
    // point lands on screen: a landscape grid on a portrait phone would put
    // three quarters of the points off screen and leave the rest sparse.
    // It overscans the camera frustum at z = 0 by 8% for parallax, as the
    // original 4.6-unit grid did on a 16:10 screen.
    const viewW = mount.clientWidth || window.innerWidth
    const viewH = mount.clientHeight || window.innerHeight
    const mountAspect = viewW / viewH
    const gridAspect = Math.min(2.4, Math.max(0.4, mountAspect))
    const OVERSCAN = 1.08
    const frustumH = 2 * 3.2 * Math.tan(FOV_Y / 2)
    const GRID_H = frustumH * OVERSCAN
    const GRID_W = GRID_H * gridAspect
    const BUDGET = viewW < 768 ? 60_000 : 230_000
    const COLS = Math.round(Math.sqrt(BUDGET * gridAspect))
    const ROWS = Math.round(COLS / gridAspect)
    // Dots grow with their spacing so the photo reads with the same coverage
    // as the original 760-column grid (about 2.06 CSS px between dots at 1440px).
    const spacing = viewW / (COLS / OVERSCAN)
    gl.uniform1f(loc.pointScale, Math.min(1.6, Math.max(1, spacing / 2.06)))

    // loop state: t is an accumulated clock that only advances while running
    let raf = 0
    let running = false
    let last = 0
    let t = 0
    let ready = false
    let inView = true
    let pageVisible = document.visibilityState === "visible"
    let cancelled = false
    let lost = false

    const scheduleMorph = () => {
      if (sampled.length < 2 || reduced) return
      nextMorphAt = t + interval / 1000
    }

    const step = () => {
      if (!reduced) {
        const k = Math.min(1, t / 3.5)
        progress = 1 - Math.pow(1 - k, 3)
      }
      mouse.x += (mouseTarget.x - mouse.x) * 0.045
      mouse.y += (mouseTarget.y - mouse.y) * 0.045

      if (morphStart < 0 && nextMorphAt >= 0 && t >= nextMorphAt) {
        morphStart = t
        nextMorphAt = -1
      }
      if (morphStart >= 0) {
        const mk = Math.min(1, (t - morphStart) / MORPH_S)
        mixV = mk * mk * (3 - 2 * mk)
        if (mk >= 1) {
          // B becomes the new A; stage the following slide into the freed slot
          current = (current + 1) % sampled.length
          slotA ^= 1
          const nxt = sampled[(current + 1) % sampled.length]
          upload(colorBufs[slotA ^ 1], nxt.colors)
          upload(depthBufs[slotA ^ 1], nxt.depths)
          bindSlots()
          mixV = 0
          morphStart = -1
          onSlide?.(current)
          scheduleMorph()
        }
      }
    }

    const draw = () => {
      if (!gl || lost) return
      gl.clear(gl.COLOR_BUFFER_BIT)
      if (!ready) return
      // slow 3D presence: the whole cloud breathes and banks
      const ry = Math.sin(t * 0.1) * 0.025 + mouse.x * 0.05
      const rx = Math.cos(t * 0.13) * 0.015 - mouse.y * 0.035
      modelView(mvMat, rx, ry, 3.2 + Math.sin(t * 0.15) * 0.08, coverScale)
      gl.uniformMatrix4fv(loc.modelView, false, mvMat)
      gl.uniformMatrix4fv(loc.projection, false, proj)
      gl.uniform1f(loc.progress, progress)
      gl.uniform1f(loc.scroll, scroll)
      gl.uniform1f(loc.mix, mixV)
      gl.uniform1f(loc.time, t)
      gl.uniform2f(loc.mouse, mouse.x, mouse.y)
      gl.drawArrays(gl.POINTS, 0, count)
    }

    const frame = (now: number) => {
      raf = 0
      if (cancelled || lost) return
      if (running) {
        // first frame after a (re)start advances by zero: no time jumps
        t += last ? Math.min(0.1, (now - last) / 1000) : 0
        last = now
        step()
      }
      draw()
      if (running) raf = requestAnimationFrame(frame)
    }

    const requestFrame = () => {
      if (!raf && !cancelled && !lost) raf = requestAnimationFrame(frame)
    }

    // Run only while it can be seen. On stop, the pending frame draws the
    // final state and does not reschedule.
    const update = () => {
      const run = ready && !reduced && !lost && inView && pageVisible && scroll < 0.999
      if (run && !running) {
        running = true
        last = 0
        requestFrame()
      } else if (!run && running) {
        running = false
        requestFrame()
      }
    }

    loadImage(images[0]).then(
      (first) => {
        if (cancelled || lost) return
        sampled[0] = sampleImage(first, COLS, ROWS)

        const n = COLS * ROWS
        const grid = new Float32Array(n * 2)
        const scatter = new Float32Array(n * 3)
        const stagger = new Float32Array(n)
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const i = y * COLS + x
            grid[i * 2] = (x / COLS - 0.5) * GRID_W
            grid[i * 2 + 1] = -(y / ROWS - 0.5) * GRID_H
            const th = Math.random() * Math.PI * 2
            const rad = 2.5 + Math.random() * 3.5
            scatter[i * 3] = Math.cos(th) * rad
            scatter[i * 3 + 1] = (Math.random() - 0.5) * 5
            scatter[i * 3 + 2] = Math.sin(th) * rad - 2 + Math.random() * 4
            stagger[i] = Math.random()
          }
        }

        const g = gl!
        bindAttr(0, makeBuffer(grid, g.STATIC_DRAW), 2)
        bindAttr(1, makeBuffer(scatter, g.STATIC_DRAW), 3)
        bindAttr(2, makeBuffer(stagger, g.STATIC_DRAW), 1)
        colorBufs.push(makeBuffer(sampled[0].colors, g.DYNAMIC_DRAW), makeBuffer(sampled[0].colors, g.DYNAMIC_DRAW))
        depthBufs.push(makeBuffer(sampled[0].depths, g.DYNAMIC_DRAW), makeBuffer(sampled[0].depths, g.DYNAMIC_DRAW))
        bindSlots()
        count = n
        ready = true
        onReady?.()
        update()
        requestFrame()

        // preload remaining slides, then begin the cycle
        Promise.all(images.slice(1).map(loadImage)).then(
          (rest) => {
            if (cancelled || lost) return
            rest.forEach((img, i) => (sampled[i + 1] = sampleImage(img, COLS, ROWS)))
            // stage slide 2 into the B slot
            const next = sampled[1 % sampled.length]
            upload(colorBufs[slotA ^ 1], next.colors)
            upload(depthBufs[slotA ^ 1], next.depths)
            scheduleMorph()
          },
          () => {},
        )
      },
      () => {},
    )

    let cw = 0
    let ch = 0
    // The grid is shaped for the viewport at mount. If the viewport changes
    // shape later (rotation, window resize), scale the whole cloud so it
    // still covers the frustum, like object-cover on a fixed-ratio image,
    // instead of leaving black bands at the sides or top.
    let coverScale = 1
    let reshapeTimer: ReturnType<typeof setTimeout> | null = null
    const resize = () => {
      if (!gl || lost) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      const bw = Math.floor(w * pixelRatio)
      const bh = Math.floor(h * pixelRatio)
      if (bw !== cw || bh !== ch) {
        cw = canvas.width = bw
        ch = canvas.height = bh
        gl.viewport(0, 0, bw, bh)
      }
      perspective(proj, w / h)
      coverScale = Math.max(1, (frustumH * (w / h) * OVERSCAN) / GRID_W, (frustumH * OVERSCAN) / GRID_H)
      // A big change of shape: rebuild rather than stretch the grid thin.
      if (reshapeTimer) clearTimeout(reshapeTimer)
      if (Math.abs(Math.log(w / h / mountAspect)) > Math.log(1.5)) {
        reshapeTimer = setTimeout(() => setEpoch((e) => e + 1), 300)
      }
      requestFrame()
    }
    resize()
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize)
      ro.observe(mount)
    } else {
      window.addEventListener("resize", resize)
    }

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduced) return
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible"
      update()
    }
    document.addEventListener("visibilitychange", onVisibility)

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        const e = entries[entries.length - 1]
        if (!e) return
        inView = e.isIntersecting
        update()
      })
      io.observe(mount)
    }

    const onLost = () => {
      lost = true
      running = false
      cancelAnimationFrame(raf)
      raf = 0
      setFailed(true)
    }
    canvas.addEventListener("webglcontextlost", onLost)

    const handles: PointCloudHandles = {
      setScroll: (v) => {
        if (v === scroll) return
        scroll = v
        update()
        if (!running) requestFrame()
      },
    }
    if (handlesRef) handlesRef.current = handles

    return () => {
      cancelled = true
      running = false
      if (reshapeTimer) clearTimeout(reshapeTimer)
      cancelAnimationFrame(raf)
      raf = 0
      if (handlesRef && handlesRef.current === handles) handlesRef.current = null
      io?.disconnect()
      ro?.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointer)
      document.removeEventListener("visibilitychange", onVisibility)
      canvas.removeEventListener("webglcontextlost", onLost)
      const g = gl!
      if (!g.isContextLost()) {
        for (let i = 0; i < ATTRS.length; i++) g.disableVertexAttribArray(i)
        g.bindBuffer(g.ARRAY_BUFFER, null)
        buffers.forEach((b) => g.deleteBuffer(b))
        g.useProgram(null)
        g.detachShader(program, vs)
        g.detachShader(program, fs)
        g.deleteShader(vs)
        g.deleteShader(fs)
        g.deleteProgram(program)
        // release the context now rather than at garbage collection
        g.getExtension("WEBGL_lose_context")?.loseContext()
      }
      if (canvas.parentElement === mount) mount.removeChild(canvas)
    }
  }, [images, interval, onReady, onSlide, handlesRef, epoch])

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={images[0]} alt="" className="h-full w-full object-cover opacity-70" />
  }

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
