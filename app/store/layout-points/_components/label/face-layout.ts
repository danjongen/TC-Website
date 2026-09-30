// Pure placeholder layout maths for LabelFace, shared with the node test.
// Every length is a fraction of the stock height h (placeholder stock w = 1.5h).

import { datumFraction, datumPoint, type DatumPosition } from "./datum";
import type { LabelData } from "./label-face";

/** Space Mono advance per em, used by the overlap test. */
export const GLYPH_ADVANCE = 0.612;
/** Space Mono ascent per em, as getBBox reports it. */
export const GLYPH_ASCENT = 1.109;
/** Space Mono descent per em, as getBBox reports it. */
export const GLYPH_DESCENT = 0.355;

export type RowKey = "dept" | "id" | "e" | "n" | "z";

/** One printed row. x is the anchor, track is letter spacing in em. */
export type FaceRow = {
  key: RowKey;
  x: number;
  y: number;
  size: number;
  bold: boolean;
  track: number;
};

export type FaceChip = {
  size: number;
  gap: number;
  stroke: number;
  x: number;
  y: number;
};

export type FaceLayout = {
  anchor: "start" | "end";
  textX: number;
  chip: FaceChip | null;
  border: { inset: number; width: number };
  rows: FaceRow[];
  target: {
    x: number;
    y: number;
    arm: number;
    ring: number;
    highlight: number; // filled disc radius
    dot: number;
    stroke: number;
  };
};

const MARGIN = 0.08;
const ROWS: {
  key: RowKey;
  y: number;
  size: number;
  bold: boolean;
  track: number;
}[] = [
  { key: "dept", y: 0.17, size: 0.1, bold: false, track: 0.04 },
  { key: "id", y: 0.345, size: 0.145, bold: true, track: 0 },
  { key: "e", y: 0.64, size: 0.1, bold: false, track: 0.04 },
  { key: "n", y: 0.77, size: 0.1, bold: false, track: 0.04 },
  { key: "z", y: 0.9, size: 0.1, bold: false, track: 0.04 },
];

/** The target footprint half size: datum plus or minus this, in h. Equals the target arm. */
export const TARGET_FOOTPRINT = 0.09;

export function faceLayout(
  datum: DatumPosition,
  width: number,
  height: number,
  opts: { chip: boolean } = { chip: true },
): FaceLayout {
  const h = height;
  const f = datumFraction(datum);
  // Text keeps to the side away from the datum: end anchored when the datum is on the left.
  const anchor = f.x === 0 ? "end" : "start";
  const t = datumPoint(datum, { x: 0, y: 0, width, height });
  const textX = anchor === "end" ? width - MARGIN * h : MARGIN * h;
  // The chip square sits on the department row: top on the cap height, bottom on the baseline.
  const chip: FaceChip | null = opts.chip
    ? {
        size: 0.07 * h,
        gap: 0.03 * h,
        stroke: 0.006 * h,
        x: anchor === "end" ? width - 0.15 * h : 0.08 * h,
        y: 0.1 * h,
      }
    : null;
  const deptShift = chip ? (anchor === "end" ? -0.1 * h : 0.1 * h) : 0;
  return {
    anchor,
    textX,
    chip,
    // Out at 0.025h and 0.015h wide: the inner edge sits at 0.04h, half the 0.08h text margin, so the rows breathe.
    border: { inset: 0.025 * h, width: 0.015 * h },
    rows: ROWS.map((r) => ({
      key: r.key,
      x: r.key === "dept" ? textX + deptShift : textX,
      y: r.y * h,
      size: r.size * h,
      bold: r.bold,
      track: r.track,
    })),
    target: {
      x: t.x,
      y: t.y,
      arm: TARGET_FOOTPRINT * h,
      ring: 0.055 * h,
      highlight: 0.08 * h,
      dot: 0.014 * h,
      stroke: 0.009 * h,
    },
  };
}

/** The text a row prints. Coordinate strings are printed verbatim. */
export function rowText(label: LabelData, key: RowKey): string {
  switch (key) {
    case "dept":
      return label.kind === "control"
        ? "CONTROL"
        : label.department.name.toUpperCase();
    case "id":
      return label.id;
    case "e":
      return `E ${label.coords.e}`;
    case "n":
      return `N ${label.coords.n}`;
    case "z":
      return `Z ${label.coords.z}`;
  }
}

/**
 * The getBBox of a row: advance plus letter spacing per glyph, ascent over and descent
 * under the baseline. The department box includes the chip and its gap on the chip side.
 */
export function rowBox(layout: FaceLayout, row: FaceRow, text: string) {
  const w = text.length * (GLYPH_ADVANCE + row.track) * row.size;
  let x0 = layout.anchor === "end" ? row.x - w : row.x;
  let x1 = x0 + w;
  if (row.key === "dept" && layout.chip) {
    const extra = layout.chip.size + layout.chip.gap;
    if (layout.anchor === "end") x1 += extra;
    else x0 -= extra;
  }
  return {
    x0,
    x1,
    y0: row.y - GLYPH_ASCENT * row.size,
    y1: row.y + GLYPH_DESCENT * row.size,
  };
}
