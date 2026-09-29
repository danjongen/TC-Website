"use client"

import { useEffect, useMemo, useState } from "react"

export type ClockZone = { label: string; tz: string }

/**
 * Live 24h clocks for the footer CTA. One shared tick aligned to the second
 * boundary, so every zone flips together. The server HTML shows a neutral
 * placeholder, so there is no hydration mismatch.
 */
export function Clocks({ zones }: { zones: ClockZone[] }) {
  const [now, setNow] = useState<Date | null>(null)

  const formats = useMemo(
    () =>
      zones.map(
        (z) =>
          new Intl.DateTimeFormat("en-GB", {
            timeZone: z.tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23",
          }),
      ),
    [zones],
  )

  useEffect(() => {
    let id = 0
    const tick = () => {
      const d = new Date()
      setNow(d)
      id = window.setTimeout(tick, 1000 - d.getMilliseconds())
    }
    tick()
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {zones.map((z, i) => (
        <span key={z.label} className="flex gap-3">
          <span className="text-zinc-400">{z.label}</span>
          <span className="tabular-nums text-zinc-400">{now ? formats[i].format(now) : "--:--:--"}</span>
        </span>
      ))}
    </>
  )
}
