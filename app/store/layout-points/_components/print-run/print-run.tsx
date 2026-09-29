"use client"

// Print Run to Floor Mark. The server HTML is the final frame and the CSS run plays
// from first paint without JS (data-run=auto). This shell only gates autoplay until
// the landing is in view, holds the run off screen, and offers skip and replay.
// No timers, no rAF: two IntersectionObservers, three listeners and a remount key.

import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { LABEL_DESIGN } from "../label/label-face"
import { DESKTOP, MOBILE, T } from "./geometry"
import { RunHeader } from "./run-header"
import { Scene } from "./scene"

type RunState = "auto" | "armed" | "play" | "hold" | "rest"

const WIDE = "(min-width: 1024px)"

export const RUN_CAPTION = `Diagram. Sanitised sample IDs, departments and coordinates. ${LABEL_DESIGN.caption} Not an application screen or a printed label.`

function displayed(root: HTMLElement, selector: string): Element | null {
  return Array.from(root.querySelectorAll(selector)).find((el) => el.getClientRects().length > 0) ?? null
}

export function PrintRun() {
  const [run, setRun] = useState<RunState>("auto")
  const [key, setKey] = useState(0)
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState("")
  const figRef = useRef<HTMLElement>(null)
  const ratio = useRef(0)

  // Hydration: decide once whether to continue, re-arm or rest.
  useLayoutEffect(() => {
    setReady(true)
    const fig = figRef.current
    if (!fig) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRun("rest")
      return
    }
    const sentinel = displayed(fig, "[data-lp-sentinel]")
    const anim = sentinel?.getAnimations?.()[0]
    const t = anim?.currentTime
    const elapsed = typeof t === "number" ? t : null
    if (elapsed !== null && elapsed >= T.rest) {
      setRun("rest")
      return
    }
    const payoff = displayed(fig, "[data-lp-payoff]")?.getBoundingClientRect()
    const vh = window.innerHeight
    if (payoff && payoff.top >= 0 && payoff.bottom <= vh * 0.92) {
      setRun("play")
      return
    }
    const box = fig.getBoundingClientRect()
    const offScreen = box.bottom <= 0 || box.top >= vh
    if (elapsed === null || elapsed < T.firstTopChange || offScreen) {
      setKey((k) => k + 1)
      setRun("armed")
      return
    }
    setRun("play")
  }, [])

  // Payoff gate: armed plays once the landing is fully in view. Re-observed on every remount.
  useEffect(() => {
    const fig = figRef.current
    if (!fig || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.99)) {
          setRun((r) => (r === "armed" ? "play" : r))
        }
      },
      { threshold: [0.99, 1], rootMargin: "0px 0px -8% 0px" },
    )
    fig.querySelectorAll("[data-lp-payoff]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])

  // Hold off screen and on hidden tabs; rest on a layout switch or at the end.
  useEffect(() => {
    const fig = figRef.current
    if (!fig) return
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[entries.length - 1]
              ratio.current = entry.isIntersecting ? entry.intersectionRatio : 0
              if (ratio.current < 0.1) setRun((r) => (r === "play" ? "hold" : r))
              else if (!document.hidden) setRun((r) => (r === "hold" ? "play" : r))
            },
            { threshold: [0, 0.1] },
          )
        : null
    io?.observe(fig)

    const onVisibility = () => {
      if (document.hidden) setRun((r) => (r === "play" ? "hold" : r))
      else if (ratio.current >= 0.1) setRun((r) => (r === "hold" ? "play" : r))
    }
    const mq = window.matchMedia(WIDE)
    const onLayout = () => setRun((r) => (r === "armed" || r === "play" || r === "hold" ? "rest" : r))
    const onEnd = (e: AnimationEvent) => {
      if (e.target instanceof Element && e.target.hasAttribute("data-lp-sentinel")) setRun("rest")
    }

    document.addEventListener("visibilitychange", onVisibility)
    mq.addEventListener("change", onLayout)
    fig.addEventListener("animationend", onEnd)
    return () => {
      io?.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      mq.removeEventListener("change", onLayout)
      fig.removeEventListener("animationend", onEnd)
    }
  }, [])

  const atRest = run === "rest"
  const onPress = () => {
    if (atRest) {
      setKey((k) => k + 1)
      setRun("play")
      setStatus("Replaying the print run.")
    } else {
      setRun("rest")
      setStatus("Skipped to the final frame.")
    }
  }

  return (
    <figure ref={figRef} data-run={run} className="lp-run border border-zinc-800 bg-black [contain:layout_paint]">
      <div key={key}>
        <RunHeader />
        <Scene geo={DESKTOP} idPrefix="lp-run-d" className="lp-geo-x hidden lg:block" />
        <Scene geo={MOBILE} idPrefix="lp-run-m" className="lp-geo-y mx-auto block max-w-[28rem] lg:hidden" />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-zinc-800 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
        <span>{RUN_CAPTION}</span>
        <span className="-my-2 flex min-h-11 w-full items-center lg:w-auto">
          {ready ? (
            <button
              type="button"
              onClick={onPress}
              className="inline-flex min-h-11 w-full items-center justify-between gap-2 px-1 font-bold text-white transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] motion-reduce:hidden lg:w-auto lg:justify-start"
            >
              <span aria-hidden="true" className="inline-block size-1.5 bg-[#00D26A]" />
              {atRest ? "Replay print run" : "Skip to end"}
            </button>
          ) : null}
        </span>
        <span role="status" className="sr-only">
          {status}
        </span>
      </figcaption>
    </figure>
  )
}
