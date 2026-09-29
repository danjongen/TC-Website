"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const lenis = new Lenis({
      // 0.14 settles quickly and reads as precise; lower values feel floaty
      lerp: 0.14,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    // expose for route-change scroll resets (see scroll-to-top.tsx)
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  return <>{children}</>
}
