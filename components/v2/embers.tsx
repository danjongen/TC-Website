"use client"

import { useEffect, useRef } from "react"
import { canRunCloud, heroSlide } from "./hero-signal"

/*
 * Embers: the point cloud's last dots, left hanging in the air over the top
 * of the homepage curtain (app/page.tsx). They catch as the cloud disperses,
 * drift up slowly behind the stats and the manifesto, and burn out as the
 * manifesto passes.
 *
 * Layering: a fixed canvas at a negative z-index inside the curtain body,
 * which is its own stacking context (isolate). It paints over the body's
 * black but under every section's content, so opaque content (photos)
 * occludes the embers and the sections above them keep transparent
 * backgrounds. Above the body's top edge the same canvas sits over the
 * curtain's gradient and the pinned hero, which is where the embers first
 * appear.
 *
 * Cost: a few hundred sprite blits a frame (plain alpha compositing: the
 * embers rarely overlap, and additive blending costs almost twice as much
 * where canvas falls back to the CPU), only while the scroll position is
 * inside the ember window and the tab is visible. Off on the same devices
 * as the cloud (reduced motion, Save-Data, low-end hardware).
 */

/** Scroll window in viewport heights (scrollY / innerHeight). */
const IN_START = 0.3 // the cloud starts streaming apart
const IN_END = 0.95
const OUT_START = 1.55 // the manifesto is lighting up
const OUT_END = 2.5 // gone before the gallery pins

const TONES = 10
const WRAP = 48 // px beyond each edge before an ember wraps around

type Rgb = [number, number, number]
type Palette = { dots: HTMLCanvasElement[]; discs: HTMLCanvasElement[] }

type Ember = {
  x: number // 0..1 of width
  y: number // 0..1 of height at t0
  t0: number
  z: number // depth, 0 far .. 1 near
  size: number // css px
  rise: number // viewport heights per second
  sway: number // css px
  swayF: number // rad/s
  ph: number
  life: number // seconds per ignite/cool cycle
  lifePh: number
  cycle: number
  bokeh: boolean
  sprite: HTMLCanvasElement
}

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/** 0 outside the ember window, 1 through its middle. */
const intensity = (s: number) => smooth(IN_START, IN_END, s) * (1 - smooth(OUT_START, OUT_END, s))

/** Warm fallback matching the first slide, used until the real photo is sampled. */
const FALLBACK: Rgb[] = [
  [255, 176, 112],
  [255, 150, 74],
  [255, 214, 168],
  [255, 238, 214],
  [246, 128, 58],
  [255, 196, 140],
  [255, 164, 96],
  [255, 226, 190],
  [120, 150, 255],
  [255, 186, 120],
]

function sprite(size: number, paint: (ctx: CanvasRenderingContext2D, g: CanvasGradient) => void) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")
  if (!ctx) return c
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  paint(ctx, g)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return c
}

