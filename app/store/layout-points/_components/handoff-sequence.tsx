"use client"

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react"

/**
 * Hero sequence: points are placed in the Vectorworks plan, the export
 * signal crosses to the field package, the checksums settle to Package
 * verified, then the label feeds out of the printer and the exact datum
 * locks on.
 *
 * Server HTML is the finished drawing. The sequence is CSS load-in
 * (.lp-autoplay in layout-points.css) that runs from first paint, so it
 * needs no JavaScript; this component only adds the checksum scramble and
 * the replay control. Reduced motion shows the finished drawing.
 */

const GREEN = "#00D26A"
const LINE = "#3f3f46"
const FAINT = "#27272a"
const MUTED = "#a1a1aa"

// Timeline in ms from first paint.
const T = {
  control: 100,
  points: [300, 650, 1000, 1350],
  signalExport: 1700,
  rows: 2250,
  rowStep: 90,
  scrambleFrom: 2800,
  verified: 3400,
  signalOpen: 3800,
  feed: 4350,
  lock: 5150,
  ping: 5400,
  caption: 5600,
} as const

const POINTS = [
  { id: "STG-001", x: 104, y: 70, e: "12.400", n: "-3.200" },
  { id: "STG-002", x: 216, y: 70, e: "17.600", n: "-3.200" },
  { id: "STG-003", x: 216, y: 150, e: "17.600", n: "-8.200" },
  { id: "STG-004", x: 104, y: 150, e: "12.400", n: "-8.200" },
]

const ROWS = [
  ["Job", "2026-09-29 14.30"],
  ["Label data", "Datum Label Studio"],
  ["CONTROL", "Leica format"],
  ["POINTS", "Leica format"],
  ["Manifest", "Contents + counts"],
] as const

const CHECKSUM = "9f2c 41ab e07d"
const HEX = "0123456789abcdef"

function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties
}

function Crosshair({
  x,
  y,
  r = 7,
  color = GREEN,
  strong = false,
}: {
  x: number
  y: number
  r?: number
  color?: string
  strong?: boolean
}) {
  return (
    <g stroke={color} strokeWidth={strong ? 2 : 1.5} fill="none">
      <circle cx={x} cy={y} r={r} />
      <line x1={x - r - 5} y1={y} x2={x + r + 5} y2={y} />
      <line x1={x} y1={y - r - 5} x2={x} y2={y + r + 5} />
    </g>
  )
}

function PanelHeader({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-zinc-800 px-5 py-4">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white">
        <span className="text-[#00D26A]">{index}</span> {title}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">{sub}</p>
    </div>
  )
}

function Connector({ label, at }: { label: string; at: number }) {
  return (
    <div className="relative flex min-h-12 items-center justify-center lg:min-h-0" aria-hidden="true">
      <span className="absolute inset-y-0 left-1/2 w-px bg-zinc-700 lg:inset-x-0 lg:inset-y-auto lg:left-0 lg:top-1/2 lg:h-px lg:w-auto" />
      <span
        className="lp-signal absolute left-1/2 top-1/2 size-2 bg-[#00D26A] opacity-0 shadow-[0_0_12px_#00D26A]"
        style={delay(at)}
      />
      <span className="relative bg-black px-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#00D26A] lg:px-0 lg:py-2 lg:[writing-mode:vertical-rl]">
        {label}
      </span>
    </div>
  )
}

/** Checksum text that scrambles, then settles, in step with the CSS timeline. */
function ChecksumScramble({ anchor }: { anchor: RefObject<HTMLElement | null> }) {
  const [text, setText] = useState(CHECKSUM)

  useEffect(() => {
    // The verified row's animation knows how long ago the sequence started,
    // whether that was first paint or a replay.
    const elapsed = elapsedOn(anchor)
    if (elapsed === null) return
    if (elapsed >= T.verified) return

    let interval = 0
    const start = window.setTimeout(
      () => {
        interval = window.setInterval(() => {
          setText(
            CHECKSUM.split("")
              .map((ch) => (ch === " " ? " " : HEX[Math.floor(Math.random() * 16)]))
              .join(""),
          )
        }, 45)
      },
      Math.max(0, T.scrambleFrom - elapsed),
    )
    const stop = window.setTimeout(() => {
      window.clearInterval(interval)
      setText(CHECKSUM)
    }, T.verified - elapsed)

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(stop)
      window.clearInterval(interval)
    }
  }, [anchor])

  return <>{text}</>
}

