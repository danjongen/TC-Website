"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const GREEN = new THREE.Color("#00D26A")

const VERT = /* glsl */ `
  attribute vec3 aTarget;
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute float aStagger;
  uniform float uProgress;   // 0 = scattered, 1 = assembled image
  uniform float uScroll;     // 0..1 disperse on scroll
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // per-point staggered assembly window
    float p = smoothstep(aStagger * 0.6, aStagger * 0.6 + 0.4, uProgress);
    // scroll pulls points back apart and pushes them past the camera
    float d = uScroll;
    vec3 pos = mix(aScatter, aTarget, p);
    pos = mix(pos, aScatter * 1.6 + vec3(0.0, 0.0, 6.0), d * d);

    // gentle organic drift so the cloud never sits still
    pos.x += sin(uTime * 0.4 + aTarget.y * 3.0) * 0.012 * p;
    pos.y += cos(uTime * 0.5 + aTarget.x * 3.0) * 0.012 * p;
    pos.z += sin(uTime * 0.3 + aStagger * 12.0) * 0.05 * p;

    // mouse parallax tilt
    pos.xy += uMouse * 0.14 * (0.4 + pos.z);

    // pointer repulsion: particles shy away from the cursor
    vec2 m = uMouse * vec2(2.4, 1.5);
    vec2 away = pos.xy - m;
    float rep = smoothstep(0.8, 0.0, length(away));
    pos.xy += normalize(away + vec2(0.0001)) * rep * 0.28 * p;
    pos.z += rep * 0.35 * p;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + 1.8 * p) * uPixelRatio * (3.2 / -mv.z);

    vColor = aColor;
    vAlpha = (0.25 + 0.75 * p) * (1.0 - d);
  }
`

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, r);
    gl_FragColor = vec4(vColor * 1.35, vAlpha * glow);
  }
`

export type PointCloudHandles = {
  setScroll: (v: number) => void
}

export function PointCloud({
  src,
  onReady,
  handlesRef,
}: {
  src: string
  onReady?: () => void
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
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }

    let points: THREE.Points | null = null
    let raf = 0
    const clock = new THREE.Clock()
    const mouseTarget = new THREE.Vector2()

    const img = new Image()
    img.src = src
    img.onload = () => {
      // sample the photo into a dense grid of points
      const isMobile = window.innerWidth < 768
      const COLS = isMobile ? 240 : 420
      const ROWS = Math.round(COLS * (img.height / img.width))
      const c = document.createElement("canvas")
      c.width = COLS
      c.height = ROWS
      const cx = c.getContext("2d")!
      cx.drawImage(img, 0, 0, COLS, ROWS)
      const data = cx.getImageData(0, 0, COLS, ROWS).data

      const aspect = COLS / ROWS
      const targets: number[] = []
      const scatters: number[] = []
      const colors: number[] = []
      const staggers: number[] = []

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const i = (y * COLS + x) * 4
          const r = data[i] / 255
          const g = data[i + 1] / 255
          const b = data[i + 2] / 255
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
          if (lum < 0.06) continue // skip near-black: keeps density where the light is

          const px = (x / COLS - 0.5) * 4.4 * (aspect > 1.6 ? 1 : aspect / 1.6)
          const py = -(y / ROWS - 0.5) * (4.4 / aspect)
          const pz = (lum - 0.5) * 0.55 // brightness becomes depth relief
          targets.push(px, py, pz)

          // scatter: points start in a wide torus of noise around the camera axis
          const th = Math.random() * Math.PI * 2
          const rad = 2.5 + Math.random() * 3.5
          scatters.push(Math.cos(th) * rad, (Math.random() - 0.5) * 5, Math.sin(th) * rad - 2 + Math.random() * 4)

          colors.push(r, g, b)
          staggers.push(Math.random())
        }
      }

      const geo = new THREE.BufferGeometry()
      const n = targets.length / 3
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3))
      geo.setAttribute("aTarget", new THREE.Float32BufferAttribute(targets, 3))
      geo.setAttribute("aScatter", new THREE.Float32BufferAttribute(scatters, 3))
      geo.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3))
      geo.setAttribute("aStagger", new THREE.Float32BufferAttribute(staggers, 1))

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
    }

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

    const tick = () => {
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      if (!reduced) {
        // eased intro assembly over ~3.5s
        const k = Math.min(1, t / 3.5)
        uniforms.uProgress.value = 1 - Math.pow(1 - k, 3)
      }
      uniforms.uMouse.value.lerp(mouseTarget, 0.04)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
      points?.geometry.dispose()
      ;(points?.material as THREE.Material | undefined)?.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [src, onReady, handlesRef])

  if (failed) {
    // WebGL unavailable: fall back to the still photo
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className="h-full w-full object-cover opacity-70" />
  }

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
