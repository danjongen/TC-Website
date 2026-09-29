// PLACEHOLDER FACE. Drawn from known facts only: department name and colour,
// point ID, E/N/Z coordinates, highlighted exact-datum target, fixed CONTROL style.
// Replace the body with the exported Datum Label Studio design; keep these exports.
//
// Server-safe: no client directive, no hooks, no ids, no animation. It renders one
// nested svg whose own viewport clips targets at edges and corners, so it is valid
// inside any parent SVG. The caller owns the blank stock, clips, motion and shadows.

import type { JSX } from "react"

import type { DatumPosition } from "./datum"
import { faceLayout, rowText } from "./face-layout"

export type PointCoords = { e: string; n: string; z: string } // preformatted as exported, never computed

export type LabelData =
  | {
      kind: "layout"
      id: string
      department: { name: string; colour: string }
      coords: PointCoords
      datum: DatumPosition
    }
  | { kind: "control"; id: string; coords: PointCoords; datum: DatumPosition } // no department or colour: CONTROL cannot be restyled

export type LabelFaceProps = {
  label: LabelData
  x?: number
  y?: number // top-left of the stock in the parent SVG's user units (default 0)
  width: number
  height: number // stock box to scale; aspect comes from LABEL_STOCK
  radius?: number // die-cut corner radius, a stock property passed by the caller (default 0)
  title?: string // standalone use: role=img plus a title; omitted means aria-hidden
}

/** Placeholder stock width over height. The scenes derive label boxes from this. */
export const LABEL_STOCK = { aspect: 1.5 } as const

type LabelDesignSource = "placeholder" | "datum-label-studio"

export const LABEL_DESIGN: { source: LabelDesignSource; caption: string } = {
  source: "placeholder",
  get caption() {
    return this.source === "datum-label-studio"
      ? "Label layout from a Datum Label Studio export."
      : "Label layout is illustrative."
  },
}

// Fixed CONTROL style. The LabelData type has no way to change it.
const CONTROL_FACE = "#facc15"
const LAYOUT_FACE = "#fafafa"
const INK = "#000"
const HIGHLIGHT = "#00D26A"

const r2 = (v: number) => Math.round(v * 100) / 100

export function LabelFace({ label, x = 0, y = 0, width, height, radius = 0, title }: LabelFaceProps): JSX.Element {
  const f = faceLayout(label.datum, width, height)
  const t = f.target
  const control = label.kind === "control"
  const rr = Math.min(radius, f.band.h)
  const inset = f.border.inset + f.border.width / 2
  const a11y = title ? { role: "img" as const } : { "aria-hidden": true as const }

  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="hidden" {...a11y}>
      {title ? <title>{title}</title> : null}
      <rect width={width} height={height} rx={radius} fill={control ? CONTROL_FACE : LAYOUT_FACE} />
      {label.kind === "control" ? (
        <rect
          x={r2(inset)}
          y={r2(inset)}
          width={r2(width - inset * 2)}
          height={r2(height - inset * 2)}
          rx={r2(Math.max(0, radius - inset))}
          fill="none"
          stroke={INK}
          strokeWidth={r2(f.border.width)}
        />
      ) : (
        <path
          d={`M0 ${rr}A${rr} ${rr} 0 0 1 ${rr} 0H${width - rr}A${rr} ${rr} 0 0 1 ${width} ${rr}V${r2(f.band.h)}H0Z`}
          fill={label.department.colour}
        />
      )}
      {f.rows.map((row) => (
        <text
          key={row.key}
          x={r2(f.textX)}
          y={r2(row.y)}
          fontSize={r2(row.size)}
          fontWeight={row.bold ? 700 : 400}
          textAnchor={f.anchor}
          letterSpacing={0}
          fill={INK}
          className="font-mono"
        >
          {rowText(label, row.key)}
        </text>
      ))}
      {control ? null : (
        <circle
          cx={t.x}
          cy={t.y}
          r={r2(t.highlight)}
          fill="none"
          stroke={HIGHLIGHT}
          strokeWidth={r2(t.highlightStroke)}
        />
      )}
      <path
        d={`M${r2(t.x - t.arm)} ${t.y}H${r2(t.x + t.arm)}M${t.x} ${r2(t.y - t.arm)}V${r2(t.y + t.arm)}`}
        fill="none"
        stroke={INK}
        strokeWidth={r2(t.stroke)}
      />
      <circle cx={t.x} cy={t.y} r={r2(t.ring)} fill="none" stroke={INK} strokeWidth={r2(t.stroke)} />
      <circle data-part="datum-dot" cx={t.x} cy={t.y} r={r2(t.dot)} fill={INK} />
    </svg>
  )
}
