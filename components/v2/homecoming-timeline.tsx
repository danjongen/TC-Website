"use client"

import { useEffect, useState, type ReactNode } from "react"

/**
 * Homecoming case study timeline.
 * Past phases come from the production record. Future entries are only
 * shows publicly announced and on sale on backstreetboys.com/events
 * (checked 27 Nov 2026) that TC is working on.
 * The NOW marker is computed in the browser, so the page never goes stale.
 */

type Entry = {
  start: string // ISO date, used for ordering and the NOW marker
  end?: string
  when: string
  label: string
  detail: string
}

const DELIVERED: Entry[] = [
  { start: "2026-04-01", end: "2026-04-30", when: "APR 2026", label: "COMMS_DESIGN", detail: "Riedel Bolero system design starts." },
  { start: "2026-05-01", end: "2026-05-31", when: "MAY 2026", label: "RACKS_AND_CASES", detail: "Network racks and touring cases specified and ordered." },
  {
    start: "2026-06-28",
    end: "2026-07-13",
    when: "28 JUN TO 13 JUL",
    label: "ROCK_LITITZ",
    detail: "Test builds and production rehearsals, alongside the Sphere load-in in Las Vegas.",
  },
  { start: "2026-09-01", when: "01 SEP", label: "CARDINGTON", detail: "First site day. Markout and steel." },
  { start: "2026-09-07", end: "2026-09-16", when: "07 TO 16 SEP", label: "REHEARSALS", detail: "Band on site. Three sessions a day, programming overnight." },
  { start: "2026-09-23", when: "23 SEP", label: "LOAD_IN", detail: "Merkur Spiel-Arena, Düsseldorf." },
  { start: "2026-09-25", end: "2026-10-07", when: "25 SEP TO 07 OCT", label: "10_SHOWS", detail: "All ten shows ran as scheduled." },
  { start: "2026-10-08", when: "08 OCT", label: "LOAD_OUT", detail: "Düsseldorf clear." },
]

const NEXT: Entry[] = [
  {
    start: "2026-12-26",
    end: "2027-01-02",
    when: "26 DEC TO 02 JAN",
    label: "SPHERE_LAS_VEGAS",
    detail: "Six shows across the New Year.",
  },
  {
    start: "2027-02-12",
    end: "2027-03-07",
    when: "12 FEB TO 07 MAR 2027",
    label: "ROGERS_CENTRE_TORONTO",
    detail: "Twelve stadium shows.",
  },
]

const day = (iso: string) => new Date(`${iso}T00:00:00`).getTime()

function status(entry: Entry, now: number | null): "done" | "live" | "next" {
  if (now === null) return day(entry.start) < day("2026-11-27") ? "done" : "next"
  const end = day(entry.end ?? entry.start) + 86_400_000
  if (now >= end) return "done"
  if (now >= day(entry.start)) return "live"
  return "next"
}

function Row({ entry, now }: { entry: Entry; now: number | null }) {
  const s = status(entry, now)
  return (
    <li className="relative grid grid-cols-[1.25rem_1fr] gap-x-4 pb-8 last:pb-0 md:grid-cols-[1.25rem_11rem_1fr] md:gap-x-6">
      <span className="relative flex h-5 items-center justify-center" aria-hidden="true">
        <span
          className={
            s === "done"
              ? "h-2.5 w-2.5 bg-white"
              : s === "live"
                ? "h-2.5 w-2.5 rounded-full bg-[#63D18F] shadow-[0_0_0_4px_rgba(99,209,143,0.18)]"
                : "h-2.5 w-2.5 border border-[#686A66] bg-black"
          }
        />
      </span>
      <p
        className={`font-mono text-[11px] leading-5 tracking-[0.2em] md:col-start-2 ${
          s === "next" ? "text-[#A8A6A0]" : "text-white"
        }`}
      >
        {entry.when}
        {s === "live" ? <span className="ml-3 text-[#63D18F]">LIVE</span> : null}
      </p>
      <div className="col-start-2 mt-1 md:col-start-3 md:mt-0">
        <p className={`font-mono text-xs tracking-[0.15em] ${s === "next" ? "text-[#A8A6A0]" : "text-white"}`}>{entry.label}</p>
        <p className="mt-1 text-base leading-relaxed text-zinc-400">{entry.detail}</p>
      </div>
    </li>
  )
}

function NowMarker() {
  return (
    <li className="relative grid grid-cols-[1.25rem_1fr] gap-x-4 pb-8 md:grid-cols-[1.25rem_11rem_1fr] md:gap-x-6" aria-label="Now">
      <span className="relative flex h-5 items-center justify-center" aria-hidden="true">
        <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#63D18F] opacity-40 motion-reduce:animate-none" />
        <span className="relative h-2 w-2 rounded-full bg-[#63D18F]" />
      </span>
      <p className="font-mono text-[11px] leading-5 tracking-[0.2em] text-[#63D18F] md:col-start-2">NOW</p>
    </li>
  )
}

export function HomecomingTimeline() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => setNow(Date.now()), [])

  const all = [...DELIVERED, ...NEXT]
  // Where the NOW marker sits: before the first entry that has not finished.
  const ref = now ?? day("2026-11-27")
  const nowIndex = all.findIndex((e) => ref < day(e.start))
  const liveAny = all.some((e) => status(e, now) === "live")

  const rows: ReactNode[] = []
  all.forEach((entry, i) => {
    if (!liveAny && i === nowIndex) rows.push(<NowMarker key="now" />)
    if (i === DELIVERED.length) {
      rows.push(
        <li key="next-label" className="grid grid-cols-[1.25rem_1fr] gap-x-4 pb-6 pt-2 md:gap-x-6">
          <span aria-hidden="true" />
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#686A66]">[ 02 / ANNOUNCED_ON_SALE ]</p>
        </li>,
      )
    }
    rows.push(<Row key={entry.label} entry={entry} now={now} />)
  })
  if (!liveAny && nowIndex === -1) rows.push(<NowMarker key="now" />)

  return (
    <figure className="my-12 border border-[#1A1A1A] bg-[#0C0C0C] p-6 md:p-10 lg:-mx-24 xl:-mx-40" data-reveal="fade">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#A8A6A0]">[ HOMECOMING_TIMELINE ]</p>
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#686A66]">LITITZ / CARDINGTON / DÜSSELDORF / NEXT</p>
      </div>
      <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-[#686A66]">[ 01 / DELIVERED_2026 ]</p>
      <ol className="relative">
        <span className="absolute bottom-2 left-[0.625rem] top-2 w-px -translate-x-1/2 bg-[#1A1A1A]" aria-hidden="true" />
        {rows}
      </ol>
      <figcaption className="mt-8 border-t border-[#1A1A1A] pt-4 font-mono text-[11px] leading-5 tracking-[0.15em] text-[#686A66]">
        UPCOMING DATES AS PUBLISHED ON BACKSTREETBOYS.COM, NOVEMBER 2026.
      </figcaption>
    </figure>
  )
}
