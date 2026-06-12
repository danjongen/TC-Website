"use client"
import { useEffect, useRef, useState } from "react"

/**
 * Flashes its text white→settle for ~180ms whenever the value changes.
 * No entrance animation on first mount. Used for right-panel readouts.
 */
export function FlashValue({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef<string | null>(null)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (prev.current !== null && prev.current !== value) {
      setFlash(false)
      // Force reflow so the animation restarts on rapid changes.
      void ref.current?.offsetWidth
      setFlash(true)
      const t = setTimeout(() => setFlash(false), 180)
      prev.current = value
      return () => clearTimeout(t)
    }
    prev.current = value
  }, [value])

  return (
    <span ref={ref} className={`${className ?? ""}${flash ? " value-flash" : ""}`}>
      {value}
    </span>
  )
}
