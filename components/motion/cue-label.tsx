"use client"

import { useEffect, useRef, useState, type ElementType } from "react"

const GLYPHS = "01/\\|<>_-=+#*"
const FRAME_MS = 32

/**
 * Mono eyebrow label in the show-control voice: "[ CUE 02 / SELECTED WORK ]".
 *
 * Decodes once through a glyph scramble when it enters the viewport. On a
 * cold page load, labels already on screen are left alone (never scramble
 * text someone is reading); after a client navigation they decode as the
 * page wipes in. Screen readers always get the plain text.
 *
 *   <CueLabel index="02" cue>SELECTED WORK</CueLabel>  -> [ CUE 02 / SELECTED WORK ]
 *   <CueLabel index="02">SERVICES</CueLabel>          -> [ 02 / SERVICES ]
 *   <CueLabel>SERVICE / TECHNICAL DIRECTION</CueLabel> -> [ SERVICE / TECHNICAL DIRECTION ]
 */
export function CueLabel({
  children,
  index,
  cue = false,
  as: Tag = "p",
  className = "font-mono text-[11px] tracking-[0.2em] text-zinc-400",
}: {
  children: string
  index?: string
  cue?: boolean
  as?: ElementType
  className?: string
}) {
  const prefix = index ? `${cue ? "CUE " : ""}${index} / ` : ""
  const text = `[ ${prefix}${children} ]`
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let last = 0
    let frame = 0
    const total = Math.min(28, 10 + text.length)

    const run = () => {
      const tick = (t: number) => {
        if (t - last >= FRAME_MS) {
          last = t
          frame++
          const settled = Math.floor((frame / total) * text.length)
          setDisplay(
            text
              .split("")
              .map((ch, i) => (i < settled || ch === " " || ch === "[" || ch === "]" ? ch : GLYPHS[(i * 7 + frame) % GLYPHS.length]))
              .join(""),
          )
          if (settled >= text.length) {
            setDisplay(text)
            return
          }
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const rect = el.getBoundingClientRect()
    const onScreenAtMount = rect.top < window.innerHeight && rect.bottom > 0
    if (onScreenAtMount && !window.__tcNav) return

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        run()
      },
      { rootMargin: "0px 0px -8% 0px" },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [text])

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
}