/** Where the CSS timeline is, read from an animation it is running. */
function elapsedOn(anchor: RefObject<HTMLElement | null>): number | null {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null
  const anim = anchor.current?.getAnimations?.()[0]
  return typeof anim?.currentTime === "number" ? anim.currentTime : null
}

/** Live coordinate readout that follows each point as it is placed. */
function Readout({ anchor }: { anchor: RefObject<HTMLElement | null> }) {
  const [index, setIndex] = useState(POINTS.length - 1)

  useEffect(() => {
    const elapsed = elapsedOn(anchor)
    if (elapsed === null || elapsed >= T.points[T.points.length - 1]) return
    let current = -1
    T.points.forEach((t, i) => {
      if (t <= elapsed) current = i
    })
    setIndex(current)
    const timers = T.points.map((t, i) => (t > elapsed ? window.setTimeout(() => setIndex(i), t - elapsed) : 0))
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [anchor])

  const p = POINTS[index]
  if (!p) return null
  return (
    <text x="12" y="16" fill={MUTED} fontSize="9" className="font-mono">
      {p.id} E {p.e} N {p.n} Z 0.000
    </text>
  )
}

function Drawing() {
  const verifiedRef = useRef<HTMLDivElement>(null)

  return (
    <div className="lp-autoplay grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)_2.5rem_minmax(0,1fr)]">
      <div>
        <PanelHeader index="01" title="Vectorworks" sub="Layout Points" />
        <svg viewBox="0 0 320 220" role="img" aria-labelledby="handoff-plan-title" className="block h-auto w-full">
          <title id="handoff-plan-title">
            Plan diagram. Two control points and four layout points, numbered STG-001 to STG-004, placed around a stage
            outline.
          </title>
          <defs>
            <pattern id="lp-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0H0V16" fill="none" stroke={FAINT} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="320" height="220" fill="url(#lp-grid)" />
          <rect
            className="lp-draw"
            pathLength={1}
            x="104"
            y="70"
            width="112"
            height="80"
            fill="none"
            stroke={LINE}
            strokeWidth="1.5"
            style={delay(0)}
          />
          <line x1="160" y1="20" x2="160" y2="200" stroke={LINE} strokeWidth="1" strokeDasharray="10 4 2 4" />
          {[
            { id: "CTL-01", x: 40, y: 190 },
            { id: "CTL-02", x: 280, y: 30 },
          ].map((c) => (
            <g key={c.id} className="lp-pop" style={delay(T.control)}>
              <path
                d={`M${c.x} ${c.y - 9}L${c.x + 9} ${c.y + 7}H${c.x - 9}Z`}
                fill="#facc15"
                stroke="#000"
                strokeWidth="1"
              />
              <text
                x={c.x > 200 ? c.x - 13 : c.x + 13}
                y={c.y + 4}
                textAnchor={c.x > 200 ? "end" : "start"}
                fill="#facc15"
                fontSize="10"
                className="font-mono"
              >
                {c.id}
              </text>
            </g>
          ))}
          {POINTS.map((p, i) => (
            <g key={p.id}>
              <circle
                className="lp-ping"
                cx={p.x}
                cy={p.y}
                r="6"
                fill="none"
                stroke={GREEN}
                strokeWidth="1.5"
                opacity="0"
                style={delay(T.points[i])}
              />
              <g className="lp-pop" style={delay(T.points[i])}>
                <Crosshair x={p.x} y={p.y} r={5} />
                <text x={p.x + 10} y={p.y - 9} fill="#fff" fontSize="10" className="font-mono">
                  {p.id}
                </text>
              </g>
            </g>
          ))}
          <Readout anchor={verifiedRef} />
        </svg>
      </div>

      <Connector label="Export" at={T.signalExport} />

      <div className="border-t border-zinc-800 lg:border-t-0">
        <PanelHeader index="02" title="Field package" sub="One local folder" />
        <dl className="divide-y divide-zinc-800 font-mono text-[11px] uppercase tracking-[0.1em]">
          {ROWS.map(([k, v], i) => (
            <div key={k} className="lp-row flex justify-between gap-4 px-5 py-3" style={delay(T.rows + i * T.rowStep)}>
              <dt className="text-white">{k}</dt>
              <dd className="text-right text-zinc-400">{v}</dd>
            </div>
          ))}
          <div className="lp-row flex justify-between gap-4 px-5 py-3" style={delay(T.rows + ROWS.length * T.rowStep)}>
            <dt className="text-white">SHA-256</dt>
            <dd className="text-right tabular-nums text-zinc-400">
              <ChecksumScramble anchor={verifiedRef} />
            </dd>
          </div>
          <div
            ref={verifiedRef}
            className="lp-verify flex items-center justify-between gap-4 bg-zinc-950 px-5 py-3"
            style={delay(T.verified)}
          >
            <dt className="font-bold text-[#00D26A]">Package verified</dt>
            <dd className="text-right normal-case tracking-normal text-zinc-400">
              manifest, checksums and payload agree
            </dd>
          </div>
        </dl>
      </div>

      <Connector label="Open" at={T.signalOpen} />

      <div className="border-t border-zinc-800 lg:border-t-0">
        <PanelHeader index="03" title="Datum Label Studio" sub="Mac app" />
        <svg viewBox="0 0 320 220" role="img" aria-labelledby="handoff-label-title" className="block h-auto w-full">
          <title id="handoff-label-title">
            Label diagram. Point STG-003 printed with its coordinates and a highlighted exact datum at the centre.
          </title>
          <defs>
            <pattern id="lp-grid-label" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0H0V16" fill="none" stroke={FAINT} strokeWidth="1" />
            </pattern>
            <clipPath id="lp-slot">
              <rect x="0" y="34" width="320" height="186" />
            </clipPath>
          </defs>
          <rect width="320" height="220" fill="url(#lp-grid-label)" />
          <rect x="44" y="30" width="232" height="4" fill={LINE} />
          <text x="272" y="24" textAnchor="end" fill={MUTED} fontSize="8" className="font-mono">
            PRINTER
          </text>
          <g clipPath="url(#lp-slot)">
            <g className="lp-feed" style={delay(T.feed)}>
              <rect x="60" y="40" width="200" height="130" fill="#fafafa" />
              <rect x="60" y="40" width="200" height="8" fill={GREEN} />
              <text x="74" y="74" fill="#000" fontSize="18" fontWeight="700" className="font-mono">
                STG-003
              </text>
              <text x="74" y="156" fill="#3f3f46" fontSize="9" className="font-mono">
                E 17.600 N -8.200 Z 0.000
              </text>
              <g className="lp-lock" style={delay(T.lock)}>
                <Crosshair x={160} y={110} r={9} color="#000" strong />
                <circle cx="160" cy="110" r="2.5" fill={GREEN} />
              </g>
              <circle
                className="lp-ping"
                cx="160"
                cy="110"
                r="10"
                fill="none"
                stroke={GREEN}
                strokeWidth="2"
                opacity="0"
                style={delay(T.ping)}
              />
            </g>
          </g>
          <g className="lp-fade" style={delay(T.caption)}>
            <line x1="60" y1="190" x2="260" y2="190" stroke={MUTED} strokeWidth="1" />
            <line x1="60" y1="185" x2="60" y2="195" stroke={MUTED} />
            <line x1="260" y1="185" x2="260" y2="195" stroke={MUTED} />
            <text x="160" y="208" fill={MUTED} fontSize="9" textAnchor="middle" className="font-mono">
              EXACT SIZE PDF · DATUM AT CENTRE
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export function HandoffSequence() {
  const [run, setRun] = useState(0)

  return (
    <figure className="border border-zinc-800 bg-black">
      <Drawing key={run} />
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-zinc-800 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
        <span>Diagram. Sanitised sample IDs and coordinates. Not an application screen.</span>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="-my-2 inline-flex min-h-11 items-center gap-2 px-1 font-bold text-white transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] motion-reduce:hidden"
        >
          <span aria-hidden="true" className="inline-block size-1.5 bg-[#00D26A]" />
          Replay handoff
        </button>
      </figcaption>
    </figure>
  )
}
