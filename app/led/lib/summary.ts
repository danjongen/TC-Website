import type { Cabinet, Derived, WallConfig } from "./types"
import { fmt } from "./derive"

export function buildSummary(
  cab: Cabinet,
  cfg: WallConfig,
  d: Derived,
  shareUrl: string
): string {
  const lines: string[] = []
  lines.push(`${cfg.project_code || "—"} / ${cfg.project_name || "—"}`)
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
    `${pad("DIMENSIONS")} ${d.wall_width_m.toFixed(2)} × ${d.wall_height_m.toFixed(2)} m / ${d.wall_width_imperial} × ${d.wall_height_imperial}`
  )
  lines.push(
    `${pad("WEIGHT")} ${fmt.num(d.total_weight_kg, 0)} kg / ${fmt.int(d.total_weight_lb)} lb`
  )
  lines.push(
    `${pad("POWER")} ${fmt.num(d.amps_max_per_phase, 0)}A max / ${fmt.num(d.amps_avg_per_phase, 0)}A avg / ${cfg.power_service}`
  )
  lines.push(
    `${pad("PROCESSORS")} ${d.processor_count_required} × ${d.processor_label} minimum`
  )
  lines.push(
    `${pad("VIEW DIST")} ${d.optimal_viewing_distance_m.toFixed(1)} m optimal`
  )
  lines.push("")
  lines.push(`Full spec / ${shareUrl}`)
  return lines.join("\n")
}
