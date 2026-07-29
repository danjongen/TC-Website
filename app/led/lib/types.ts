export type ServiceAccess = "front" | "rear" | "both"

export type Cabinet = {
  id: string
  manufacturer: string
  model: string
  pixel_pitch_mm: number
  tile_width_mm: number
  tile_height_mm: number
  tile_width_px: number
  tile_height_px: number
  tile_weight_kg: number
  max_power_w: number
  avg_power_w: number
  brightness_nits: number
  refresh_hz: number
  bit_depth: number
  color_space: string
  scan_ratio: string
  viewing_angle_h: number
  viewing_angle_v: number
  ip_rating_front: string
  ip_rating_rear: string
  service_access: ServiceAccess
  service_depth_mm: number
  touring_rated: boolean
  curvature_concave_deg: number
  curvature_convex_deg: number
  processor_compatibility: string[]
  daisy_chain_limit: number
  power_factor: number
  notes?: string
}

export type PowerService = "208V-3PH" | "400V-3PH" | "480V-3PH"
export type SignalEntry = "TL" | "TR" | "BL" | "BR"
export type AudiencePosition = "bottom" | "top" | "left" | "right"
export type Shape = "rectangle"
export type AllowancePreset = "standard" | "conservative" | "custom"
export type Units = "metric" | "imperial"

export type WallConfig = {
  project_code: string
  project_name: string
  client: string
  tour?: string
  show_date?: string
  lead: string
  issued_date: string
  rev: string

  cabinet_id: string
  tiles_wide: number
  tiles_high: number
  shape: Shape
  power_service: PowerService
  signal_entry: SignalEntry
  audience_position: AudiencePosition

  // Installed weight allowances (all optional - old share links default).
  // Percentages of base wall weight.
  allowance_preset?: AllowancePreset
  cabling_pct?: number
  rigging_pct?: number
  top_rigging_pct?: number
  wind_bracing?: boolean
  wind_bracing_pct?: number

  processor_override?: string
  notes?: string

  // Display unit system (optional - old share links default to metric).
  units?: Units
}

export type Derived = {
  tiles_total: number
  pixels_wide: number
  pixels_high: number
  pixels_total: number
  wall_width_mm: number
  wall_height_mm: number
  wall_width_m: number
  wall_height_m: number
  wall_width_imperial: string
  wall_height_imperial: string
  aspect_ratio: string
  total_weight_kg: number
  total_weight_lb: number
  weight_per_row_kg: number
  weight_per_m2_kg: number

  // Installed weight allowances
  cabling_weight_kg: number
  rigging_weight_kg: number
  top_rigging_weight_kg: number
  wind_bracing_weight_kg: number
  installed_weight_kg: number
  installed_weight_lb: number
  total_allowance_pct: number
  max_power_kw: number
  avg_power_kw: number
  max_apparent_kva: number
  amps_max_per_phase: number
  amps_avg_per_phase: number
  btu_per_hour: number
  optimal_viewing_distance_m: number
  optimal_viewing_distance_ft: string
  processor_count_required: number
  processor_label: string
}