function makePalette(colors: Rgb[]): Palette {
  const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a})`
  return {
    // a white-hot core with a coloured glow, like the cloud's additive dots
    dots: colors.map((c) =>
      sprite(64, (_, g) => {
        g.addColorStop(0, "rgba(255,255,255,1)")
        g.addColorStop(0.1, rgba(c, 1))
        g.addColorStop(0.24, rgba(c, 0.3))
        g.addColorStop(0.55, rgba(c, 0.06))
        g.addColorStop(1, rgba(c, 0))
      }),
    ),
    // soft out-of-focus discs for the few embers drifting close to the lens
    discs: colors.map((c) =>
      sprite(64, (_, g) => {
        g.addColorStop(0, rgba(c, 0.55))
        g.addColorStop(0.62, rgba(c, 0.45))
        g.addColorStop(0.86, rgba(c, 0.16))
        g.addColorStop(1, rgba(c, 0))
      }),
    ),
  }
}

/** The photo's bright, saturated pixels, lifted to ember brightness. */
function sampleColors(img: HTMLImageElement): Rgb[] | null {
  const W = 48
  const H = 30
  const c = document.createElement("canvas")
  c.width = W
  c.height = H
  const ctx = c.getContext("2d", { willReadFrequently: true })
  if (!ctx) return null
  ctx.drawImage(img, 0, 0, W, H)
  const d = ctx.getImageData(0, 0, W, H).data
  const px: { c: Rgb; score: number }[] = []
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i]
    const g = d[i + 1]
    const b = d[i + 2]
    const max = Math.max(r, g, b)
    if (max < 40) continue
    const sat = (max - Math.min(r, g, b)) / max
    px.push({ c: [r, g, b], score: max * (0.35 + sat) })
  }
  if (px.length < TONES) return null
  px.sort((a, b) => b.score - a.score)
  const top = px.slice(0, Math.max(TONES * 2, Math.floor(px.length * 0.2)))
  const out: Rgb[] = []
  for (let i = 0; i < TONES; i++) {
    const [r, g, b] = top[Math.floor(((i + 0.5) / TONES) * top.length)].c
    const k = 245 / Math.max(r, g, b, 1)
    out.push([Math.round(r * k), Math.round(g * k), Math.round(b * k)])
  }
  return out
}

export function Embers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canRunCloud()) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const palettes = new Map<string, Palette>()
    const loading = new Set<string>()
    let palette = makePalette(FALLBACK)
    let wanted = heroSlide.get()

    // Sample lazily, the first time the embers are needed: by then the
    // cloud has already fetched these photos, so this is a cache hit.
    const usePalette = (src: string | null) => {
      if (!src) return
      const ready = palettes.get(src)
      if (ready) {
        palette = ready
        return
      }
      if (loading.has(src)) return
      loading.add(src)
      const img = new Image()
      img.decoding = "async"
      img.onload = () => {
        const colors = sampleColors(img)
        if (!colors) return
        palettes.set(src, makePalette(colors))
        if (src === wanted) palette = palettes.get(src)!
      }
      img.src = src
    }

    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    const pick = (list: HTMLCanvasElement[]) => list[Math.floor(Math.random() * list.length)]

    let simTime = 0
    const embers: Ember[] = []
    const spawn = (): Ember => {
      const bokeh = Math.random() < 0.07
      const z = bokeh ? rand(0.75, 1) : Math.pow(Math.random(), 1.6)
      const life = rand(5, 11)
      const lifePh = Math.random()
      return {
        x: Math.random(),
        y: Math.random(),
        t0: simTime,
        z,
        size: bokeh ? rand(10, 26) : 1 + z * z * 2.8,
        rise: rand(0.012, 0.03) * (0.5 + z),
        sway: rand(4, 16) * (0.4 + z),
        swayF: rand(0.25, 0.7),
        ph: rand(0, Math.PI * 2),
        life,
        lifePh,
        cycle: Math.floor(simTime / life + lifePh),
        bokeh,
        sprite: pick(bokeh ? palette.discs : palette.dots),
      }
    }

    let W = 0
    let H = 0
    let dpr = 1
    const resize = () => {
      W = canvas.clientWidth
      H = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      const count = Math.round(Math.min(320, Math.max(90, (W * H) / 3800)))
      while (embers.length < count) embers.push(spawn())
      embers.length = count
      if (running) draw()
    }

    let raf = 0
    let running = false
    let last = 0
    let shown = -1

    const setOpacity = (a: number) => {
      const v = Math.round(a * 1000) / 1000
      if (v === shown) return
      shown = v
      canvas.style.opacity = String(v)
    }

    const draw = () => {
      const scroll = window.scrollY
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const spanY = H + WRAP * 2
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i]
        const cyc = simTime / e.life + e.lifePh
        const k = Math.floor(cyc)
        if (k !== e.cycle) {
          // burnt out: re-ignite somewhere else, in the current photo's colours
          e.cycle = k
          e.x = Math.random()
          e.y = Math.random()
          e.t0 = simTime
          e.sprite = pick(e.bokeh ? palette.discs : palette.dots)
        }
        // quick to catch, slow to cool, with a flicker on top
        const env = Math.sin(Math.PI * Math.pow(cyc - k, 0.6))
        const flicker = 0.72 + 0.28 * Math.sin(simTime * (2.2 + e.swayF * 4) + e.ph)
        const alpha = env * flicker * (e.bokeh ? 0.2 : 0.5 + 0.5 * e.z)
        if (alpha < 0.01) continue

        // hanging in the air: they rise slowly and lag the scrolling page
        const parallax = 0.12 + 0.4 * e.z
        const baseY = (e.y - e.rise * (simTime - e.t0)) * H - scroll * parallax
        const y = ((((baseY + WRAP) % spanY) + spanY) % spanY) - WRAP
        const x =
          e.x * W +
          Math.sin(simTime * e.swayF + e.ph) * e.sway +
          Math.sin(scroll * 0.0015 + e.ph) * 10 * e.z

        const d = e.bokeh ? e.size : e.size * 8
        ctx.globalAlpha = Math.min(1, alpha)
        ctx.drawImage(e.sprite, x - d / 2, y - d / 2, d, d)
      }
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      const a = intensity(window.scrollY / Math.max(1, window.innerHeight))
      if (a <= 0.001 || document.hidden) {
        stop()
        return
      }
      simTime += Math.min(0.05, (now - last) / 1000)
      last = now
      setOpacity(a)
      draw()
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
      setOpacity(0)
    }

    const check = () => {
      if (running || document.hidden) return
      if (intensity(window.scrollY / Math.max(1, window.innerHeight)) <= 0.001) return
      usePalette(wanted)
      running = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const unsubscribe = heroSlide.subscribe((src) => {
      wanted = src
      if (running || palettes.has(src)) usePalette(src)
    })

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    window.addEventListener("scroll", check, { passive: true })
    document.addEventListener("visibilitychange", check)
    check()

    return () => {
      stop()
      unsubscribe()
      ro.disconnect()
      window.removeEventListener("scroll", check)
      document.removeEventListener("visibilitychange", check)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      style={{ opacity: 0 }}
    />
  )
}
