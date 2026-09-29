import { FOV_Y, compile, loadImage, modelView, perspective } from "./cloud-gl"
import { DISPERSE_END, HERO_SLIDES, cloudFrame, heroSlide } from "./hero-signal"

/*
 * Embers: the hero cloud's own dots, left hanging in the air.
 *
 * Every ember starts on the photo, at a bright pixel, in that pixel's colour,
 * drawn with the cloud's live camera (cloudFrame). As the page scrolls and the
 * cloud streams apart, the embers peel off the photo with it, lunge toward
 * the lens and settle into the air in front of the page. From there scrolling
 * carries the viewer down and forward through them, so they stream past with
 * real depth, and everything is scrubbed by the scroll position: scroll back
 * and they fly back onto the photo.
 *
 * On top of the scrub they react to how you scroll. Scroll energy (kick) makes
 * them flare and swirl, like air blown over embers, and cools off slowly; the
 * scroll velocity (wind) blows them along with some inertia and lets them
 * settle when you stop. The cursor pushes them aside and makes them glow, as
 * it does to the cloud. Past the manifesto each ember flares once and burns
 * out at its own point, and scrolling back relights it.
 *
 * Drawn on a fixed canvas under the curtain's content (embers.tsx), with the
 * cloud's blending, and only while its scroll window is on screen.
 */

