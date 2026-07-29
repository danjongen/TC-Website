import type { Metadata } from "next"
import type { Cabinet, WallConfig } from "./types"
import { derive, fmt } from "./derive"
import { fmtWallWH, unitsOf } from "./units"
import { COLORS } from "./brand"

/**
 * Branded share-link preview. Both the link-unfurl metadata (og:title etc.)
 * and the 1200×630 OG image are built here so the /share/[config] and
 * /s/[id] routes stay in sync. Display-only: nothing here is derived for
 * procurement, it just surfaces the project identity in the preview card.
 */

export const OG_SIZE = { width: 1200, height: 630 }

function projectTitle(cfg: WallConfig | null): string {
  if (!cfg) return "LED Wall Spec"
  return cfg.project_name?.trim() || cfg.project_code?.trim() || "LED Wall Spec"
}

export function buildShareMetadata(
  cfg: WallConfig | null,
  cab: Cabinet | null
): Metadata {
  const title = `${projectTitle(cfg)} - LED Wall Spec`

  let description = "Technically Creative / LED wall spec sheet."
  if (cfg && cab) {
    const d = derive(cab, cfg)
    const u = unitsOf(cfg)
    const bits = [
      `${cab.manufacturer} ${cab.model}`,
      `${cfg.tiles_wide}×${cfg.tiles_high} tiles`,
      fmtWallWH(d, u),
      `${fmt.num(d.amps_max_per_phase, 0)}A/phase max · ${cfg.power_service}`,
    ]
    description = bits.join("  ·  ")
  }

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "TC Agency - Technically Creative",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: false, follow: false },
  }
}

function Stat({
  label,
  value,
  sub,
  size,
}: {
  label: string
  value: string
  sub: string
  size: number
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 18, letterSpacing: 2, color: COLORS.inkDim, textTransform: "uppercase" }}>
        {label}
      </div>
      <div
        style={{
          fontSize: size,
          fontWeight: 700,
          color: COLORS.ink,
          marginTop: 8,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 17, color: COLORS.inkDim, marginTop: 8, whiteSpace: "nowrap" }}>{sub}</div>
    </div>
  )
}

/**
 * The OG card element passed to next/og's ImageResponse. Dark spec-sheet
 * aesthetic with the TC glyph + wordmark - matching the spec PDF.
 */
export function ogCard(cfg: WallConfig | null, cab: Cabinet | null) {
  const d = cfg && cab ? derive(cab, cfg) : null
  const u = cfg ? unitsOf(cfg) : "metric"
  const title = projectTitle(cfg)
  const titleSize = title.length > 34 ? 40 : title.length > 22 ? 52 : 66

  const stats =
    d && cfg
      ? [
          { label: "Tiles", value: `${cfg.tiles_wide} × ${cfg.tiles_high}`, sub: `${fmt.int(d.tiles_total)} total` },
          { label: "Pixels", value: `${fmt.int(d.pixels_wide)} × ${fmt.int(d.pixels_high)}`, sub: `${fmt.int(d.pixels_total)} px` },
          { label: "Wall", value: fmtWallWH(d, u), sub: cab ? `${cab.pixel_pitch_mm.toFixed(2)} mm pitch` : "" },
          { label: "Power", value: `${fmt.num(d.amps_max_per_phase, 0)} A`, sub: `max / ${cfg.power_service}` },
        ]
      : null
  // One uniform value size that keeps the widest stat on a single line in its
  // column (~247px) - punchy for normal walls, auto-shrinks for extreme ones.
  const statSize = stats
    ? Math.max(20, Math.min(34, Math.floor(247 / (0.62 * Math.max(...stats.map((s) => s.value.length))))))
    : 34

  return (
    <div
      style={{
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: COLORS.bg,
        color: COLORS.ink,
        padding: 64,
      }}
    >
      {/* Header: glyph + wordmark, spec tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width={40} height={40} viewBox="0 0 16 16">
            <path d="M0 0 H16 V10 L10 16 H0 Z" fill={COLORS.ink} />
          </svg>
          <div style={{ fontSize: 22, letterSpacing: 2, marginLeft: 16, textTransform: "uppercase" }}>
            Technically Creative / Detroit
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ fontSize: 18, letterSpacing: 3, color: COLORS.inkDim, textTransform: "uppercase" }}>
            LED Wall Spec
          </div>
          {cfg?.project_code ? (
            <div style={{ fontSize: 20, color: COLORS.ink, marginTop: 4 }}>{cfg.project_code}</div>
          ) : null}
        </div>
      </div>

      {/* Title block */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 24, color: COLORS.inkDim, marginTop: 16 }}>
          {[cfg?.client?.trim(), cab ? `${cab.manufacturer} ${cab.model}` : null]
            .filter(Boolean)
            .join("  ·  ") || "Technically Creative"}
        </div>
      </div>

      {/* Stats + accent rule */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: 4, background: COLORS.accent, width: 96, marginBottom: 28 }} />
        {stats ? (
          <div style={{ display: "flex", gap: 28 }}>
            {stats.map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} sub={s.sub} size={statSize} />
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", fontSize: 24, color: COLORS.inkDim }}>
            Open the link to view the full spec sheet.
          </div>
        )}
      </div>
    </div>
  )
}
