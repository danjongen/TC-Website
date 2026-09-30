// The Datum Label Studio carrier face, redrawn from the owner's design board (7a,
// AXIS-01 interior inside the datum frame carrier). Square stock; the department colour
// frame, or hazard stripes for CONTROL; a white card; the exact point ring at the top centre.
// Sample data only: the caller passes sanitised IDs and coordinates.
//
// Server-safe: no client directive, no hooks, no ids, no animation. It renders one
// nested svg whose own viewport clips the ring and stripes at the cut edge, so it is
// valid inside any parent SVG. The caller owns the blank stock, clips, motion and shadows.

import type { JSX } from "react"

import { datumPoint } from "./datum"
import { ALERT_BAR, AXIS, FRAME, HAZARD, RING, RULES, TEXT_X0, TEXT_X1, faceTexts, type FaceText } from "./face-layout"

export type PointCoords = { e: string; n: string; z: string } // metres as exported; the face formats both unit columns

type Common = {
  id: string
  project: string
  seq: [number, number] // print sequence, n of total
  coords: PointCoords
  datum: "tc" // the carrier design puts the exact point at the top centre
  src: string
  rev: string
}

export type LabelData =
  | (Common & {
      kind: "layout"
      department: { code: string; name: string; colour: string }
      note: string
    })
  | (Common & { kind: "control" }) // no department or colour: CONTROL cannot be restyled

export type LabelFaceProps = {
  label: LabelData
  x?: number
  y?: number // top-left of the stock in the parent SVG's user units (default 0)
  width: number
  height: number // square stock; the face scales to the smaller side
  radius?: number // die-cut corner radius, a stock property passed by the caller (default 0)
  title?: string // standalone use: role=img plus a title; omitted means aria-hidden
  bare?: boolean // graphics only, for renderers that set the type themselves (the share image)
}

/** Stock width over height. The scenes derive label boxes from this. */
export const LABEL_STOCK = { aspect: 1 } as const

type LabelDesignSource = "placeholder" | "datum-label-studio"

export const LABEL_DESIGN: { source: LabelDesignSource; caption: string } = {
  source: "datum-label-studio",
  get caption() {
    return this.source === "datum-label-studio"
      ? "Label design from Datum Label Studio, shown with sample data."
      : "Label layout is illustrative."
  },
}

export const FAMILY_NAME = { cond: "Barlow Condensed", mono: "IBM Plex Mono" } as const

export const FACE = {
  card: "#FFFFFF",
  ink: "#111111",
  meta: "#8B8882",
  hazard: "#F2C301",
  dot: "#3B3732",
  halo: "#C9C5BF",
} as const

const FAMILY = {
  cond: `var(--font-lp-cond, '${FAMILY_NAME.cond}'), 'Arial Narrow', sans-serif`,
  mono: `var(--font-lp-mono, '${FAMILY_NAME.mono}'), ui-monospace, monospace`,
} as const

const r2 = (v: number) => Math.round(v * 100) / 100

/** Backslash hazard bands across an S square, one path. */
function hazardPath(S: number): string {
  const p = HAZARD.period * S
  const out: string[] = []
  for (let c = HAZARD.phase * S - S - p; c < S; c += p) {
    out.push(`M${r2(c)} 0H${r2(c + p / 2)}L${r2(c + p / 2 + S)} ${r2(S)}H${r2(c + S)}Z`)
  }
  return out.join("")
}

