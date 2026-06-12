"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/** Crosshair cursor: dot + lagging ring that expands over interactive elements. Desktop only. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 250, damping: 22 })
  const ringY = useSpring(y, { stiffness: 250, damping: 22 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement
      setHovering(!!t.closest("a, button, [data-cursor='hover']"))
    }
    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D26A]"
        style={{ left: x, top: y }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D26A]/60 mix-blend-difference"
        style={{ left: ringX, top: ringY }}
        animate={{ width: hovering ? 56 : 28, height: hovering ? 56 : 28, opacity: hovering ? 1 : 0.6 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    </>
  )
}