const VERT = /* glsl */ `
  precision highp float;

  attribute vec3 aGrid;    // the cloud's dot: xy on the photo plane, z its depth
  attribute vec3 aRest;    // where it hangs: camera-space x, y and distance
  attribute vec4 aSeed;    // phase, speed, burn-out point, size
  attribute vec3 aColorA;
  attribute vec3 aColorB;

  uniform mat4 uModelView;   // the cloud's camera
  uniform mat4 uProjection;
  uniform float uDisperse;   // the cloud's dispersal, 0..1
  uniform float uScroll;     // viewport heights scrolled
  uniform float uTravel;     // eased scroll since the stage began to leave
  uniform float uStage;      // how far the pinned stage has scrolled away
  uniform float uTime;
  uniform float uKick;       // scroll energy: fast attack, slow release
  uniform float uWind;       // scroll velocity with inertia, signed
  uniform float uMix;        // crossfade to the next slide's colours
  uniform vec2 uMouse;
  uniform float uMouseOn;
  uniform float uAspect;
  uniform float uTanH;
  uniform float uPixelRatio;
  uniform float uPointScale;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vHeat;

  const float PI = 3.14159265;

  void main() {
    float ph = aSeed.x * 6.28318;

    // 1. On the photo, riding the stage as it scrolls away
    vec4 photo = uModelView * vec4(aGrid, 1.0);
    photo.y += uStage * 2.0 * (-photo.z) * uTanH;

    // 2. In the air. Scrolling moves the viewer down and forward through it.
    float dist = aRest.z - uTravel * (0.5 + 0.7 * aSeed.y);
    dist = 0.8 + mod(dist - 0.8, 8.8);
    float h = dist * uTanH;
    vec3 air = vec3(aRest.xy, -dist);
    air.y += uTravel * 0.9 + uTime * (0.015 + 0.045 * aSeed.y) + uWind * (0.35 + 0.55 * aSeed.w);
    air.x += sin(uTime * (0.25 + 0.5 * aSeed.y) + ph) * 0.04;
    air.xy += vec2(sin(uTime * 2.3 + ph * 9.0), cos(uTime * 1.9 + ph * 7.0)) * uKick * 0.2;
    // the gust fans them out from the middle of the frame
    air.x *= 1.0 + abs(uWind) * 0.12 * aSeed.w;
    air.xy += uMouse * vec2(0.14, 0.09) * uMouseOn;
    // wrap vertically in screen terms so the air stays full
    float band = mod(air.y / h + 1.25, 2.5) - 1.25;
    air.y = band * h;

    // Flight: peel off the photo, lunge toward the lens, settle in the air
    float e = smoothstep(0.08, 1.0, uDisperse);
    float lunge = sin(PI * e);
    vec3 cam = mix(photo.xyz, air, e);
    cam.z += lunge * (0.5 + 0.9 * aSeed.w);
    cam.xy *= 1.0 + lunge * 0.12;

    vec4 clip = uProjection * vec4(cam, 1.0);
    vec2 ndc = clip.xy / clip.w;
    vec2 away = (ndc - uMouse) * vec2(uAspect, 1.0);
    float near = smoothstep(0.34, 0.0, length(away)) * uMouseOn * e;
    ndc += normalize(away + vec2(0.0001)) * near * 0.14 / vec2(uAspect, 1.0);
    gl_Position = vec4(ndc * clip.w, clip.zw);

    float z = max(0.4, -cam.z);
    float death = 1.55 + 0.95 * aSeed.z;
    float alive = 1.0 - smoothstep(death - 0.1, death, uScroll);
    float flare = smoothstep(death - 0.35, death - 0.08, uScroll);
    float heat = uKick * 1.4 + near * 1.8 + flare * 1.4 + lunge * 0.4;

    float emberSize = (1.6 + 3.2 * aSeed.w * aSeed.w) * (1.0 + 0.3 * heat);
    float photoSize = 1.45 * uPointScale; // the cloud's dot, fully assembled
    gl_PointSize = min(32.0, mix(photoSize, emberSize, e) * uPixelRatio * (3.2 / z));

    vec3 col = mix(aColorA, aColorB, uMix);
    float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
    float peak = max(col.r, max(col.g, col.b));
    // leaving the photo they heat up to full-strength versions of their colour
    vColor = mix(col * 1.7, col / max(peak, 0.12), e);
    vHeat = heat;

    float flicker = 0.7 + 0.3 * sin(uTime * (1.2 + 3.6 * aSeed.y) + ph);
    float depthFade = smoothstep(0.8, 1.6, z) * smoothstep(9.6, 8.0, z);
    float edgeFade = smoothstep(1.25, 1.1, abs(band));
    float ramp = smoothstep(0.2, 0.55, uDisperse); // after the headline has faded
    float bright = 0.2 + 0.8 * smoothstep(0.03, 0.3, lum);
    vAlpha = ramp * alive * depthFade * edgeFade * flicker * bright * (0.7 + 0.3 * aSeed.w) * (1.0 + 0.5 * heat);
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
  varying float vHeat;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float glow = smoothstep(0.5, 0.05, r); // the cloud's dot
    float core = smoothstep(0.22, 0.0, r);
    vec3 col = mix(vColor, vec3(1.0, 0.94, 0.84), clamp(core * (0.3 + 0.45 * vHeat), 0.0, 1.0));
    gl_FragColor = vec4(col, min(1.0, vAlpha) * glow);
  }
`

const ATTRS = ["aGrid", "aRest", "aSeed", "aColorA", "aColorB"] as const

/** The travel through the air starts just before the pinned stage leaves (1 viewport). */
const TRAVEL_START = 0.9
const TRAVEL_EASE = 0.4
/** Past this (viewport heights) every ember has burnt out. */
const OFF_AFTER = 2.6
/** Candidate grid for choosing which of the photo's pixels become embers. */
const CANDIDATE_COLS = 160
const TAN_H = Math.tan(FOV_Y / 2)

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const softRamp = (x: number) => (x <= 0 ? 0 : x < TRAVEL_EASE ? (x * x) / (2 * TRAVEL_EASE) : x - TRAVEL_EASE / 2)

/** Cover-fit the photo into cols x rows, the same crop the cloud uses. */
function samplePixels(img: HTMLImageElement, cols: number, rows: number) {
  const c = document.createElement("canvas")
  c.width = cols
  c.height = rows
  const cx = c.getContext("2d", { willReadFrequently: true })
  if (!cx) return null
  const scale = Math.max(cols / img.width, rows / img.height)
  const sw = cols / scale
  const sh = rows / scale
  cx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, cols, rows)
  return cx.getImageData(0, 0, cols, rows).data
}

