"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const VERT = /* glsl */ `
  attribute vec2 aGrid;        // fixed xy position on the image plane
  attribute vec3 aScatter;
  attribute float aStagger;
  attribute vec3 aColorA;
  attribute vec3 aColorB;
  attribute float aDepthA;
  attribute float aDepthB;
  uniform float uProgress;     // 0 scattered -> 1 assembled
  uniform float uScroll;       // disperse on scroll
  uniform float uMix;          // morph between image A and B
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
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

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (0.6 + 0.85 * p) * uPixelRatio * (3.2 / -mv.z);

    float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
    vColor = color * 1.7;
    // dark pixels stay nearly invisible so the photo reads crisply
    vAlpha = (0.2 + 0.8 * p) * (1.0 - d) * (0.15 + 0.85 * smoothstep(0.01, 0.2, lum));
  }
`

const FRAG = /* glsl */ `
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

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" })
    } catch {
      setFailed(true)
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
    camera.position.z = 3.2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const uniforms = {
      uProgress: { value: reduced ? 1 : 0 },
      uScroll: { value: 0 },
      uMix: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }

    let points: THREE.Points | null = null
    let geo: THREE.BufferGeometry | null = null
    let raf = 0
    let cancelled = false
    let slideTimer: ReturnType<typeof setTimeout> | null = null
    const clock = new THREE.Clock()
    const mouseTarget = new THREE.Vector2()

    // morph state
    let sampled: Sampled[] = []
    let current = 0
    let morphStart = -1

    const isMobile = window.innerWidth < 768
    const COLS = isMobile ? 340 : 760
    let ROWS = 0

    const startCycle = () => {
      if (sampled.length < 2 || reduced) return
      slideTimer = setTimeout(() => {
        morphStart = clock.getElapsedTime()
      }, interval)
    }

    loadImage(images[0]).then((first) => {
      if (cancelled) return
      ROWS = Math.round(COLS * 0.62)
      sampled[0] = sampleImage(first, COLS, ROWS)

      const n = COLS * ROWS
      const grid = new Float32Array(n * 2)
      const scatter = new Float32Array(n * 3)
      const stagger = new Float32Array(n)
      const aspect = COLS / ROWS
      const W = 4.6
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const i = y * COLS + x
          grid[i * 2] = (x / COLS - 0.5) * W
          grid[i * 2 + 1] = -(y / ROWS - 0.5) * (W / aspect)
          const th = Math.random() * Math.PI * 2
          const rad = 2.5 + Math.random() * 3.5
          scatter[i * 3] = Math.cos(th) * rad
          scatter[i * 3 + 1] = (Math.random() - 0.5) * 5
          scatter[i * 3 + 2] = Math.sin(th) * rad - 2 + Math.random() * 4
          stagger[i] = Math.random()
        }
      }

      geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3))
      geo.setAttribute("aGrid", new THREE.BufferAttribute(grid, 2))
      geo.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3))
      geo.setAttribute("aStagger", new THREE.BufferAttribute(stagger, 1))
      geo.setAttribute("aColorA", new THREE.BufferAttribute(sampled[0].colors, 3))
      geo.setAttribute("aColorB", new THREE.BufferAttribute(sampled[0].colors.slice(), 3))
      geo.setAttribute("aDepthA", new THREE.BufferAttribute(sampled[0].depths, 1))
      geo.setAttribute("aDepthB", new THREE.BufferAttribute(sampled[0].depths.slice(), 1))

      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      points = new THREE.Points(geo, mat)
      scene.add(points)
      onReady?.()

      // preload remaining slides, then begin the cycle
      Promise.all(images.slice(1).map(loadImage)).then((rest) => {
        if (cancelled) return
        rest.forEach((img, i) => (sampled[i + 1] = sampleImage(img, COLS, ROWS)))
        // stage slide 2 into the B buffers
        const next = sampled[1 % sampled.length]
        ;(geo!.getAttribute("aColorB") as THREE.BufferAttribute).copyArray(next.colors).needsUpdate = true
        ;(geo!.getAttribute("aDepthB") as THREE.BufferAttribute).copyArray(next.depths).needsUpdate = true
        startCycle()
      })
    })

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouse = (e: MouseEvent) => {
      mouseTarget.set((e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener("mousemove", onMouse, { passive: true })

    if (handlesRef) handlesRef.current = { setScroll: (v) => (uniforms.uScroll.value = v) }

    const MORPH_S = 2.2
    const tick = () => {
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      if (!reduced) {
        const k = Math.min(1, t / 3.5)
        uniforms.uProgress.value = 1 - Math.pow(1 - k, 3)
      }
      uniforms.uMouse.value.lerp(mouseTarget, 0.045)

      // drive the morph
      if (morphStart >= 0 && geo) {
        const mk = Math.min(1, (t - morphStart) / MORPH_S)
        uniforms.uMix.value = mk * mk * (3 - 2 * mk)
        if (mk >= 1) {
          // B becomes the new A; stage the following slide into B
          current = (current + 1) % sampled.length
          const cur = sampled[current]
          const nxt = sampled[(current + 1) % sampled.length]
          ;(geo.getAttribute("aColorA") as THREE.BufferAttribute).copyArray(cur.colors).needsUpdate = true
          ;(geo.getAttribute("aDepthA") as THREE.BufferAttribute).copyArray(cur.depths).needsUpdate = true
          ;(geo.getAttribute("aColorB") as THREE.BufferAttribute).copyArray(nxt.colors).needsUpdate = true
          ;(geo.getAttribute("aDepthB") as THREE.BufferAttribute).copyArray(nxt.depths).needsUpdate = true
          uniforms.uMix.value = 0
          morphStart = -1
          onSlide?.(current)
          startCycle()
        }
      }

      // slow 3D presence: the whole cloud breathes and banks
      if (points) {
        points.rotation.y = Math.sin(t * 0.1) * 0.025 + uniforms.uMouse.value.x * 0.05
        points.rotation.x = Math.cos(t * 0.13) * 0.015 - uniforms.uMouse.value.y * 0.035
        camera.position.z = 3.2 + Math.sin(t * 0.15) * 0.08
      }

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      if (slideTimer) clearTimeout(slideTimer)
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
      geo?.dispose()
      ;(points?.material as THREE.Material | undefined)?.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement)
    }
  }, [images, interval, onReady, onSlide, handlesRef])

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={images[0]} alt="" className="h-full w-full object-cover opacity-70" />
  }

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
