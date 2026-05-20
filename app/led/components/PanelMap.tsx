"use client"
import type { Cabinet, WallConfig } from "../lib/types"
import { fmt, padWidth } from "../lib/derive"
import { COLORS } from "../lib/brand"

/**
 * SVG panel map. Cabinets numbered L→R, T→B starting at 01
 * (context-aware pad — grows to 001 once total > 99).
 * Corner cabinets in accent. Axis labels every N cols/rows.
 * Signal entry corner shown with accent arrow.
 * Audience direction marked at appropriate edge.
 */
export function PanelMap({
  cab,
  cfg,
}: {
  cab: Cabinet
  cfg: WallConfig
}) {
  const cols = Math.max(1, cfg.tiles_wide)
  const rows = Math.max(1, cfg.tiles_high)
  const pad = padWidth(cols * rows)
  const axisPad = Math.max(2, padWidth(Math.max(cols, rows)))

  // Match the real tile aspect (per cabinet) on screen.
  const tileAspect = cab.tile_width_mm / cab.tile_height_mm
  const baseTile = 28 // px when not constrained; we'll scale via viewBox
  const tileW = baseTile * tileAspect
  const tileH = baseTile

  const padX = 56
  const padY = 56
  const w = cols * tileW + padX * 2
  const h = rows * tileH + padY * 2

  const showNumbers = cols * rows <= 80
  const showEveryNCol = labelStride(cols)
  const showEveryNRow = labelStride(rows)

  const entry = signalEntryXY(cfg.signal_entry, padX, padY, cols, rows, tileW, tileH)

  return (
    <div className="panel">
      <div className="flex items-center justify-between px-5 py-3 border-b hairline">
        <h3 className="mono text-[12px] tracking-[0.08em] uppercase">PANEL MAP</h3>
        <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">
          {cols}W × {rows}H / {fmt.int(cols * rows)} CABS
        </span>
      </div>
      <div className="p-3 overflow-auto scroll-fade" style={{ maxHeight: 560 }}>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width="100%"
          style={{ display: "block", minWidth: 640, background: COLORS.bg }}
          role="img"
          aria-label={`Panel map ${cols} by ${rows}`}
        >
          {/* Axis labels — columns */}
          {Array.from({ length: cols }).map((_, c) => {
            const show = c === 0 || c === cols - 1 || (c + 1) % showEveryNCol === 0
            if (!show) return null
            return (
              <text
                key={`cx-${c}`}
                x={padX + c * tileW + tileW / 2}
                y={padY - 14}
                fontFamily="var(--font-led-mono), monospace"
                fontSize={9}
                fill={COLORS.accent}
                textAnchor="middle"
              >
                {fmt.pad(c + 1, axisPad)}
              </text>
            )
          })}
          {/* Axis labels — rows */}
          {Array.from({ length: rows }).map((_, r) => {
            const show = r === 0 || r === rows - 1 || (r + 1) % showEveryNRow === 0
            if (!show) return null
            return (
              <text
                key={`ry-${r}`}
                x={padX - 10}
                y={padY + r * tileH + tileH / 2 + 3}
                fontFamily="var(--font-led-mono), monospace"
                fontSize={9}
                fill={COLORS.accent}
                textAnchor="end"
              >
                {fmt.pad(r + 1, axisPad)}
              </text>
            )
          })}

          {/* Tiles */}
          {Array.from({ length: rows }).flatMap((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const idx = r * cols + c
              const isCorner =
                (r === 0 && c === 0) ||
                (r === 0 && c === cols - 1) ||
                (r === rows - 1 && c === 0) ||
                (r === rows - 1 && c === cols - 1)
              const checkerA = (r + c) % 2 === 0
              return (
                <g key={`t-${r}-${c}`}>
                  <rect
                    x={padX + c * tileW}
                    y={padY + r * tileH}
                    width={tileW}
                    height={tileH}
                    fill={
                      isCorner
                        ? "rgba(0,210,106,0.10)"
                        : checkerA
                        ? COLORS.tileA
                        : COLORS.tileB
                    }
                    stroke={isCorner ? COLORS.accent : COLORS.line}
                    strokeWidth={isCorner ? 1.2 : 0.5}
                  />
                  {showNumbers ? (
                    <text
                      x={padX + c * tileW + tileW / 2}
                      y={padY + r * tileH + tileH / 2 + 3}
                      fontFamily="var(--font-led-mono), monospace"
                      fontSize={Math.min(9, tileH * 0.32)}
                      fill={isCorner ? COLORS.accent : COLORS.inkDim}
                      textAnchor="middle"
                    >
                      {fmt.pad(idx + 1, pad)}
                    </text>
                  ) : null}
                </g>
              )
            })
          )}

          {/* Signal entry arrow */}
          <g>
            <circle cx={entry.cx} cy={entry.cy} r={10} fill={COLORS.accent} />
            <text
              x={entry.tx}
              y={entry.ty}
              fontFamily="var(--font-led-mono), monospace"
              fontSize={9}
              fill={COLORS.accent}
              textAnchor={entry.anchor}
            >
              SIGNAL IN
            </text>
            <line
              x1={entry.cx}
              y1={entry.cy}
              x2={entry.lx}
              y2={entry.ly}
              stroke={COLORS.accent}
              strokeWidth={1.5}
              markerEnd="url(#arrowAccent)"
            />
          </g>

          <defs>
            <marker
              id="arrowAccent"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill={COLORS.accent} />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 px-5 py-3 border-t hairline">
        <LegendSwatch fill={COLORS.tileA} label="TILE A" />
        <LegendSwatch fill={COLORS.tileB} label="TILE B" />
        <LegendSwatch fill="rgba(0,210,106,0.10)" stroke={COLORS.accent} label="CORNER / INDEX" />
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: COLORS.accent,
              display: "inline-block",
            }}
          />
          <span className="mono text-[10px] uppercase text-[var(--led-ink-dim)]">SIGNAL ENTRY</span>
        </div>
      </div>
    </div>
  )
}

