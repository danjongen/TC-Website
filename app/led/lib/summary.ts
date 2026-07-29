import type { Cabinet, Derived, WallConfig } from "./types"
import { fmt } from "./derive"
import { fmtViewDist, fmtWallWH, fmtWeight, unitsOf } from "./units"

export function buildSummary(
  cab: Cabinet,
  cfg: WallConfig,
  d: Derived,
  shareUrl: string
): string {
  const u = unitsOf(cfg)
  const lines: string[] = []
  lines.push(`${cfg.project_code || "-"} / ${cfg.project_name || "-"}`)
  lines.push("")
  const pad = (k: string) => k.padEnd(11, " ")
  lines.push(`${pad("CABINET")} ${cab.manufacturer} ${cab.model} / ${cab.pixel_pitch_mm.toFixed(2)}mm`)
  lines.push(
    `${pad("WALL")} ${cfg.tiles_wide}W × ${cfg.tiles_high}H / ${fmt.int(d.tiles_total)} tiles`
  )
  lines.push(
    `${pad("RESOLUTION")} ${fmt.int(d.pixels_wide)} × ${fmt.int(d.pixels_high)} / ${fmt.int(d.pixels_total)} px`
  )
  lines.push(
    `${pad("DIMENSIONS")} ${fmtWallWH(d, u)}`
  )
  lines.push(
    `${pad("WEIGHT")} ${fmtWeight(d.total_weight_kg, u)}`
  )
  lines.push(
    `${pad("POWER")} ${fmt.num(d.amps_max_per_phase, 0)}A max / ${fmt.num(d.amps_avg_per_phase, 0)}A avg / ${cfg.power_service}`
  )
  lines.push(
    `${pad("PROCESSORS")} ${d.processor_count_required} × ${d.processor_label} minimum`
  )
  lines.push(
    `${pad("VIEW DIST")} ${fmtViewDist(d, u)} optimal`
  )
  lines.push("")
  lines.push(
    "Power = total connected load. Add continuous-load headroom + local code (NEC 125% in NA) and confirm final circuit / breaker sizing with the power vendor."
  )
  lines.push("")
  lines.push(`Full spec / ${shareUrl}`)
  return lines.join("\n")
}
