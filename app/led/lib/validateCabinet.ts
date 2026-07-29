import type { Cabinet } from "./types"

/**
 * Deterministic physics / consistency validation - the third gate of
 * "triple validation". No model involved: a cabinet's stated numbers
 * must satisfy these or it cannot be trusted (let alone published).
 *
 * `error` = internally inconsistent / impossible; must not publish.
 * `warn`  = outside the usual touring range; review before trusting.
 */

export type ValidationIssue = {
  field: string
  level: "error" | "warn"
  message: string
}

export type ValidationResult = {
  ok: boolean // no errors (warnings allowed)
  errors: ValidationIssue[]
  warnings: ValidationIssue[]
}

const IP_RE = /^IP\d{2}$/
const SCAN_RE = /^\d+\/\d+$/
const VALID_BIT_DEPTHS = [8, 10, 12, 14, 16]

export function validateCabinet(c: Partial<Cabinet>): ValidationResult {
  const issues: ValidationIssue[] = []
  const err = (field: string, message: string) =>
    issues.push({ field, level: "error", message })
  const warn = (field: string, message: string) =>
    issues.push({ field, level: "warn", message })

  const num = (v: unknown): number | null =>
    typeof v === "number" && Number.isFinite(v) ? v : null

  const pitch = num(c.pixel_pitch_mm)
  const tw = num(c.tile_width_mm)
  const th = num(c.tile_height_mm)
  const twpx = num(c.tile_width_px)
  const thpx = num(c.tile_height_px)
  const weight = num(c.tile_weight_kg)
  const maxW = num(c.max_power_w)
  const avgW = num(c.avg_power_w)
  const pf = num(c.power_factor)

  // --- presence + positivity ---
  if (pitch === null || pitch <= 0) err("pixel_pitch_mm", "Pitch must be greater than zero.")
  if (tw === null || tw <= 0) err("tile_width_mm", "Tile width must be greater than zero.")
  if (th === null || th <= 0) err("tile_height_mm", "Tile height must be greater than zero.")
  if (twpx === null || twpx <= 0) err("tile_width_px", "Tile width px must be greater than zero.")
  if (thpx === null || thpx <= 0) err("tile_height_px", "Tile height px must be greater than zero.")
  if (weight === null || weight <= 0) err("tile_weight_kg", "Tile weight must be greater than zero.")
  if (maxW === null || maxW <= 0) err("max_power_w", "Max power must be greater than zero.")

  // --- pixel pitch vs physical size vs px count ---
  // Real panels have inactive borders, so px is usually a touch under
  // mm/pitch. Warn beyond 3%, error beyond 12% (likely a wrong number).
  if (pitch && tw && twpx) checkPxConsistency("tile_width_px", tw, pitch, twpx, warn, err)
  if (pitch && th && thpx) checkPxConsistency("tile_height_px", th, pitch, thpx, warn, err)

  // --- power sanity ---
  if (maxW !== null && avgW !== null && avgW > maxW) {
    err("avg_power_w", "Average power cannot exceed max power.")
  }
  if (pf !== null && (pf <= 0 || pf > 1)) {
    err("power_factor", "Power factor must be between 0 and 1.")
  }
  // Power density (W/m²) - touring LED runs roughly 150–1200 W/m² max.
  if (maxW && tw && th) {
    const areaM2 = (tw / 1000) * (th / 1000)
    if (areaM2 > 0) {
      const wPerM2 = maxW / areaM2
      if (wPerM2 < 100 || wPerM2 > 1500) {
        warn("max_power_w", `Power density ${Math.round(wPerM2)} W/m² is outside the usual 100–1500 range.`)
      }
    }
  }

  // --- weight density (kg/m²) - touring panels ~15–60 kg/m² ---
  if (weight && tw && th) {
    const areaM2 = (tw / 1000) * (th / 1000)
    if (areaM2 > 0) {
      const kgPerM2 = weight / areaM2
      if (kgPerM2 < 8 || kgPerM2 > 80) {
        warn("tile_weight_kg", `Weight density ${Math.round(kgPerM2)} kg/m² is outside the usual 15–60 range.`)
      }
    }
  }

  // --- optical / signal format checks ---
  const brightness = num(c.brightness_nits)
  if (brightness !== null && brightness <= 0) warn("brightness_nits", "Brightness should be greater than zero.")
  const refresh = num(c.refresh_hz)
  if (refresh !== null && refresh < 960) warn("refresh_hz", "Refresh below 960 Hz is unusual for broadcast/touring.")
  if (c.bit_depth !== undefined && !VALID_BIT_DEPTHS.includes(Number(c.bit_depth))) {
    warn("bit_depth", "Bit depth is usually 8, 10, 12, 14, or 16.")
  }
  if (c.ip_rating_front && !IP_RE.test(c.ip_rating_front)) warn("ip_rating_front", "IP rating should look like IP65.")
  if (c.ip_rating_rear && !IP_RE.test(c.ip_rating_rear)) warn("ip_rating_rear", "IP rating should look like IP54.")
  if (c.scan_ratio && !SCAN_RE.test(c.scan_ratio)) warn("scan_ratio", "Scan ratio should look like 1/13.")
  const daisy = num(c.daisy_chain_limit)
  if (daisy !== null && daisy <= 0) warn("daisy_chain_limit", "Daisy-chain limit should be greater than zero.")

  // --- required metadata for trust ---
  if (!c.manufacturer) err("manufacturer", "Manufacturer is required.")
  if (!c.model) err("model", "Model is required.")
  if (!c.id) err("id", "Stable id is required.")

  return {
    ok: !issues.some((i) => i.level === "error"),
    errors: issues.filter((i) => i.level === "error"),
    warnings: issues.filter((i) => i.level === "warn"),
  }
}

function checkPxConsistency(
  field: string,
  mm: number,
  pitch: number,
  px: number,
  warn: (f: string, m: string) => void,
  err: (f: string, m: string) => void
) {
  const expected = mm / pitch
  const deltaPct = Math.abs(px - expected) / expected
  // Marketed ("nominal") pitch can differ from actual by ~10% (e.g. ROE
  // V8T is sold as 8.0mm but resolves at ~8.93mm), so only hard-fail
  // beyond 15% and flag for review beyond 5%.
  if (deltaPct > 0.15) {
    err(
      field,
      `Inconsistent: ${px} px vs ~${expected.toFixed(0)} expected (${mm}mm ÷ ${pitch}mm). Off by ${(deltaPct * 100).toFixed(0)}%.`
    )
  } else if (deltaPct > 0.05) {
    warn(
      field,
      `${px} px vs ~${expected.toFixed(0)} expected from ${mm}mm ÷ ${pitch}mm (${(deltaPct * 100).toFixed(0)}% off).`
    )
  }
}