function LegendSwatch({ fill, stroke, label }: { fill: string; stroke?: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        style={{
          width: 14,
          height: 10,
          background: fill,
          border: `1px solid ${stroke ?? COLORS.line}`,
          display: "inline-block",
        }}
      />
      <span className="mono text-[10px] uppercase text-[var(--led-ink-dim)]">{label}</span>
    </div>
  )
}

function labelStride(n: number): number {
  if (n <= 10) return 1
  if (n <= 25) return 5
  if (n <= 60) return 10
  return 20
}

function signalEntryXY(
  s: WallConfig["signal_entry"],
  padX: number,
  padY: number,
  cols: number,
  rows: number,
  tileW: number,
  tileH: number
) {
  const left = padX - 18
  const right = padX + cols * tileW + 18
  const top = padY - 18
  const bottom = padY + rows * tileH + 18
  switch (s) {
    case "TL":
      return {
        cx: left,
        cy: top,
        lx: padX + tileW / 2,
        ly: padY + tileH / 2,
        tx: left - 4,
        ty: top - 4,
        anchor: "end" as const,
      }
    case "TR":
      return {
        cx: right,
        cy: top,
        lx: padX + (cols - 1) * tileW + tileW / 2,
        ly: padY + tileH / 2,
        tx: right + 4,
        ty: top - 4,
        anchor: "start" as const,
      }
    case "BL":
      return {
        cx: left,
        cy: bottom,
        lx: padX + tileW / 2,
        ly: padY + (rows - 1) * tileH + tileH / 2,
        tx: left - 4,
        ty: bottom + 12,
        anchor: "end" as const,
      }
    case "BR":
      return {
        cx: right,
        cy: bottom,
        lx: padX + (cols - 1) * tileW + tileW / 2,
        ly: padY + (rows - 1) * tileH + tileH / 2,
        tx: right + 4,
        ty: bottom + 12,
        anchor: "start" as const,
      }
  }
}

