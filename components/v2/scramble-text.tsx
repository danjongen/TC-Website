"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "█▓▒░<>/_\\|01"

/** Decodes text character-by-character through a glyph scramble. */
export function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let raf = 0
    const totalFrames = text.length * 2 + 14

    const timer = setTimeout(() => {
      const tick = () => {
        frame++
        const settled = Math.floor((frame / totalFrames) * text.length * 1.4)
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " " || i < settled) return ch
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join(""),
        )
        if (settled < text.length) raf = requestAnimationFrame(tick)
        else setDisplay(text)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [text, delay])

  return <span aria-label={text}>{display}</span>
}
