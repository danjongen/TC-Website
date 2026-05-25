import type { Derived, Units, WallConfig } from "./types"
import { fmt } from "./derive"

/**
 * Display unit helpers. Conversions are display-only — every stored/derived
 * value stays metric (SI), so toggling never changes the underlying numbers.
 *
 * Hardware specs that the LED industry quotes in mm worldwide (pixel pitch,
 * tile size, service depth) are intentionally NOT switched — they read mm in
 * both modes.
 */

const KG_PER_LB = 0.45359237
const KGM2_TO_LBFT2 = 0.204816 // 1 kg/m² → lb/ft²

export function unitsOf(cfg: Pick<WallConfig, "units">): Units {
  return cfg.units === "imperial" ? "imperial" : "metric"
}

/** Mass: "1,234 kg" or "2,720 lb". */
export function fmtWeight(kg: number, u: Units): string {
  return u === "imperial" ? `${fmt.int(kg / KG_PER_LB)} lb` : `${fmt.num(kg, 0)} kg`
}

/** Areal density: "42 kg/m²" or "8.6 lb/ft²". */
export function fmtAreal(kgPerM2: number, u: Units): string {
  return u === "imperial"
    ? `${fmt.num(kgPerM2 * KGM2_TO_LBFT2, 1)} lb/ft²`
    : `${fmt.num(kgPerM2, 0)} kg/m²`
}

/** Per-area weight label, matching {@link fmtAreal}. */
export function arealLabel(u: Units): string {
  return u === "imperial" ? "WT / ft²" : "WT / m²"
}

/** Wall W×H in the selected system. `sep` lets the PDF use ASCII "x". */
export function fmtWallWH(d: Derived, u: Units, sep = "×"): string {
  return u === "imperial"
    ? `${d.wall_width_imperial} ${sep} ${d.wall_height_imperial}`
    : `${d.wall_width_m.toFixed(2)} ${sep} ${d.wall_height_m.toFixed(2)} m`
}

/** Wall W×H in the OTHER system — the hero sub-caption that shows the conversion. */
export function fmtWallWHAlt(d: Derived, u: Units, sep = "×"): string {
  return u === "imperial"
    ? `${d.wall_width_m.toFixed(2)} ${sep} ${d.wall_height_m.toFixed(2)} m`
    : `${d.wall_width_imperial} ${sep} ${d.wall_height_imperial}`
}

/** Optimal viewing distance in the selected system. */
export function fmtViewDist(d: Derived, u: Units): string {
  return u === "imperial"
    ? `${d.optimal_viewing_distance_ft} ft`
    : `${d.optimal_viewing_distance_m.toFixed(1)} m`
}
