import type { Cabinet, Derived, WallConfig, PowerService } from "./types"

const MM_PER_INCH = 25.4
const KG_PER_LB = 0.45359237
const W_TO_BTU_HR = 3.412

function mmToImperialFtIn(mm: number): string {
  const totalIn = mm / MM_PER_INCH
  const ft = Math.floor(totalIn / 12)
  const inches = Math.round(totalIn - ft * 12)
  if (inches === 12) return `${ft + 1}'`
  return inches === 0 ? `${ft}'` : `${ft}'${inches}"`
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function aspectRatio(w: number, h: number): string {
  if (!w || !h) return "0:0"
  const d = gcd(w, h)
  const aw = w / d
  const ah = h / d
  // Show clean integer ratio when small; otherwise show decimal
  if (aw <= 64 && ah <= 64) return `${aw}:${ah}`
  return `${(w / h).toFixed(2)}:1`
}

function voltsForService(s: PowerService): number {
  if (s === "208V-3PH") return 208
  if (s === "400V-3PH") return 400
  return 480
}

const SQRT3 = Math.sqrt(3)

// Brompton SX40 capacity = ~4,608,000 px / unit at 60 Hz, 8 bit.
// Use a conservative real-world budget per output to size processor count.
const PROCESSOR_CAPACITY_PX = 4_600_000

export function derive(cab: Cabinet, cfg: WallConfig): Derived {
  const tiles_total = Math.max(0, cfg.tiles_wide * cfg.tiles_high)
  const pixels_wide = cfg.tiles_wide * cab.tile_width_px
  const pixels_high = cfg.tiles_high * cab.tile_height_px
  const pixels_total = pixels_wide * pixels_high

  const wall_width_mm = cfg.tiles_wide * cab.tile_width_mm
  const wall_height_mm = cfg.tiles_high * cab.tile_height_mm
  const wall_width_m = wall_width_mm / 1000
  const wall_height_m = wall_height_mm / 1000

  const total_weight_kg = tiles_total * cab.tile_weight_kg
  const total_weight_lb = total_weight_kg / KG_PER_LB
  const weight_per_row_kg = cfg.tiles_wide * cab.tile_weight_kg
  const area_m2 = wall_width_m * wall_height_m
  const weight_per_m2_kg = area_m2 > 0 ? total_weight_kg / area_m2 : 0

  const max_power_kw = (tiles_total * cab.max_power_w) / 1000
  const avg_power_kw = (tiles_total * cab.avg_power_w) / 1000

  const pf = cab.power_factor || 1
  const max_apparent_kva = max_power_kw / pf

  const v = voltsForService(cfg.power_service)
  // Balanced 3-phase amps: I = (kVA * 1000) / (V_LL * sqrt(3))
  const amps_max_per_phase = (max_apparent_kva * 1000) / (v * SQRT3)
  const amps_avg_per_phase = (avg_power_kw / pf * 1000) / (v * SQRT3)

  const btu_per_hour = max_power_kw * 1000 * W_TO_BTU_HR

  // Rule of thumb: pitch in mm ≈ optimal viewing distance in m
  const optimal_viewing_distance_m = cab.pixel_pitch_mm
  const optimal_viewing_distance_ft = (optimal_viewing_distance_m * 3.28084).toFixed(1)

  const processor_count_required = Math.max(
    1,
    Math.ceil(pixels_total / PROCESSOR_CAPACITY_PX)
  )

  const processor_label =
    cfg.processor_override?.trim() ||
    (cab.processor_compatibility[0] ?? "Brompton SX40")

  return {
    tiles_total,
    pixels_wide,
    pixels_high,
    pixels_total,
    wall_width_mm,
    wall_height_mm,
    wall_width_m,
    wall_height_m,
    wall_width_imperial: mmToImperialFtIn(wall_width_mm),
    wall_height_imperial: mmToImperialFtIn(wall_height_mm),
    aspect_ratio: aspectRatio(pixels_wide, pixels_high),
    total_weight_kg,
    total_weight_lb,
    weight_per_row_kg,
    weight_per_m2_kg,
    max_power_kw,
    avg_power_kw,
    max_apparent_kva,
    amps_max_per_phase,
    amps_avg_per_phase,
    btu_per_hour,
    optimal_viewing_distance_m,
    optimal_viewing_distance_ft,
    processor_count_required,
    processor_label,
  }
}

export const fmt = {
  int: (n: number) => Math.round(n).toLocaleString("en-US"),
  num: (n: number, d = 1) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    }),
  pad: (n: number, w = 3) => String(Math.max(0, Math.floor(n))).padStart(w, "0"),
}
