"use client"

import { useId, useState } from "react"

import { DATUM_POSITIONS, type DatumPosition } from "./label/datum"

const LABEL = { x: 50, y: 30, w: 220, h: 140 }

/**
 * Nine exact datum positions on one label. A native radio group drives the
 * drawing, so it works with a keyboard and a screen reader and without any
 * pointer. This demonstrates the choice; it is not the application UI.
 */
export function DatumPicker() {
  const [selected, setSelected] = useState<DatumPosition>("c")
  const name = useId()
  const current = DATUM_POSITIONS.find((p) => p.id === selected) ?? DATUM_POSITIONS[4]
  const cx = LABEL.x + current.x * LABEL.w
  const cy = LABEL.y + current.y * LABEL.h

  return (
    <div className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="bg-black">
        <svg
          viewBox="0 0 320 200"
          role="img"
          aria-label={`Label diagram with the exact datum at the ${current.label.toLowerCase()}`}
          className="block h-auto w-full"
        >
          <rect x={LABEL.x} y={LABEL.y} width={LABEL.w} height={LABEL.h} fill="#fafafa" />
          <rect x={LABEL.x} y={LABEL.y} width={LABEL.w} height="7" fill="#00D26A" />
          <text x={LABEL.x + 14} y={LABEL.y + 36} fontSize="16" fontWeight="700" fill="#000" className="font-mono">
            STG-003
          </text>
          {DATUM_POSITIONS.map((p) => (
            <circle
              key={p.id}
              cx={LABEL.x + p.x * LABEL.w}
              cy={LABEL.y + p.y * LABEL.h}
              r="3"
              fill={p.id === selected ? "#00D26A" : "#a1a1aa"}
            />
          ))}
          {/* One crosshair that glides between positions (CSS transition,
              off under reduced motion), and re-pings on every change. */}
          <g className="lp-glide" style={{ transform: `translate(${cx}px, ${cy}px)` }}>
            <g stroke="#000" strokeWidth="2" fill="none">
              <circle r="11" />
              <line x1="-18" x2="18" />
              <line y1="-18" y2="18" />
            </g>
            <circle r="15" fill="none" stroke="#00D26A" strokeWidth="2" />
            <circle
              key={selected}
              className="lp-ping-now"
              r="15"
              fill="none"
              stroke="#00D26A"
              strokeWidth="1.5"
              opacity="0"
            />
          </g>
          <text x="160" y="192" textAnchor="middle" fontSize="9" fill="#a1a1aa" className="font-mono">
            PLACE THIS POINT OVER THE SURVEYED POSITION
          </text>
        </svg>
      </div>
      <fieldset className="bg-black p-5 md:p-6">
        <legend className="sr-only">Exact datum position</legend>
        <p aria-hidden="true" className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
          Exact datum
        </p>
        <div className="mt-4 grid grid-cols-3 gap-px border border-zinc-800 bg-zinc-800">
          {DATUM_POSITIONS.map((p) => (
            <label
              key={p.id}
              className={`relative flex min-h-12 cursor-pointer items-center justify-center p-2 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.08em] transition-colors duration-300 ease-expo has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-[#00D26A] ${
                p.id === selected ? "bg-[#00D26A] font-bold text-black" : "bg-zinc-950 text-zinc-300 hover:bg-zinc-900"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={p.id}
                checked={p.id === selected}
                onChange={() => setSelected(p.id)}
                className="sr-only"
              />
              {p.label.replace(" corner", "").replace(" edge", "")}
              <span className="sr-only">
                {p.label.includes("corner") ? " corner" : p.label.includes("edge") ? " edge" : ""}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300" aria-live="polite">
          Datum at the <strong className="text-white">{current.label.toLowerCase()}</strong>.
        </p>
      </fieldset>
    </div>
  )
}
