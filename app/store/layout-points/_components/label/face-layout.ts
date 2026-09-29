// Pure placeholder layout maths for LabelFace, shared with the node test.
// Every length is a fraction of the stock height h (placeholder stock w = 1.5h).

import { datumFraction, datumPoint, type DatumPosition } from "./datum"
import type { LabelData } from "./label-face"

/** Space Mono advance per em, used by the overlap test. */
export const GLYPH_ADVANCE = 0.612
/** Space Mono cap height per em. */
export const CAP_HEIGHT = 0.7

export type RowKey = "dept" | "id" | "e" | "n" | "z"

export type FaceRow = { key: RowKey; y: number; size: number; bold: boolean }

export type FaceLayout = {
  anchor: "start" | "end"
  textX: number
  band: { h: number }
  border: { inset: number; width: number }
  rows: FaceRow[]
  target: {
    x: number
    y: number
    arm: number
    ring: number
    highlight: number
    highlightStroke: number
    dot: number
    stroke: number
  }
}

const MARGIN = 0.08
const ROWS: { key: RowKey; y: number; size: number; bold: boolean }[] = [
  { key: "dept", y: 0.22, size: 0.105, bold: true },
  { key: "id", y: 0.38, size: 0.18, bold: true },
  { key: "e", y: 0.64, size: 0.105, bold: false },
  { key: "n", y: 0.77, size: 0.105, bold: false },
  { key: "z", y: 0.9, size: 0.105, bold: false },
]

/** The target footprint half size: datum plus or minus this, in h. */
export const TARGET_FOOTPRINT = 0.11

export function faceLayout(datum: DatumPosition, width: number, height: number): FaceLayout {
  const h = height
  const f = datumFraction(datum)
  // Text keeps to the side away from the datum: end-anchored when the datum is on the left.
  const anchor = f.x === 0 ? "end" : "start"
  const t = datumPoint(datum, { x: 0, y: 0, width, height })
  return {
    anchor,
    textX: anchor === "end" ? width - MARGIN * h : MARGIN * h,
    band: { h: 0.1 * h },
    border: { inset: 0.025 * h, width: 0.035 * h },
    rows: ROWS.map((r) => ({ key: r.key, y: r.y * h, size: r.size * h, bold: r.bold })),
    target: {
      x: t.x,
      y: t.y,
      arm: TARGET_FOOTPRINT * h,
      ring: 0.07 * h,
      highlight: 0.095 * h,
      highlightStroke: 0.018 * h,
      dot: 0.022 * h,
      stroke: 0.02 * h,
    },
  }
}

/** The text a row prints. Coordinate strings are printed verbatim. */
export function rowText(label: LabelData, key: RowKey): string {
  switch (key) {
    case "dept":
      return label.kind === "control" ? "CONTROL" : label.department.name.toUpperCase()
    case "id":
      return label.id
    case "e":
      return `E ${label.coords.e}`
    case "n":
      return `N ${label.coords.n}`
    case "z":
      return `Z ${label.coords.z}`
  }
}

/** Glyph box of a row: advance times length wide, cap height tall, sitting on the baseline. */
export function rowBox(layout: FaceLayout, row: FaceRow, text: string) {
  const w = text.length * GLYPH_ADVANCE * row.size
  const x0 = layout.anchor === "end" ? layout.textX - w : layout.textX
  return { x0, x1: x0 + w, y0: row.y - CAP_HEIGHT * row.size, y1: row.y }
}
