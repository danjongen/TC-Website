"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"

/**
 * Plays a CSS sequence (.lp-seq in layout-points.css) the first time it
 * scrolls into view.
 *
 * The server HTML is the finished state. The sequence only arms itself when
 * it is still off screen at mount, so nothing already on screen ever
 * blinks out, and it does nothing under reduced motion or without
 * IntersectionObserver.
 */
export function Sequence({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    el.dataset.seq = "armed"
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.seq = "play"
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-seq="idle" className={`lp-seq ${className}`}>
      {children}
    </div>
  )
}
