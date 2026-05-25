"use client"
import type { AllowancePreset, Derived, WallConfig } from "../lib/types"
import { ALLOWANCE_NOTE, ALLOWANCE_PRESETS } from "../lib/brand"
import { fmt } from "../lib/derive"

export function AllowancesForm({
  cfg,
  d,
  onChange,
}: {
  cfg: WallConfig
  d: Derived
  onChange: (next: Partial<WallConfig>) => void
}) {
  const preset: AllowancePreset = cfg.allowance_preset ?? "standard"
  const cabling = cfg.cabling_pct ?? 3
  const rigging = cfg.rigging_pct ?? 12
  const topRig = cfg.top_rigging_pct ?? 5
  const windOn = cfg.wind_bracing === true
  const windPct = cfg.wind_bracing_pct ?? 10

  function applyPreset(p: "standard" | "conservative") {
    const v = ALLOWANCE_PRESETS[p]
    onChange({
      allowance_preset: p,
      cabling_pct: v.cabling_pct,
      rigging_pct: v.rigging_pct,
      top_rigging_pct: v.top_rigging_pct,
      wind_bracing: false,
    })
  }

  // Any manual edit drops the active preset to Custom.
  function edit(next: Partial<WallConfig>) {
    onChange({ allowance_preset: "custom", ...next })
  }

  return (
    <div className="panel p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-4">
        <h2 className="mono text-[12px] tracking-[0.08em] uppercase">
          05 / INSTALLED WEIGHT ALLOWANCES
        </h2>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)] shrink-0">
          % OF BASE WEIGHT
        </span>
      </div>

      {/* Preset selector */}
      <div className="mb-4">
        <div className="label mb-1.5">PRESET</div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["standard", "INDUSTRY STANDARD"],
              ["conservative", "CONSERVATIVE"],
              ["custom", "CUSTOM"],
            ] as const
          ).map(([key, lbl]) => (
            <button
              key={key}
              type="button"
              aria-pressed={preset === key}
              className="mono text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 border transition-colors"
              style={{
                borderRadius: 2,
                borderColor: preset === key ? "var(--led-ink)" : "var(--led-line)",
                color: preset === key ? "var(--led-ink)" : "var(--led-ink-dim)",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                if (key === "custom") onChange({ allowance_preset: "custom" })
                else applyPreset(key)
              }}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PctField
          label="CABLING"
          hint="2–5%"
          value={cabling}
          desc="Power, data, and service loops."
          onChange={(v) => edit({ cabling_pct: v })}
        />
        <PctField
          label="RIGGING HARDWARE"
          hint="10–15%"
          value={rigging}
          desc="Brackets, hanging hardware, top bars, shackles."
          onChange={(v) => edit({ rigging_pct: v })}
        />
        <PctField
          label="TOP RIGGING"
          hint="5–10%"
          value={topRig}
          desc="Header beams, top rigging bars, flying hardware."
          onChange={(v) => edit({ top_rigging_pct: v })}
        />
      </div>

      {/* Wind bracing — optional, off by default */}
      <div className="mt-4 border-t hairline pt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={windOn}
            onChange={(e) => edit({ wind_bracing: e.target.checked })}
            style={{ width: 14, height: 14, accentColor: "var(--led-accent)" }}
          />
          <span className="label" style={{ color: "var(--led-ink)" }}>
            INCLUDE WIND BRACING ALLOWANCE
          </span>
        </label>
        {windOn ? (
          <div className="mt-3 max-w-[220px]">
            <PctField
              label="WIND BRACING"
              hint="10–25%"
              value={windPct}
              desc="Outdoor / engineered wind bracing only."
              onChange={(v) => edit({ wind_bracing_pct: v })}
            />
          </div>
        ) : null}
      </div>

      {/* Breakdown */}
      <div className="mt-4 border-t hairline pt-4 space-y-1.5">
        <Row label="BASE LED WALL" kg={d.total_weight_kg} lb={d.total_weight_lb} />
        <Row label={`CABLING / ${cabling}%`} kg={d.cabling_weight_kg} />
        <Row label={`RIGGING HW / ${rigging}%`} kg={d.rigging_weight_kg} />
        <Row label={`TOP RIGGING / ${topRig}%`} kg={d.top_rigging_weight_kg} />
        {windOn ? (
          <Row label={`WIND BRACING / ${windPct}%`} kg={d.wind_bracing_weight_kg} />
        ) : null}
        <div className="border-t hairline pt-1.5 mt-1.5">
          <Row
            label={`TOTAL INSTALLED / +${fmt.num(d.total_allowance_pct, 0)}%`}
            kg={d.installed_weight_kg}
            lb={d.installed_weight_lb}
            strong
          />
        </div>
      </div>

      {d.total_allowance_pct > 25 ? (
        <div
          className="mono text-[10px] uppercase mt-3 px-3 py-2 border"
          style={{ borderColor: "var(--led-error)", color: "var(--led-error)" }}
        >
          TOTAL ALLOWANCE ABOVE 25% / CONFIRM THIS IS INTENTIONAL
        </div>
      ) : null}

      <p className="mono text-[10px] leading-relaxed text-[var(--led-ink-faint)] mt-3">
        {ALLOWANCE_NOTE}
      </p>
    </div>
  )
}

function PctField({
  label,
  hint,
  desc,
  value,
  onChange,
}: {
  label: string
  hint: string
  desc: string
  value: number
  onChange: (v: number) => void
}) {
  const over = value > 25
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="label">{label}</span>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">{hint}</span>
      </div>
      <div className="relative">
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={value}
          aria-invalid={over}
          onChange={(e) => {
            const n = parseFloat(e.target.value)
            onChange(Number.isNaN(n) ? 0 : Math.max(0, n))
          }}
          style={over ? { borderColor: "var(--led-error)" } : undefined}
        />
      </div>
      <div className="mono text-[10px] text-[var(--led-ink-faint)] mt-1 leading-snug">{desc}</div>
    </label>
  )
}

function Row({
  label,
  kg,
  lb,
  strong,
}: {
  label: string
  kg: number
  lb?: number
  strong?: boolean
}) {
  const KG_PER_LB = 0.45359237
  const lbVal = lb ?? kg / KG_PER_LB
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span
        className="mono text-[11px] uppercase tracking-[0.04em]"
        style={{ color: strong ? "var(--led-ink)" : "var(--led-ink-dim)" }}
      >
        {label}
      </span>
      <span
        className={`mono tabular-nums ${strong ? "text-[13px] font-bold" : "text-[11px]"}`}
        style={{ color: strong ? "var(--led-ink)" : "var(--led-ink-dim)" }}
      >
        {fmt.num(kg, 0)} kg / {fmt.int(lbVal)} lb
      </span>
    </div>
  )
}
