"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Homepage HUD: a scroll-scrubbed SMPTE timecode and the active cue, set
 * vertically on the right edge like a media-server readout. One pixel of
 * scroll is one frame at 30fps, so the page reads as a show timeline.
 *
 * Sections opt in with data-cue="02" data-cue-label="SELECTED WORK".
 * Desktop only (md and up), purely decorative, hidden from assistive tech.
 */
const FPS = 30

function timecode(frames: number) {
  const f = Math.max(0, Math.round(frames))
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${pad(Math.floor(f / (FPS * 3600)))}:${pad(Math.floor(f / (FPS * 60)) % 60)}:${pad(Math.floor(f / FPS) % 60)}:${pad(f % FPS)}`
}

export function ShowHud() {
  const tcRef = useRef<HTMLSpanElement>(null)
  const [cue, setCue] = useState<string>("STANDBY")

  useEffect(() => {
    let raf = 0
    const paint = () => {
      raf = 0
      if (tcRef.current) tcRef.current.textContent = timecode(window.scrollY)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener("scroll", onScroll, { passive: true })

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-cue]"))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          setCue(`CUE ${el.dataset.cue} / ${el.dataset.cueLabel ?? ""}`.trim())
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    const onTop = () => {
      if (sections[0] && sections[0].getBoundingClientRect().top > window.innerHeight / 2) setCue("STANDBY")
    }
    window.addEventListener("scroll", onTop, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scroll", onTop)
      io.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="tc-hud pointer-events-none fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 select-none font-mono text-[10px] tracking-[0.25em] text-zinc-500 [writing-mode:vertical-rl] md:block"
    >
      <span className="text-zinc-600">TC </span>
      <span ref={tcRef} className="tabular-nums text-zinc-400">
        00:00:00:00
      </span>
      <span className="mt-6 inline-block">{cue}</span>
    </div>
  )
}