/** Column-major mat4 times (x, y, z, 1), perspective divide. */
function project(mv: Float32Array, proj: Float32Array, x: number, y: number, z: number) {
  const cx = mv[0] * x + mv[4] * y + mv[8] * z + mv[12]
  const cy = mv[1] * x + mv[5] * y + mv[9] * z + mv[13]
  const cz = mv[2] * x + mv[6] * y + mv[10] * z + mv[14]
  const px = proj[0] * cx + proj[4] * cy + proj[8] * cz + proj[12]
  const py = proj[1] * cx + proj[5] * cy + proj[9] * cz + proj[13]
  const pw = proj[3] * cx + proj[7] * cy + proj[11] * cz + proj[15]
  return [px / pw, py / pw] as const
}

export function startEmbers(canvas: HTMLCanvasElement): () => void {
  let gl: WebGLRenderingContext | null = null
  try {
    gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false }) as WebGLRenderingContext | null
  } catch {
    gl = null
  }
  if (!gl) return () => {}
  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  const program = gl.createProgram()
  if (!vs || !fs || !program) return () => {}
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  ATTRS.forEach((name, i) => gl!.bindAttribLocation(program, i, name))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return () => {}
  gl.useProgram(program)

  // the cloud's blending: additive, no depth
  gl.disable(gl.DEPTH_TEST)
  gl.depthMask(false)
  gl.enable(gl.BLEND)
  gl.blendEquation(gl.FUNC_ADD)
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE)
  gl.clearColor(0, 0, 0, 0)

  const u = (name: string) => gl!.getUniformLocation(program, name)
  const loc = {
    modelView: u("uModelView"),
    projection: u("uProjection"),
    disperse: u("uDisperse"),
    scroll: u("uScroll"),
    travel: u("uTravel"),
    stage: u("uStage"),
    time: u("uTime"),
    kick: u("uKick"),
    wind: u("uWind"),
    mix: u("uMix"),
    mouse: u("uMouse"),
    mouseOn: u("uMouseOn"),
    aspect: u("uAspect"),
    tanH: u("uTanH"),
    pixelRatio: u("uPixelRatio"),
    pointScale: u("uPointScale"),
  }
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
  gl.uniform1f(loc.pixelRatio, pixelRatio)
  gl.uniform1f(loc.tanH, TAN_H)

  // Our own camera, identical to the cloud's at rest, for when the cloud has
  // not drawn yet (or has been torn down by a page transition).
  const ownMv = new Float32Array(16)
  const ownProj = new Float32Array(16)
  modelView(ownMv, 0, 0, 3.2, 1)

  // geometry
  const hero = document.querySelector<HTMLElement>("[data-hero]")
  let W = 1
  let H = 1
  let heroTop = 0
  let heroH = 0
  const measure = () => {
    W = canvas.clientWidth || window.innerWidth
    H = canvas.clientHeight || window.innerHeight
    const bw = Math.max(1, Math.floor(W * pixelRatio))
    const bh = Math.max(1, Math.floor(H * pixelRatio))
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw
      canvas.height = bh
      gl!.viewport(0, 0, bw, bh)
    }
    perspective(ownProj, W / H)
    gl!.uniform1f(loc.aspect, W / H)
    if (hero) {
      heroTop = hero.getBoundingClientRect().top + window.scrollY
      heroH = hero.offsetHeight
    }
  }
  measure()

  // particles
  const photos: (Uint8ClampedArray | null)[] = []
  let slideColors: Float32Array[] = []
  let count = 0
  let builtAspect = 0
  let ready = false
  let building = false
  const buffers: WebGLBuffer[] = []
  const colorBufs: WebGLBuffer[] = []
  let slotA = 0
  let candCols = 0
  let candRows = 0

  const bindAttr = (index: number, buf: WebGLBuffer, size: number) => {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
    gl!.enableVertexAttribArray(index)
    gl!.vertexAttribPointer(index, size, gl!.FLOAT, false, 0, 0)
  }
  const makeBuffer = (data: Float32Array, usage: number) => {
    const buf = gl!.createBuffer()!
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
    gl!.bufferData(gl!.ARRAY_BUFFER, data, usage)
    buffers.push(buf)
    return buf
  }
  const upload = (buf: WebGLBuffer, data: Float32Array) => {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
    gl!.bufferSubData(gl!.ARRAY_BUFFER, 0, data)
  }
  const bindSlots = () => {
    bindAttr(3, colorBufs[slotA], 3)
    bindAttr(4, colorBufs[slotA ^ 1], 3)
  }

  const build = () => {
    const aspect = W / H
    const gridW = cloudFrame.ready ? cloudFrame.gridW : 2 * 3.2 * TAN_H * 1.08 * Math.min(2.4, Math.max(0.4, aspect))
    const gridH = cloudFrame.ready ? cloudFrame.gridH : 2 * 3.2 * TAN_H * 1.08
    const gridAspect = gridW / gridH
    const cols = CANDIDATE_COLS
    const rows = Math.max(40, Math.min(400, Math.round(cols / gridAspect)))
    if (cols !== candCols || rows !== candRows || photos.length === 0) return false
    const mv = cloudFrame.ready ? cloudFrame.mv : ownMv
    const proj = cloudFrame.ready ? cloudFrame.proj : ownProj

    // Pick the photo's bright pixels (in any slide) to become embers.
    const cells = cols * rows
    const cdf = new Float32Array(cells)
    let total = 0
    for (let i = 0; i < cells; i++) {
      let peak = 0
      for (const px of photos) {
        if (!px) continue
        const l = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255
        if (l > peak) peak = l
      }
      total += Math.pow(peak, 2.2) + 0.001
      cdf[i] = total
    }

    count = Math.round(Math.min(2400, Math.max(700, (W * H) / 600)))
    const grid = new Float32Array(count * 3)
    const rest = new Float32Array(count * 3)
    const seed = new Float32Array(count * 4)
    slideColors = photos.map(() => new Float32Array(count * 3))
    const first = photos[heroSlide.get()] ?? photos.find(Boolean)!
    for (let i = 0; i < count; i++) {
      // weighted pick by binary search over the brightness CDF
      const r = Math.random() * total
      let lo = 0
      let hi = cells - 1
      while (lo < hi) {
        const mid = (lo + hi) >> 1
        if (cdf[mid] < r) lo = mid + 1
        else hi = mid
      }
      const cx = lo % cols
      const cy = (lo / cols) | 0
      const gx = ((cx + Math.random()) / cols - 0.5) * gridW
      const gy = -((cy + Math.random()) / rows - 0.5) * gridH
      const lum = (0.2126 * first[lo * 4] + 0.7152 * first[lo * 4 + 1] + 0.0722 * first[lo * 4 + 2]) / 255
      const gz = (lum - 0.5) * 0.5 // the cloud's depth for this pixel
      grid[i * 3] = gx
      grid[i * 3 + 1] = gy
      grid[i * 3 + 2] = gz
      photos.forEach((px, k) => {
        const src = px ?? first
        slideColors[k][i * 3] = src[lo * 4] / 255
        slideColors[k][i * 3 + 1] = src[lo * 4 + 1] / 255
        slideColors[k][i * 3 + 2] = src[lo * 4 + 2] / 255
      })

      // Where it hangs: pushed outward along its own line of sight, like the
      // cloud streaming apart, never past the edge of the frame.
      const [nx, ny] = project(mv, proj, gx, gy, gz)
      const reach = Math.max(Math.abs(nx), Math.abs(ny), 0.15)
      const out = 1 + (1.1 / reach - 1) * Math.random() * 0.55
      const rx = nx * out + (Math.random() - 0.5) * 0.12
      const ry = ny * out + (Math.random() - 0.5) * 0.12
      const dist = 1.3 + 6.2 * Math.pow(Math.random(), 1.3)
      rest[i * 3] = rx * dist * TAN_H * aspect
      rest[i * 3 + 1] = ry * dist * TAN_H
      rest[i * 3 + 2] = dist

      seed[i * 4] = Math.random()
      seed[i * 4 + 1] = Math.random()
      seed[i * 4 + 2] = Math.random()
      seed[i * 4 + 3] = Math.random()
    }

    buffers.forEach((b) => gl!.deleteBuffer(b))
    buffers.length = 0
    colorBufs.length = 0
    bindAttr(0, makeBuffer(grid, gl!.STATIC_DRAW), 3)
    bindAttr(1, makeBuffer(rest, gl!.STATIC_DRAW), 3)
    bindAttr(2, makeBuffer(seed, gl!.STATIC_DRAW), 4)
    const now = slideColors[heroSlide.get()] ?? slideColors[0]
    colorBufs.push(makeBuffer(now, gl!.DYNAMIC_DRAW), makeBuffer(now, gl!.DYNAMIC_DRAW))
    slotA = 0
    bindSlots()
    mixT = -1
    builtAspect = aspect
    return true
  }

  // Sample the slides once (the cloud has already fetched them, so these are
  // cache hits), then build. Rebuilt only if the viewport changes shape a lot.
  const prepare = () => {
    if (building || dead) return
    building = true
    const aspect = W / H
    const gridAspect = cloudFrame.ready
      ? cloudFrame.gridW / cloudFrame.gridH
      : Math.min(2.4, Math.max(0.4, aspect))
    candCols = CANDIDATE_COLS
    candRows = Math.max(40, Math.min(400, Math.round(CANDIDATE_COLS / gridAspect)))
    Promise.all(HERO_SLIDES.map((s) => loadImage(s.src).then((img) => samplePixels(img, candCols, candRows), () => null))).then(
      (px) => {
        building = false
        if (dead || px.every((p) => !p)) return
        photos.length = 0
        photos.push(...px)
        ready = build()
        check()
      },
    )
  }

  // slide crossfade
  let mixT = -1
  const MIX_S = 1.6
  const toSlide = (index: number) => {
    if (!ready || !slideColors[index]) return
    // land any crossfade in flight, then fade from here to the new slide
    if (mixT >= 0) {
      slotA ^= 1
      bindSlots()
    }
    upload(colorBufs[slotA ^ 1], slideColors[index])
    if (running) {
      mixT = 0
    } else {
      upload(colorBufs[slotA], slideColors[index])
      mixT = -1
    }
  }
  const unsubscribe = heroSlide.subscribe(toSlide)

  // input
  const mouse = { x: 0, y: 0, on: 0 }
  const mouseTarget = { x: 0, y: 0, on: 0 }
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return
    mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2
    mouseTarget.on = 1
  }
  const onLeave = (e: MouseEvent) => {
    if (!e.relatedTarget) mouseTarget.on = 0
  }
  window.addEventListener("pointermove", onPointer, { passive: true })
  document.addEventListener("mouseout", onLeave)

  // loop
  let raf = 0
  let running = false
  let dead = false
  let last = 0
  let t = 0
  let lastY = window.scrollY
  let kick = 0
  let wind = 0

  const state = () => {
    const y = window.scrollY
    const s = y / H
    const v = heroH > 0 ? (y - heroTop) / heroH : s / 2
    return { y, s, d: clamp01(v / DISPERSE_END) }
  }
  const active = () => {
    const { s, d } = state()
    return d > 0.02 && s < OFF_AFTER && !document.hidden
  }

  const frame = (now: number) => {
    raf = 0
    if (dead) return
    if (!active()) {
      stop()
      return
    }
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
    last = now
    t += dt
    const { y, s, d } = state()

    // scroll energy and wind, in viewport heights per second
    const vel = dt > 0 ? (y - lastY) / H / dt : 0
    lastY = y
    const k = Math.min(1, Math.abs(vel) / 2.5)
    kick += (k - kick) * (1 - Math.exp(-dt * (k > kick ? 10 : 1.4)))
    wind += (Math.max(-1.2, Math.min(1.2, vel * 0.3)) - wind) * (1 - Math.exp(-dt * 3))
    const ease = 1 - Math.exp(-dt * 8)
    mouse.x += (mouseTarget.x - mouse.x) * ease
    mouse.y += (mouseTarget.y - mouse.y) * ease
    mouse.on += (mouseTarget.on - mouse.on) * (1 - Math.exp(-dt * 3))

    let mixV = 0
    if (mixT >= 0) {
      mixT += dt / MIX_S
      if (mixT >= 1) {
        slotA ^= 1
        bindSlots()
        mixT = -1
      } else {
        mixV = mixT * mixT * (3 - 2 * mixT)
      }
    }

    const g = gl!
    g.clear(g.COLOR_BUFFER_BIT)
    g.uniformMatrix4fv(loc.modelView, false, cloudFrame.ready ? cloudFrame.mv : ownMv)
    g.uniformMatrix4fv(loc.projection, false, cloudFrame.ready ? cloudFrame.proj : ownProj)
    g.uniform1f(loc.pointScale, cloudFrame.ready ? cloudFrame.pointScale : 1)
    g.uniform1f(loc.disperse, d)
    g.uniform1f(loc.scroll, s)
    g.uniform1f(loc.travel, softRamp(s - TRAVEL_START))
    g.uniform1f(loc.stage, heroH > 0 ? Math.max(0, (y - (heroTop + heroH - H)) / H) : 0)
    g.uniform1f(loc.time, t)
    g.uniform1f(loc.kick, kick)
    g.uniform1f(loc.wind, wind)
    g.uniform1f(loc.mix, mixV)
    g.uniform2f(loc.mouse, mouse.x, mouse.y)
    g.uniform1f(loc.mouseOn, mouse.on)
    g.drawArrays(g.POINTS, 0, count)
    raf = requestAnimationFrame(frame)
  }

  const stop = () => {
    if (!running) return
    running = false
    cancelAnimationFrame(raf)
    raf = 0
    if (mixT >= 0) {
      // land the crossfade so the next start shows the right colours
      slotA ^= 1
      bindSlots()
      mixT = -1
    }
    gl!.clear(gl!.COLOR_BUFFER_BIT)
    canvas.style.opacity = "0"
  }

  function check() {
    if (dead || running || !active()) return
    if (!ready) {
      prepare()
      return
    }
    running = true
    last = 0
    lastY = window.scrollY
    kick = 0
    wind = 0
    canvas.style.opacity = "1"
    raf = requestAnimationFrame(frame)
  }

  const onResize = () => {
    measure()
    // a big change of shape (a phone rotating): resample and rebuild for it
    if (ready && Math.abs(Math.log(W / H / builtAspect)) > Math.log(1.3)) {
      stop()
      ready = false
      photos.length = 0
      check()
    }
  }
  const ro = new ResizeObserver(onResize)
  ro.observe(canvas)
  if (hero) ro.observe(hero)
  window.addEventListener("scroll", check, { passive: true })
  document.addEventListener("visibilitychange", check)
  const onLost = (e: Event) => {
    e.preventDefault()
    stop()
    dead = true
  }
  canvas.addEventListener("webglcontextlost", onLost)
  check()

  return () => {
    stop()
    dead = true
    unsubscribe()
    ro.disconnect()
    window.removeEventListener("scroll", check)
    window.removeEventListener("pointermove", onPointer)
    document.removeEventListener("mouseout", onLeave)
    document.removeEventListener("visibilitychange", check)
    canvas.removeEventListener("webglcontextlost", onLost)
    const g = gl!
    if (!g.isContextLost()) {
      buffers.forEach((b) => g.deleteBuffer(b))
      g.deleteProgram(program)
      g.deleteShader(vs)
      g.deleteShader(fs)
      g.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }
}
