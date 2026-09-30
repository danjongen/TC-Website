// PLACEHOLDER FACE. Drawn from known facts only: department name and colour chip,
// point ID, E/N/Z coordinates, highlighted exact datum target, fixed CONTROL style.
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
const CONTROL_FACE = "#FACC15"
const CONTROL_INK = "#000"
// Layout stock: the Power Symbols cream paper, near black ink, a warm grey for meta text.
const LAYOUT_FACE = "#F3F0E8"
const INK = "#0B0B0B"
const META = "#6B675E"
const HIGHLIGHT = "#00D26A"

const r2 = (v: number) => Math.round(v * 100) / 100

export function LabelFace({ label, x = 0, y = 0, width, height, radius = 0, title }: LabelFaceProps): JSX.Element {
  const control = label.kind === "control"
  const f = faceLayout(label.datum, width, height, { chip: !control })
  const t = f.target
  const ink = control ? CONTROL_INK : INK
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
          stroke={CONTROL_INK}
          strokeWidth={r2(f.border.width)}
        />
      ) : f.chip ? (
        <rect
          x={r2(f.chip.x)}
          y={r2(f.chip.y)}
          width={r2(f.chip.size)}
          height={r2(f.chip.size)}
          fill={label.department.colour}
          stroke={INK}
          strokeWidth={r2(f.chip.stroke)}
        />
      ) : null}
      {f.rows.map((row) => {
        const text = rowText(label, row.key)
        const axis = !control && (row.key === "e" || row.key === "n" || row.key === "z")
        const cut = text.indexOf(" ")
        return (
          <text
            key={row.key}
            x={r2(row.x)}
            y={r2(row.y)}
            fontSize={r2(row.size)}
            fontWeight={row.bold ? 700 : 400}
            textAnchor={f.anchor}
            letterSpacing={row.track ? `${row.track}em` : 0}
            fill={row.key === "dept" && !control ? META : ink}
            className="font-mono"
          >
            {axis ? (
              <>
                <tspan fill={META}>{text.slice(0, cut)}</tspan>
                {text.slice(cut)}
              </>
            ) : (
              text
            )}
          </text>
        )
      })}
      {control ? null : <circle cx={t.x} cy={t.y} r={r2(t.highlight)} fill={HIGHLIGHT} />}
      <path
        d={`M${r2(t.x - t.arm)} ${t.y}H${r2(t.x + t.arm)}M${t.x} ${r2(t.y - t.arm)}V${r2(t.y + t.arm)}`}
        fill="none"
        stroke={ink}
        strokeWidth={r2(t.stroke)}
      />
      <circle cx={t.x} cy={t.y} r={r2(t.ring)} fill="none" stroke={ink} strokeWidth={r2(t.stroke)} />
      <circle data-part="datum-dot" cx={t.x} cy={t.y} r={r2(t.dot)} fill={ink} />
    </svg>
  )
}
