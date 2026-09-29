// Single source for the nine exact datum positions on a label.
// Pure TS with no JSX, so node tests can import it.

export const DATUM_POSITIONS = [
  { id: "tl", label: "Top left corner", x: 0, y: 0 },
  { id: "tc", label: "Top edge", x: 0.5, y: 0 },
  { id: "tr", label: "Top right corner", x: 1, y: 0 },
  { id: "ml", label: "Left edge", x: 0, y: 0.5 },
  { id: "c", label: "Centre", x: 0.5, y: 0.5 },
  { id: "mr", label: "Right edge", x: 1, y: 0.5 },
  { id: "bl", label: "Bottom left corner", x: 0, y: 1 },
  { id: "bc", label: "Bottom edge", x: 0.5, y: 1 },
  { id: "br", label: "Bottom right corner", x: 1, y: 1 },
] as const

export type DatumPosition = (typeof DATUM_POSITIONS)[number]["id"]

export type Box = { x: number; y: number; width: number; height: number }

/** The datum position as a fraction of the stock box. */
export function datumFraction(d: DatumPosition): { x: number; y: number } {
  const p = DATUM_POSITIONS.find((q) => q.id === d) ?? DATUM_POSITIONS[4]
  return { x: p.x, y: p.y }
}

/** Where the datum falls on a stock box, in the box's own units. */
export function datumPoint(d: DatumPosition, box: Box): { x: number; y: number } {
  const f = datumFraction(d)
  return { x: box.x + f.x * box.width, y: box.y + f.y * box.height }
}
