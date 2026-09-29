"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { m, useMotionValue, useSpring } from "framer-motion"
import { DUR, EASE_EXPO } from "@/lib/motion"

/**
 * Contextual reticle. The native cursor stays; this only adds a thin green
 * ring with N/E/S/W ticks while the pointer is over something interactive,
 * and grows to carry a label over elements with data-cursor-label
 * (e.g. data-cursor-label="VIEW" on the homepage project cards).
 *
 * Mounted only for a hovering fine pointer without reduced motion, so touch
 * devices never get it. Positioned with transforms (springs), never left/top.
 */
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
const INTERACTIVE = "a[href], button:not(:disabled), [data-cursor='hover'], [data-cursor-label]"
const SPRING = { stiffness: 500, damping: 40 }
const RING = 40
const RING_LABEL = 72

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}
const getSnapshot = () => window.matchMedia(QUERY).matches
const getServerSnapshot = () => false

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return enabled ? <Reticle /> : null
}

/** on: over an interactive target. labelled: target carries a label. text: last label, kept so it can fade out. */
type ReticleState = { on: boolean; labelled: boolean; text: string }
const HIDDEN: ReticleState = { on: false, labelled: false, text: "" }

function Reticle() {
  const [state, setState] = useState<ReticleState>(HIDDEN)
  const stateRef = useRef<ReticleState>(HIDDEN)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  useEffect(() => {
    let lastTarget: Element | null = null
    let inside = false
    let px = 0
    let py = 0
    let raf = 0

    // Only touch React state when the reticle actually changes.
    const commit = (next: ReticleState) => {
      const cur = stateRef.current
      if (cur.on === next.on && cur.labelled === next.labelled && cur.text === next.text) return
      stateRef.current = next
      setState(next)
    }

    const resolve = (target: Element | null) => {
      if (target === lastTarget) return
      lastTarget = target
      const hit = target ? target.closest(INTERACTIVE) : null
      const label = hit ? (target!.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? "").trim() : ""
      commit({ on: !!hit, labelled: !!label, text: label || stateRef.current.text })
    }

    const hide = () => {
      inside = false
      lastTarget = null
      commit({ ...stateRef.current, on: false, labelled: false })
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return hide()
      px = e.clientX
      py = e.clientY
      if (!inside) {
        // Entering the window: land on the pointer instead of springing in from the last exit point.
        inside = true
        x.jump(px)
        y.jump(py)
        sx.jump(px)
        sy.jump(py)
      } else {
        x.set(px)
        y.set(py)
      }
      resolve(e.target instanceof Element ? e.target : null)
    }

    // Fires when the DOM under a still pointer changes (route change, hover content).
    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !inside) return
      resolve(e.target instanceof Element ? e.target : null)
    }

    // No relatedTarget: the pointer left the window (or entered an iframe).
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) hide()
    }

    // Content scrolls under a still pointer: re-check what is beneath it once per frame.
    const onScroll = () => {
      if (!inside || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        resolve(document.elementFromPoint(px, py))
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, { passive: true })
    document.addEventListener("pointerout", onOut, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver)
      document.removeEventListener("pointerout", onOut)
      window.removeEventListener("scroll", onScroll)
    }
  }, [x, y, sx, sy])

  const size = state.labelled ? RING_LABEL : RING

  return (
    <m.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x: sx, y: sy }}>
      <div className="-translate-x-1/2 -translate-y-1/2">
        <m.div
          className="relative flex items-center justify-center rounded-full border border-[#00D26A]"
          initial={false}
          animate={{ opacity: state.on ? 1 : 0, scale: state.on ? 1 : 0.6, width: size, height: size }}
          transition={{
            opacity: { duration: DUR.micro, ease: EASE_EXPO },
            default: { duration: DUR.ui, ease: EASE_EXPO },
          }}
        >
          <span className="absolute left-1/2 top-0 h-[5px] w-px -translate-x-1/2 bg-[#00D26A]" />
          <span className="absolute right-0 top-1/2 h-px w-[5px] -translate-y-1/2 bg-[#00D26A]" />
          <span className="absolute bottom-0 left-1/2 h-[5px] w-px -translate-x-1/2 bg-[#00D26A]" />
          <span className="absolute left-0 top-1/2 h-px w-[5px] -translate-y-1/2 bg-[#00D26A]" />
          <m.span
            className="pl-[0.2em] font-mono text-[10px] leading-none tracking-[0.2em] text-[#00D26A]"
            initial={false}
            animate={{ opacity: state.labelled ? 1 : 0 }}
            transition={{ duration: DUR.micro, ease: EASE_EXPO, delay: state.labelled ? DUR.micro : 0 }}
          >
            {state.text}
          </m.span>
        </m.div>
      </div>
    </m.div>
  )
}
