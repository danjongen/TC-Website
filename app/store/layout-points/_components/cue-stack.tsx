"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export type CueStep = {
  id: string
  title: string
  component: string
  body: ReactNode
  aside?: ReactNode
}

type State = "standby" | "go" | "done"

/**
 * The five-step workflow as a show-control cue stack. As you scroll, the
 * cue in the reading line goes to GO, cues above it read DONE and cues
 * below read STANDBY, while a green rail fills down the stack.
 *
 * Server HTML is a plain ordered list with every step visible. The states
 * are decoration (aria-hidden); the rail is off under reduced motion.
 */
export function CueStack({ steps }: { steps: CueStep[] }) {
  const listRef = useRef<HTMLOListElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-cue-step]"))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.55
      let current = -1
      items.forEach((item, index) => {
        if (item.getBoundingClientRect().top <= line) current = index
      })
      setActive(current)

      const rail = railRef.current
      if (rail && !reduce) {
        const rect = list.getBoundingClientRect()
        const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height))
        rail.style.transform = `scaleY(${progress})`
      }
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const stateOf = (index: number): State | null => {
    if (active < 0) return null
    if (index < active) return "done"
    if (index === active) return "go"
    return "standby"
  }

  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-[1.4rem] top-0 w-px bg-zinc-800 md:left-[2.2rem]" />
      <span
        ref={railRef}
        aria-hidden="true"
        className="absolute bottom-0 left-[1.4rem] top-0 w-px origin-top bg-[#00D26A] motion-reduce:hidden md:left-[2.2rem]"
        style={{ transform: "scaleY(0)" }}
      />
      <ol ref={listRef} className="relative">
        {steps.map((step, index) => {
          const state = stateOf(index)
          const lit = state === "go"
          return (
            <li
              key={step.id}
              id={step.id}
              data-cue-step
              className="grid scroll-mt-28 grid-cols-[2.8rem_minmax(0,1fr)] gap-x-5 border-t border-zinc-800 py-10 first:border-t-0 md:grid-cols-[4.4rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-10 md:py-14"
            >
              <div className="relative">
                <span
                  className={`relative z-10 flex size-11 items-center justify-center border font-mono text-sm font-bold transition-colors duration-300 ease-expo md:size-[4.4rem] md:text-lg ${
                    lit
                      ? "border-[#00D26A] bg-[#00D26A] text-black"
                      : state === "done"
                        ? "border-zinc-600 bg-black text-white"
                        : "border-zinc-800 bg-black text-zinc-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">{step.component}</p>
                  {state && (
                    <p
                      aria-hidden="true"
                      className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ease-expo ${
                        lit ? "text-[#00D26A]" : state === "done" ? "text-zinc-300" : "text-zinc-400"
                      }`}
                    >
                      [ {state === "go" ? "GO" : state === "done" ? "DONE" : "STANDBY"} ]
                    </p>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] md:text-4xl">{step.title}</h3>
                <div className="mt-5 max-w-xl leading-relaxed text-zinc-300">{step.body}</div>
              </div>
              {step.aside ? <div className="col-start-2 mt-8 md:col-start-3 md:mt-0">{step.aside}</div> : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