export function LabelFace({ label, x = 0, y = 0, width, height, radius = 0, title, bare = false }: LabelFaceProps): JSX.Element {
  const control = label.kind === "control"
  const S = Math.min(width, height)
  const u = (v: number) => r2(v * S)
  const d = datumPoint(label.datum, { x: 0, y: 0, width: S, height: S })
  const ro = RING.outer * S
  const ri = RING.inner * S
  const f = FRAME * S
  const a11y = title ? { role: "img" as const } : { "aria-hidden": true as const }
  const tone = (t: FaceText["tone"]) =>
    t === "meta" ? FACE.meta : t === "alert" ? FACE.hazard : t === "dept" && !control ? label.department.colour : FACE.ink

  // Card with the ring notch cut up through the frame to the top edge.
  const card = `M${r2(f)} ${r2(f)}H${r2(d.x - ro)}V0H${r2(d.x + ro)}V${r2(f)}H${r2(S - f)}V${r2(S - f)}H${r2(f)}Z`
  const band = AXIS.band * S
  const mid = S / 2
  const bands = `M0 ${r2(mid - band / 2)}H${r2(f)}V${r2(mid + band / 2)}H0ZM${r2(S - f)} ${r2(mid - band / 2)}H${r2(S)}V${r2(mid + band / 2)}H${r2(S - f)}ZM${r2(mid - band / 2)} ${r2(S - f)}H${r2(mid + band / 2)}V${r2(S)}H${r2(mid - band / 2)}Z`
  const axisLines = `M0 ${r2(mid)}H${r2(f)}M${r2(S - f)} ${r2(mid)}H${r2(S)}M${r2(mid)} ${r2(S - f)}V${r2(S)}`
  const at = (r: number, deg: number) => {
    const a = (deg * Math.PI) / 180
    return `${r2(d.x + r * Math.cos(a))} ${r2(d.y + r * Math.sin(a))}`
  }
  const annulus = `M${r2(d.x - ro)} ${r2(d.y)}A${r2(ro)} ${r2(ro)} 0 1 0 ${r2(d.x + ro)} ${r2(d.y)}A${r2(ro)} ${r2(ro)} 0 1 0 ${r2(d.x - ro)} ${r2(d.y)}ZM${r2(d.x - ri)} ${r2(d.y)}A${r2(ri)} ${r2(ri)} 0 1 0 ${r2(d.x + ri)} ${r2(d.y)}A${r2(ri)} ${r2(ri)} 0 1 0 ${r2(d.x - ri)} ${r2(d.y)}Z`
  const sector = `M${at(ro, 45)}A${r2(ro)} ${r2(ro)} 0 0 1 ${at(ro, 135)}L${at(ri, 135)}A${r2(ri)} ${r2(ri)} 0 0 0 ${at(ri, 45)}Z`
  const hair = u(RULES.width)
  // CONTROL has no top rule: the alert bar takes its place.
  const rules = `${control ? "" : `M${u(TEXT_X0)} ${u(RULES.top)}H${u(TEXT_X1)}`}M${u(TEXT_X0)} ${u(RULES.bottom)}H${u(TEXT_X1)}`

  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`0 0 ${S} ${S}`} overflow="hidden" {...a11y}>
      {title ? <title>{title}</title> : null}
      <rect width={S} height={S} rx={radius} fill={control ? FACE.hazard : label.department.colour} />
      {control ? <path d={hazardPath(S)} fill={FACE.ink} /> : null}
      <path d={bands} fill={FACE.card} />
      <path d={axisLines} fill="none" stroke={FACE.ink} strokeWidth={u(AXIS.line)} />
      <path d={card} fill={FACE.card} />
      <path d={annulus} fill={FACE.ink} fillRule="evenodd" />
      <path d={sector} fill={control ? FACE.hazard : FACE.card} stroke={FACE.ink} strokeWidth={hair} />
      <path
        d={`M${r2(d.x)} ${r2(d.y + 0.071 * S)}V${r2(d.y + ro)}`}
        stroke={FACE.ink}
        strokeWidth={u(0.0045)}
      />
      <circle
        data-part="datum-dot"
        cx={r2(d.x)}
        cy={r2(d.y)}
        r={u(0.012)}
        fill={FACE.dot}
        stroke={FACE.halo}
        strokeWidth={u(0.006)}
      />
      {control && !bare ? (
        <rect
          x={u(TEXT_X0)}
          y={u(ALERT_BAR.y0)}
          width={u(TEXT_X1 - TEXT_X0)}
          height={u(ALERT_BAR.y1 - ALERT_BAR.y0)}
          fill={FACE.ink}
        />
      ) : null}
      <path d={rules} fill="none" stroke={FACE.ink} strokeWidth={hair} />
      {(bare ? [] : faceTexts(label)).map((t) => (
        <text
          key={t.key}
          x={u(t.x)}
          y={u(t.y)}
          fontSize={u(t.size)}
          fontWeight={t.weight}
          style={{ fontFamily: FAMILY[t.family] }}
          textAnchor={t.anchor}
          letterSpacing={t.track ? `${t.track}em` : undefined}
          fill={tone(t.tone)}
        >
          {t.text}
        </text>
      ))}
    </svg>
  )
}
