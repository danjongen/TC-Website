import type { Cabinet, Derived, WallConfig } from "../lib/types"
import { fmt } from "../lib/derive"
import { DISCLAIMER } from "../lib/brand"
import { Glyph } from "./Glyph"
import { FlashValue } from "./FlashValue"

/**
 * On-screen preview of the spec sheet (Section /05 Artifact A).
 * Header strip, identity block, hero summary strip, then four
 * banded readout groups: A/OPTICAL, B/POWER, C/PHYSICAL, D/SIGNAL.
 */
export function SpecSheet({
  cab,
  cfg,
  d,
}: {
  cab: Cabinet
  cfg: WallConfig
  d: Derived
}) {
  return (
    <article className="panel" id="spec-sheet">
      {/* HEADER STRIP */}
      <div className="flex items-center justify-between px-5 py-3 border-b hairline">
        <div className="flex items-center gap-2.5">
          <Glyph size={14} />
          <span className="mono text-[10px] tracking-[0.08em] uppercase">
            TECHNICALLY CREATIVE / DETROIT
          </span>
        </div>
        <div className="mono text-[10px] tracking-[0.08em] uppercase text-[var(--led-ink-dim)] flex gap-4">
          <span>SPEC SHEET</span>
          <span>{cfg.project_code || "—"}</span>
          <span>REV {cfg.rev || "—"}</span>
          <span>{cfg.issued_date || "—"}</span>
        </div>
      </div>

      {/* IDENTITY BLOCK */}
      <div className="px-5 py-4 border-b hairline grid grid-cols-2 md:grid-cols-4 gap-4">
        <KV label="PROJECT" value={cfg.project_name || "—"} wide />
        <KV label="CLIENT" value={cfg.client || "—"} />
        <KV label="TOUR" value={cfg.tour || "—"} />
        <KV label="SHOW DATE" value={cfg.show_date || "—"} />
        <KV label="LEAD" value={cfg.lead || "—"} />
        <KV label="CABINET" value={`${cab.manufacturer} ${cab.model}`} wide />
        <KV label="PITCH" value={`${cab.pixel_pitch_mm.toFixed(2)} mm`} />
      </div>

      {/* HERO SUMMARY STRIP — values white, not accent */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b hairline">
        <Hero label="TILES" big={`${cfg.tiles_wide}×${cfg.tiles_high}`} sub={`${fmt.int(d.tiles_total)} TOTAL`} />
        <Hero label="PIXELS" big={`${fmt.int(d.pixels_wide)}×${fmt.int(d.pixels_high)}`} sub={`${fmt.int(d.pixels_total)} TOTAL`} />
        <Hero label="WALL" big={`${d.wall_width_m.toFixed(2)}×${d.wall_height_m.toFixed(2)} m`} sub={`${d.wall_width_imperial} × ${d.wall_height_imperial}`} />
        <Hero label="POWER" big={`${fmt.num(d.amps_max_per_phase, 0)} A`} sub={`MAX / ${fmt.num(d.amps_avg_per_phase, 0)} A AVG / ${cfg.power_service}`} />
      </div>

      {/* A / OPTICAL */}
      <Band code="A" name="OPTICAL">
        <KV label="ASPECT" value={d.aspect_ratio} />
        <KV label="VIEW DIST" value={`${d.optimal_viewing_distance_m.toFixed(1)} m / ${d.optimal_viewing_distance_ft} ft`} />
        <KV label="BRIGHTNESS" value={`${fmt.int(cab.brightness_nits)} nits`} />
        <KV label="REFRESH" value={`${fmt.int(cab.refresh_hz)} Hz`} />
        <KV label="BIT DEPTH" value={`${cab.bit_depth}-bit`} />
        <KV label="COLOR SPACE" value={cab.color_space} />
        <KV label="SCAN" value={cab.scan_ratio} />
        <KV label="VIEW ANGLE" value={`${cab.viewing_angle_h}°H / ${cab.viewing_angle_v}°V`} />
      </Band>

      {/* B / POWER */}
      <Band code="B" name="POWER">
        <KV label="MAX POWER" value={`${fmt.num(d.max_power_kw, 1)} kW`} />
        <KV label="AVG POWER" value={`${fmt.num(d.avg_power_kw, 1)} kW`} />
        <KV label="APPARENT" value={`${fmt.num(d.max_apparent_kva, 1)} kVA`} />
        <KV label="HEAT LOAD" value={`${fmt.int(d.btu_per_hour)} BTU/hr`} />
      </Band>

      {/* C / PHYSICAL */}
      <Band code="C" name="PHYSICAL">
        <KV label="BASE WT" value={`${fmt.num(d.total_weight_kg, 0)} kg / ${fmt.int(d.total_weight_lb)} lb`} wide />
        <KV label="WT / ROW" value={`${fmt.num(d.weight_per_row_kg, 0)} kg`} />
        <KV label="WT / m²" value={`${fmt.num(d.weight_per_m2_kg, 0)} kg`} />
        <KV label={`INSTALLED WT / +${fmt.num(d.total_allowance_pct, 0)}%`} value={`${fmt.num(d.installed_weight_kg, 0)} kg / ${fmt.int(d.installed_weight_lb)} lb`} wide />
      </Band>

      {/* D / SIGNAL */}
      <Band code="D" name="SIGNAL">
        <KV label="PROCESSOR" value={`${d.processor_count_required} × ${d.processor_label}`} wide />
        <KV label="DAISY CHAIN" value={`${cab.daisy_chain_limit} cabs / line`} />
        <KV label="SIGNAL ENTRY" value={signalEntryLabel(cfg.signal_entry)} />
        <KV label="AUDIENCE" value={cfg.audience_position.toUpperCase()} />
        <KV label="IP / FRONT" value={cab.ip_rating_front} />
        <KV label="IP / REAR" value={cab.ip_rating_rear} />
        <KV label="SERVICE" value={`${cab.service_access.toUpperCase()} / ${cab.service_depth_mm}mm`} />
        <KV label="SPARES" value={`${Math.max(1, Math.ceil(d.tiles_total * 0.05))} cabs / 5%`} />
      </Band>

      {cfg.notes ? (
        <div className="px-5 py-3 border-t hairline">
          <div className="label mb-1">NOTES</div>
          <div className="mono text-[12px]">{cfg.notes}</div>
        </div>
      ) : null}

      {/* INTERNAL DISCLAIMER — clinical, no highlight */}
      <div className="px-5 py-3 border-t hairline">
        <span className="mono text-[10px] tracking-[0.06em] uppercase text-[var(--led-ink-faint)]">
          {DISCLAIMER}
        </span>
      </div>
    </article>
  )
}

function Band({
  code,
  name,
  children,
}: {
  code: string
  name: string
  children: React.ReactNode
}) {
  return (
    <section className="px-5 py-4 border-t hairline">
      <header className="mono text-[11px] tracking-[0.08em] uppercase text-[var(--led-ink-dim)] mb-3">
        {code} / {name}
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-3">{children}</div>
    </section>
  )
}

function Hero({ label, big, sub }: { label: string; big: string; sub: string }) {
  return (
    <div className="px-5 py-5 border-r hairline last:border-r-0">
      <div className="label mb-2">{label}</div>
      <FlashValue
        value={big}
        className="mono text-[22px] font-bold leading-none tracking-tight tabular-nums block"
      />
      <div className="mono text-[10px] tracking-[0.08em] uppercase text-[var(--led-ink-dim)] mt-2">
        {sub}
      </div>
    </div>
  )
}

function KV({
  label,
  value,
  wide,
}: {
  label: string
  value: string
  wide?: boolean
}) {
  return (
    <div className={wide ? "md:col-span-2" : undefined}>
      <div className="label">{label}</div>
      <FlashValue value={value} className="mono text-[13px] font-bold mt-0.5 tabular-nums block" />
    </div>
  )
}

function signalEntryLabel(s: WallConfig["signal_entry"]): string {
  return ({
    TL: "TOP LEFT",
    TR: "TOP RIGHT",
    BL: "BOTTOM LEFT",
    BR: "BOTTOM RIGHT",
  } as const)[s]
}
