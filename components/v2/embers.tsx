"use client"

import { useEffect, useRef } from "react"
import { canRunCloud } from "./hero-signal"

/*
 * The canvas for the hero cloud's embers (engine: ember-engine.ts).
 *
 * Layering: fixed at a negative z-index inside the curtain body, which is its
 * own stacking context (isolate, app/page.tsx). It paints over the body's
 * black but under every section's content, so opaque content (photos)
 * occludes the embers, and the sections at the top of the curtain keep
 * transparent backgrounds. Above the body's top edge the same canvas sits
 * over the curtain's gradient and the pinned hero, which is where the embers
 * peel off the photo. It is one small viewport (svh) tall, the same size as
 * the cloud's stage, so both draw with the same camera.
 *
 * The engine loads at idle, off the critical path, and only on devices that
 * run the cloud (reduced motion, Save-Data and low-end hardware get neither).
 */
export function Embers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canRunCloud()) return
    let cancelled = false
    let stop: (() => void) | null = null
    const boot = () => {
      import("./ember-engine").then(
        (mod) => {
          if (!cancelled) stop = mod.startEmbers(canvas)
        },
        () => {},
      )
    }
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    let idle = 0
    let timer: ReturnType<typeof setTimeout> | null = null
    if (w.requestIdleCallback) idle = w.requestIdleCallback(boot, { timeout: 2500 })
    else timer = setTimeout(boot, 1200)
    return () => {
      cancelled = true
      if (idle) w.cancelIdleCallback?.(idle)
      if (timer) clearTimeout(timer)
      stop?.()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-svh w-full"
      style={{ opacity: 0 }}
    />
  )
}
