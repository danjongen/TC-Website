/**
 * Functional diagrams for the Layout Points pages.
 *
 * These are drawings of the workflow, not application screens. Each one is
 * captioned as a diagram and uses sanitised sample IDs and coordinates. Real
 * product captures render separately through EvidenceFigure when present.
 */

import type { CSSProperties } from "react"

import { LABEL_DESIGN, LABEL_STOCK, LabelFace } from "./label/label-face"
import { SAMPLE } from "./print-run/geometry"
import { Sequence } from "./sequence"

const GREEN = "#00D26A"

function d(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties
}

/**
 * Measurement diagram. The printed frame lands off centre on the stock; the
 * six measurements describe it; the corrected frame moves to centre.
 */
export function CalibrationDiagram() {
  const ticks = Array.from({ length: 11 }, (_, i) => i)
  return (
    <figure className="border border-zinc-800 bg-black">
      <Sequence>
        <svg viewBox="0 0 360 260" role="img" aria-labelledby="calibration-title" className="block h-auto w-full">
          <title id="calibration-title">
            Calibration diagram. The printed frame sits off centre on the label stock. Four gaps, G1 to G4, run from the
            printed frame to each cut edge. Two printed rulers, R1 horizontal and R2 vertical, check scale. A corrected
            frame, centred on the stock, shows the result after correction.
          </title>
          <rect x="40" y="30" width="280" height="200" fill="#fafafa" />
          <rect
            className="lp-draw"
            pathLength={1}
            x="50"
            y="46"
            width="246"
            height="176"
            fill="none"
            stroke="#000"
            strokeWidth="1.5"
            style={d(0)}
          />
          {[
            { k: "G1", line: [180, 30, 180, 46], text: [186, 22] },
            { k: "G2", line: [296, 131, 320, 131], text: [326, 135] },
            { k: "G3", line: [180, 222, 180, 230], text: [186, 248] },
            { k: "G4", line: [40, 131, 50, 131], text: [10, 135] },
          ].map((g, i) => (
            <g key={g.k}>
              <line
                className="lp-draw"
                pathLength={1}
                x1={g.line[0]}
                y1={g.line[1]}
                x2={g.line[2]}
                y2={g.line[3]}
                stroke={GREEN}
                strokeWidth="2"
                style={d(500 + i * 150)}
              />
              <text
                className="lp-fade lp-s"
                x={g.text[0]}
                y={g.text[1]}
                fill={GREEN}
                fontSize="10"
                fontWeight="700"
                style={d(560 + i * 150)}
              >
                <tspan className="font-mono">{g.k}</tspan>
              </text>
            </g>
          ))}
          <g className="lp-fade lp-s" style={d(1150)}>
            <g stroke="#000" strokeWidth="1">
              <line x1="90" y1="100" x2="270" y2="100" />
              {ticks.map((i) => (
                <line key={`h${i}`} x1={90 + i * 18} y1={100} x2={90 + i * 18} y2={i % 5 === 0 ? 88 : 94} />
              ))}
              <line x1="90" y1="110" x2="90" y2="200" />
              {ticks.slice(0, 6).map((i) => (
                <line key={`v${i}`} x1={90} y1={110 + i * 18} x2={i % 5 === 0 ? 102 : 96} y2={110 + i * 18} />
              ))}
            </g>
            <g fill="#000" fontSize="10" fontWeight="700" className="font-mono">
              <text x="276" y="104">
                R1
              </text>
              <text x="84" y="214">
                R2
              </text>
            </g>
          </g>
          <rect
            className="lp-correct lp-s"
            x="57"
            y="42"
            width="246"
            height="176"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            style={d(1500)}
          />
          <text
            className="lp-fade lp-s font-mono"
            x="296"
            y="210"
            textAnchor="end"
            fill="#047a3e"
            fontSize="9"
            fontWeight="700"
            style={d(2400)}
          >
            CORRECTED
          </text>
        </svg>
      </Sequence>
      <figcaption className="border-t border-zinc-800 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
        Diagram of the six measurements. Print the real target from Datum Label Studio.
      </figcaption>
    </figure>
  )
}

const STAGES = ["Vectorworks", "Verified field package", "Datum Label Studio", "Printer", "Field"]

/** VECTORWORKS > VERIFIED FIELD PACKAGE > DATUM LABEL STUDIO > PRINTER > FIELD */
export function ProcessStrip() {
  return (
    <Sequence>
      <div className="relative border-y border-zinc-800">
        <span aria-hidden="true" className="lp-track absolute left-0 top-0 h-px w-full bg-[#00D26A]" style={d(0)} />
        <ol className="grid grid-cols-1 font-mono text-xs font-bold uppercase tracking-[0.16em] sm:grid-cols-5">
          {STAGES.map((stage, i) => (
            <li
              key={stage}
              className="lp-stage flex items-center justify-between gap-3 border-b border-zinc-800 px-1 py-4 text-white last:border-b-0 sm:border-b-0 sm:border-l sm:px-4 sm:first:border-l-0"
              style={d(i * 400)}
            >
              <span>
                <span className="mr-3 text-[#00D26A]">{String(i + 1).padStart(2, "0")}</span>
                {stage}
              </span>
              {i < STAGES.length - 1 && (
                <span aria-hidden="true" className="text-zinc-400">
                  &gt;
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Sequence>
  )
}

/** Control label versus a department layout label. */
export function LabelStyles() {
  const w = 240
  const h = w / LABEL_STOCK.aspect
  const control = SAMPLE["CTL-01"]
  const layout = SAMPLE["STG-003"]
  return (
    <figure className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
      <div className="bg-black p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">Control label · fixed style</p>
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`Control label ${control.id}, fixed yellow and black style, datum at the centre.`}
          className="mt-4 block h-auto max-w-full"
        >
          <LabelFace label={control} width={w} height={h} radius={4} />
        </svg>
      </div>
      <div className="bg-black p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
          Layout label · department colour
        </p>
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`Layout label ${layout.id}, Staging department colour, datum at the top edge.`}
          className="mt-4 block h-auto max-w-full"
        >
          <LabelFace label={layout} width={w} height={h} radius={4} />
        </svg>
      </div>
      <figcaption className="bg-black px-6 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 sm:col-span-2">
        Diagram. Department names and colours are yours to set. Control labels cannot be restyled.{" "}
        {LABEL_DESIGN.caption}
      </figcaption>
    </figure>
  )
}
