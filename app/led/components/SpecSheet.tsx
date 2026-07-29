import type { Cabinet, Derived, WallConfig } from "../lib/types"
import { fmt } from "../lib/derive"
import { arealLabel, fmtAreal, fmtViewDist, fmtWallWH, fmtWallWHAlt, fmtWeight, unitsOf } from "../lib/units"
import { DISCLAIMER, POWER_NOTE } from "../lib/brand"
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
  const u = unitsOf(cfg)
  return (
    <article className="panel" id="spec-sheet">
      {/* HEADER STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 border-b hairline">
        <div className="flex items-center gap-2.5 min-w-0">
          <Glyph size={14} />
          <span className="mono text-[10px] tracking-[0.08em] uppercase truncate">
            TECHNICALLY CREATIVE / DETROIT
          </span>
        </div>
        <div className="mono text-[10px] tracking-[0.08em] uppercase text-[var(--led-ink-dim)] flex flex-wrap gap-x-4 gap-y-1 min-w-0">
          <span className="hidden sm:inline">SPEC SHEET</span>
          <span className="truncate">{cfg.project_code || "-"}</span>
          <span>REV {cfg.rev || "-"}</span>
          <span>{cfg.issued_date || "-"}</span>
        </div>
      </div>

      {/* IDENTITY BLOCK */}
      <div className="px-5 py-4 border-b hairline grid grid-cols-2 md:grid-cols-4 gap-4">
        <KV label="PROJECT" value={cfg.project_name || "-"} wide />
        <KV label="CLIENT" value={cfg.client || "-"} />
        <KV label="TOUR" value={cfg.tour || "-"} />
        <KV label="SHOW DATE" value={cfg.show_date || "-"} />
        <KV label="LEAD" value={cfg.lead || "-"} />
        <KV label="CABINET" value={`${cab.manufacturer} ${cab.model}`} wide />
        <KV label="PITCH" value={`${cab.pixel_pitch_mm.toFixed(2)} mm`} />
      </div>

      {/* HERO SUMMARY STRIP - values white, not accent */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b hairline">
        <Hero label="TILES" big={`${cfg.tiles_wide}×${cfg.tiles_high}`} sub={`${fmt.int(d.tiles_total)} TOTAL`} />
        <Hero label="PIXELS" big={`${fmt.int(d.pixels_wide)}×${fmt.int(d.pixels_high)}`} sub={`${fmt.int(d.pixels_total)} TOTAL`} />
        <Hero label="WALL" big={fmtWallWH(d, u)} sub={fmtWallWHAlt(d, u)} />
        <Hero label="POWER" big={`${fmt.num(d.amps_max_per_phase, 0)} A`} sub={`MAX / ${fmt.num(d.amps_avg_per_phase, 0)} A AVG / ${cfg.power_service}`} />
      </div>

      {/* OPTICAL */}
      <Band name="OPTICAL">
        <KV label="ASPECT" value={d.aspect_ratio} />
        <KV label="VIEW DIST" value={fmtViewDist(d, u)} />
        <KV label="BRIGHTNESS" value={`${fmt.int(cab.brightness_nits)} nits`} />
        <KV label="REFRESH" value={`${fmt.int(cab.refresh_hz)} Hz`} />
        <KV label="BIT DEPTH" value={`${cab.bit_depth}-bit`} />
        <KV label="COLOR SPACE" value={cab.color_space} />
        <KV label="SCAN" value={cab.scan_ratio} />
        <KV label="VIEW ANGLE" value={`${cab.viewing_angle_h}°H / ${cab.viewing_angle_v}°V`} />
      </Band>

      {/* POWER */}
      <Band name="POWER">
        <KV label="MAX POWER" value={`${fmt.num(d.max_power_kw, 1)} kW`} />
        <KV label="AVG POWER" value={`${fmt.num(d.avg_power_kw, 1)} kW`} />
        <KV label="APPARENT" value={`${fmt.num(d.max_apparent_kva, 1)} kVA`} />
        <KV label="HEAT LOAD" value={`${fmt.int(d.btu_per_hour)} BTU/hr`} />
        <div className="md:col-span-4">
          <span className="mono text-[10px] tracking-[0.06em] uppercase text-[var(--led-ink-faint)]">
            {POWER_NOTE}
          </span>
        </div>
      </Band>

      {/* PHYSICAL */}
      <Band name="PHYSICAL">
        <KV label="BASE WT" value={fmtWeight(d.total_weight_kg, u)} wide />
        <KV label="WT / ROW" value={fmtWeight(d.weight_per_row_kg, u)} />
        <KV label={arealLabel(u)} value={fmtAreal(d.weight_per_m2_kg, u)} />
        <KV label={`INSTALLED WT / +${fmt.num(d.total_allowance_pct, 0)}%`} value={fmtWeight(d.installed_weight_kg, u)} wide />
      </Band>

      {/* SIGNAL */}
      <Band name="SIGNAL">
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

      {/* INTERNAL DISCLAIMER - clinical, no highlight */}
      <div className="px-5 py-3 border-t hairline">
        <span className="mono text-[10px] tracking-[0.06em] uppercase text-[var(--led-ink-faint)]">
          {DISCLAIMER}
        </span>
      </div>
    </article>
  )
}

function Band({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <section className="px-5 py-5 border-t hairline">
      <header className="flex items-center gap-3 mb-4">
        <h3 className="mono text-[12px] font-bold tracking-[0.16em] uppercase whitespace-nowrap">
          {name}
        </h3>
        <span className="flex-1 border-t hairline" />
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">{children}</div>
    </section>
  )
}

function Hero({ label, big, sub }: { label: string; big: string; sub: string }) {
  return (
    <div className="px-5 py-5 border-b md:border-b-0 md:border-r hairline last:border-b-0 md:last:border-r-0">
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
      <FlashValue value={value} className="mono text-[14px] font-bold mt-1 tabular-nums block leading-snug" />
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
