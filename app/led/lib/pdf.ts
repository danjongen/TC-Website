/**
 * Branded PDF generation for Spec Sheet (Letter landscape) and
 * Panel Map (Tabloid landscape). Client-only / no server cost.
 *
 * jsPDF is used directly for the spec sheet (text + rect APIs)
 * because it gives deterministic layout vs DOM-to-PDF.
 * svg2pdf.js is used for the panel map since the panel map is
 * already a precise SVG we want pixel-accurate.
 */

import type { Cabinet, Derived, WallConfig } from "./types"
import { fmt, padWidth } from "./derive"
import { COLORS } from "./brand"

const PT_PER_IN = 72

// ---------- shared helpers ----------

async function makeDoc(orientation: "l", widthIn: number, heightIn: number) {
  const { jsPDF } = await import("jspdf")
  return new jsPDF({
    orientation,
    unit: "pt",
    format: [widthIn * PT_PER_IN, heightIn * PT_PER_IN],
  })
}

function setFill(doc: any, hex: string) {
  const [r, g, b] = hexRgb(hex)
  doc.setFillColor(r, g, b)
}
function setStroke(doc: any, hex: string) {
  const [r, g, b] = hexRgb(hex)
  doc.setDrawColor(r, g, b)
}
function setText(doc: any, hex: string) {
  const [r, g, b] = hexRgb(hex)
  doc.setTextColor(r, g, b)
}

function hexRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "")
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ]
}

function signalEntryLabel(s: WallConfig["signal_entry"]): string {
  return ({
    TL: "TOP LEFT",
    TR: "TOP RIGHT",
    BL: "BOTTOM LEFT",
    BR: "BOTTOM RIGHT",
  } as const)[s]
}

// ---------- spec sheet PDF ----------

export async function renderSpecPdf(
  cab: Cabinet,
  cfg: WallConfig,
  d: Derived
): Promise<Blob> {
  const doc = await makeDoc("l", 11, 8.5)
  const W = 11 * PT_PER_IN
  const H = 8.5 * PT_PER_IN

  // Background fill
  setFill(doc, COLORS.bg)
  doc.rect(0, 0, W, H, "F")

  // Use Courier (mono) for everything to stay clinical and legible.
  doc.setFont("courier", "normal")

  const M = 24 // page margin in pt

  // Header strip
  setStroke(doc, COLORS.line)
  doc.setLineWidth(0.5)
  doc.line(M, M + 22, W - M, M + 22)

  setFill(doc, COLORS.ink)
  // TC glyph
  drawGlyph(doc, M, M + 4, 12, COLORS.ink)
  setText(doc, COLORS.ink)
  doc.setFontSize(8)
  doc.text("TECHNICALLY CREATIVE / DETROIT", M + 18, M + 14)

  setText(doc, COLORS.inkDim)
  doc.setFontSize(8)
  const headerRight = `SPEC SHEET   ${cfg.project_code || "—"}   REV ${cfg.rev || "—"}   ${cfg.issued_date || "—"}`
  doc.text(headerRight, W - M, M + 14, { align: "right" })

  // Project block
  const projY = M + 38
  drawKV(doc, M, projY, "PROJECT", cfg.project_name || "—", 280)
  drawKV(doc, M + 300, projY, "CLIENT", cfg.client || "—", 180)
  drawKV(doc, M + 500, projY, "TOUR", cfg.tour || "—", 130)
  drawKV(doc, M + 650, projY, "SHOW DATE", cfg.show_date || "—", 100)

  const projY2 = projY + 28
  drawKV(doc, M, projY2, "LEAD", cfg.lead || "—", 180)
  drawKV(doc, M + 200, projY2, "CABINET", `${cab.manufacturer} ${cab.model}`, 300)
  drawKV(doc, M + 520, projY2, "PITCH", `${cab.pixel_pitch_mm.toFixed(2)} mm`, 90)
  drawKV(doc, M + 630, projY2, "TOURING", cab.touring_rated ? "YES" : "NO", 60)

  // Divider
  setStroke(doc, COLORS.line)
  doc.line(M, projY2 + 22, W - M, projY2 + 22)

  // Hero 4-column
  const heroY = projY2 + 36
  const heroH = 88
  const heroW = (W - 2 * M) / 4
  drawHero(doc, M + 0 * heroW, heroY, heroW, heroH, "TILES", `${cfg.tiles_wide}x${cfg.tiles_high}`, `${fmt.int(d.tiles_total)} TOTAL`)
  drawHero(doc, M + 1 * heroW, heroY, heroW, heroH, "PIXELS", `${fmt.int(d.pixels_wide)}x${fmt.int(d.pixels_high)}`, `${fmt.int(d.pixels_total)} TOTAL`)
  drawHero(doc, M + 2 * heroW, heroY, heroW, heroH, "WALL", `${d.wall_width_m.toFixed(2)}x${d.wall_height_m.toFixed(2)} m`, `${d.wall_width_imperial} x ${d.wall_height_imperial}`)
  drawHero(doc, M + 3 * heroW, heroY, heroW, heroH, "POWER", `${fmt.num(d.amps_max_per_phase, 0)} A`, `MAX / ${fmt.num(d.amps_avg_per_phase, 0)} A AVG / ${cfg.power_service}`)
  // Hero divider
  setStroke(doc, COLORS.line)
  doc.line(M, heroY + heroH + 4, W - M, heroY + heroH + 4)

  // Context grid (optical)
  const ctxY = heroY + heroH + 22
  drawKV(doc, M, ctxY, "ASPECT", d.aspect_ratio, 120)
  drawKV(doc, M + 130, ctxY, "VIEW DIST", `${d.optimal_viewing_distance_m.toFixed(1)} m / ${d.optimal_viewing_distance_ft} ft`, 180)
  drawKV(doc, M + 320, ctxY, "BRIGHTNESS", `${fmt.int(cab.brightness_nits)} nits`, 130)
  drawKV(doc, M + 460, ctxY, "REFRESH", `${fmt.int(cab.refresh_hz)} Hz`, 100)
  drawKV(doc, M + 570, ctxY, "BIT DEPTH", `${cab.bit_depth}-bit`, 90)
  drawKV(doc, M + 670, ctxY, "COLOR", cab.color_space, 90)

  const ctxY2 = ctxY + 28
  drawKV(doc, M, ctxY2, "SCAN", cab.scan_ratio, 90)
  drawKV(doc, M + 100, ctxY2, "VIEW ANGLE", `${cab.viewing_angle_h}°H / ${cab.viewing_angle_v}°V`, 150)
  drawKV(doc, M + 260, ctxY2, "MAX POWER", `${fmt.num(d.max_power_kw, 1)} kW`, 110)
  drawKV(doc, M + 380, ctxY2, "AVG POWER", `${fmt.num(d.avg_power_kw, 1)} kW`, 110)
  drawKV(doc, M + 500, ctxY2, "APPARENT", `${fmt.num(d.max_apparent_kva, 1)} kVA`, 110)
  drawKV(doc, M + 620, ctxY2, "HEAT", `${fmt.int(d.btu_per_hour)} BTU/hr`, 140)

  setStroke(doc, COLORS.line)
  doc.line(M, ctxY2 + 22, W - M, ctxY2 + 22)

  // Weight + signal + logistics
  const wtY = ctxY2 + 36
  drawKV(doc, M, wtY, "TOTAL WEIGHT", `${fmt.num(d.total_weight_kg, 0)} kg / ${fmt.int(d.total_weight_lb)} lb`, 240)
  drawKV(doc, M + 250, wtY, "WT / ROW", `${fmt.num(d.weight_per_row_kg, 0)} kg`, 110)
  drawKV(doc, M + 370, wtY, "WT / m²", `${fmt.num(d.weight_per_m2_kg, 0)} kg`, 110)
  drawKV(doc, M + 490, wtY, "PROCESSOR", `${d.processor_count_required} x ${d.processor_label}`, 270)

  const wtY2 = wtY + 28
  drawKV(doc, M, wtY2, "DAISY CHAIN", `${cab.daisy_chain_limit} cabs / line`, 160)
  drawKV(doc, M + 170, wtY2, "SIGNAL ENTRY", signalEntryLabel(cfg.signal_entry), 150)
  drawKV(doc, M + 330, wtY2, "AUDIENCE", cfg.audience_position.toUpperCase(), 110)
  drawKV(doc, M + 450, wtY2, "IP FRONT/REAR", `${cab.ip_rating_front} / ${cab.ip_rating_rear}`, 140)
  drawKV(doc, M + 600, wtY2, "SERVICE", `${cab.service_access.toUpperCase()} / ${cab.service_depth_mm}mm`, 160)

  const wtY3 = wtY2 + 28
  drawKV(doc, M, wtY3, "SPARES", `${Math.max(1, Math.ceil(d.tiles_total * 0.05))} cabs / 5%`, 180)
  if (cfg.notes) {
    drawKV(doc, M + 200, wtY3, "NOTES", cfg.notes, W - 2 * M - 200)
  }

  // Footer
  setStroke(doc, COLORS.line)
  doc.line(M, H - M - 22, W - M, H - M - 22)
  setText(doc, COLORS.inkFaint)
  doc.setFontSize(7)
  doc.text(
    `SYSTEM / ${cab.manufacturer} ${cab.model} / ${d.processor_label}`,
    M,
    H - M - 8
  )
  doc.text(`AMPS / PER CABINET PF ${cab.power_factor.toFixed(2)}`, W / 2, H - M - 8, { align: "center" })
  doc.text(
    `© ${new Date().getFullYear()} TECHNICALLY CREATIVE / DETROIT   CALC / 26-TCX-01-LEDTOOL`,
    W - M,
    H - M - 8,
    { align: "right" }
  )

  return doc.output("blob") as Blob
}

function drawKV(doc: any, x: number, y: number, label: string, value: string, maxW: number) {
  setText(doc, COLORS.inkDim)
  doc.setFontSize(7)
  doc.text(label, x, y)
  setText(doc, COLORS.ink)
  doc.setFontSize(10)
  const t = truncateToWidth(doc, value, maxW)
  doc.text(t, x, y + 12)
}

function drawHero(
  doc: any,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  big: string,
  sub: string
) {
  setStroke(doc, COLORS.line)
  doc.setLineWidth(0.5)
  // vertical divider on the right (except for last column)
  doc.line(x + w, y, x + w, y + h)
  setText(doc, COLORS.inkDim)
  doc.setFontSize(7)
  doc.text(label, x + 6, y + 12)
  setText(doc, COLORS.accent)
  doc.setFontSize(20)
  doc.text(big, x + 6, y + 40)
  setText(doc, COLORS.inkDim)
  doc.setFontSize(7)
  doc.text(sub, x + 6, y + 62)
}

function truncateToWidth(doc: any, s: string, maxWidthPt: number): string {
  if (!s) return s
  if (doc.getTextWidth(s) <= maxWidthPt) return s
  let lo = 0
  let hi = s.length
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2)
    if (doc.getTextWidth(s.slice(0, mid) + "…") <= maxWidthPt) lo = mid
    else hi = mid - 1
  }
  return s.slice(0, lo) + "…"
}

function drawGlyph(doc: any, x: number, y: number, size: number, hex: string) {
  setFill(doc, hex)
  // square with corner cutout — same shape as the on-screen Glyph
  const s = size
  const cut = s * 0.375
  doc.lines(
    [
      [s, 0],
      [0, s - cut],
      [-cut, cut],
      [-(s - cut), 0],
    ],
    x,
    y,
    [1, 1],
    "F",
    true
  )
}

// ---------- panel map PDF ----------

export async function renderPanelMapPdf(
  cab: Cabinet,
  cfg: WallConfig
): Promise<Blob> {
  const doc = await makeDoc("l", 17, 11)
  const W = 17 * PT_PER_IN
  const H = 11 * PT_PER_IN

  // Background
  setFill(doc, COLORS.bg)
  doc.rect(0, 0, W, H, "F")

  doc.setFont("courier", "normal")

  // Top strip (branded header)
  const headerH = 32
  setText(doc, COLORS.ink)
  drawGlyph(doc, 18, 10, 14, COLORS.ink)
  doc.setFontSize(9)
  doc.text("TECHNICALLY CREATIVE / DETROIT", 38, 22)

  setText(doc, COLORS.inkDim)
  doc.text(
    `PANEL MAP   ${cfg.project_code || "—"}   ${cab.manufacturer} ${cab.model}   ${cfg.tiles_wide}W x ${cfg.tiles_high}H / ${cfg.tiles_wide * cfg.tiles_high} CABS`,
    W - 18,
    22,
    { align: "right" }
  )
  setStroke(doc, COLORS.line)
  doc.line(18, headerH, W - 18, headerH)

  // Footer strip
  const footerY = H - 26
  setStroke(doc, COLORS.line)
  doc.line(18, footerY, W - 18, footerY)
  setText(doc, COLORS.inkFaint)
  doc.setFontSize(8)
  doc.text(`SIGNAL ENTRY / ${signalEntryLabel(cfg.signal_entry)}`, 18, footerY + 14)
  doc.text(`AUDIENCE / ${cfg.audience_position.toUpperCase()}`, 18 + 250, footerY + 14)
  doc.text(`TILE / ${cab.tile_width_mm}x${cab.tile_height_mm}mm`, 18 + 460, footerY + 14)
  doc.text(`PITCH / ${cab.pixel_pitch_mm.toFixed(2)}mm`, 18 + 660, footerY + 14)
  doc.text(`CALC / 26-TCX-01-LEDTOOL`, W - 18, footerY + 14, { align: "right" })

  // Draw the panel grid inside the available space
  const padX = 60
  const padY = 60
  const gridX = padX
  const gridY = headerH + padY
  const gridW = W - 2 * padX
  const gridH = footerY - headerH - 2 * padY

  const cols = Math.max(1, cfg.tiles_wide)
  const rows = Math.max(1, cfg.tiles_high)
  const tileAspect = cab.tile_width_mm / cab.tile_height_mm
  // Solve for the largest tile size that fits both width and height.
  const tileWByW = gridW / cols
  const tileHByH = gridH / rows
  let tileH = Math.min(tileWByW / tileAspect, tileHByH)
  let tileW = tileH * tileAspect
  // Center the grid
  const drawnW = cols * tileW
  const drawnH = rows * tileH
  const offsetX = gridX + (gridW - drawnW) / 2
  const offsetY = gridY + (gridH - drawnH) / 2

  const pad = padWidth(cols * rows)
  const axisPad = Math.max(2, padWidth(Math.max(cols, rows)))
  const stride = labelStride(Math.max(cols, rows))

  // Axis labels — columns
  setText(doc, COLORS.accent)
  doc.setFontSize(7)
  for (let c = 0; c < cols; c++) {
    const show = c === 0 || c === cols - 1 || (c + 1) % stride === 0
    if (!show) continue
    doc.text(
      String(c + 1).padStart(axisPad, "0"),
      offsetX + c * tileW + tileW / 2,
      offsetY - 8,
      { align: "center" }
    )
  }
  // Axis labels — rows
  for (let r = 0; r < rows; r++) {
    const show = r === 0 || r === rows - 1 || (r + 1) % stride === 0
    if (!show) continue
    doc.text(
      String(r + 1).padStart(axisPad, "0"),
      offsetX - 8,
      offsetY + r * tileH + tileH / 2 + 3,
      { align: "right" }
    )
  }

  // Tiles
  doc.setLineWidth(0.3)
  setStroke(doc, COLORS.line)
  const showNumbers = cols * rows <= 1200 && tileW >= 14 && tileH >= 14
  const numberFontSize = Math.max(4, Math.min(10, tileH * 0.32))
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isCorner =
        (r === 0 && c === 0) ||
        (r === 0 && c === cols - 1) ||
        (r === rows - 1 && c === 0) ||
        (r === rows - 1 && c === cols - 1)
      const checkerA = (r + c) % 2 === 0
      const fill = isCorner ? "#0d3a1f" : checkerA ? COLORS.tileA : COLORS.tileB
      setFill(doc, fill)
      setStroke(doc, isCorner ? COLORS.accent : COLORS.line)
      doc.setLineWidth(isCorner ? 0.9 : 0.3)
      doc.rect(offsetX + c * tileW, offsetY + r * tileH, tileW, tileH, "FD")
      if (showNumbers) {
        setText(doc, isCorner ? COLORS.accent : COLORS.inkDim)
        doc.setFontSize(numberFontSize)
        doc.text(
          String(r * cols + c + 1).padStart(pad, "0"),
          offsetX + c * tileW + tileW / 2,
          offsetY + r * tileH + tileH / 2 + numberFontSize / 3,
          { align: "center" }
        )
      }
    }
  }

  // Signal entry arrow
  const entry = entryPdfXY(cfg.signal_entry, offsetX, offsetY, drawnW, drawnH, tileW, tileH)
  setFill(doc, COLORS.accent)
  setStroke(doc, COLORS.accent)
  doc.setLineWidth(1.2)
  doc.circle(entry.cx, entry.cy, 6, "F")
  doc.line(entry.cx, entry.cy, entry.lx, entry.ly)
  setText(doc, COLORS.accent)
  doc.setFontSize(7)
  doc.text("SIGNAL IN", entry.tx, entry.ty, { align: entry.anchor })

  // Audience marker
  const aud = audPdfLine(cfg.audience_position, offsetX, offsetY, drawnW, drawnH)
  setStroke(doc, COLORS.accent)
  doc.setLineDashPattern([3, 3], 0)
  doc.setLineWidth(0.8)
  doc.line(aud.x1, aud.y1, aud.x2, aud.y2)
  doc.setLineDashPattern([], 0)
  setText(doc, COLORS.accent)
  doc.setFontSize(7)
  doc.text("AUDIENCE", aud.tx, aud.ty, { align: aud.anchor })

  return doc.output("blob") as Blob
}

function labelStride(n: number): number {
  if (n <= 10) return 1
  if (n <= 25) return 5
  if (n <= 60) return 10
  return 20
}

function entryPdfXY(
  s: WallConfig["signal_entry"],
  ox: number,
  oy: number,
  w: number,
  h: number,
  tileW: number,
  tileH: number
) {
  const off = 18
  const left = ox - off
  const right = ox + w + off
  const top = oy - off
  const bottom = oy + h + off
  switch (s) {
    case "TL":
      return { cx: left, cy: top, lx: ox + tileW / 2, ly: oy + tileH / 2, tx: left - 4, ty: top - 4, anchor: "right" as const }
    case "TR":
      return { cx: right, cy: top, lx: ox + w - tileW / 2, ly: oy + tileH / 2, tx: right + 4, ty: top - 4, anchor: "left" as const }
    case "BL":
      return { cx: left, cy: bottom, lx: ox + tileW / 2, ly: oy + h - tileH / 2, tx: left - 4, ty: bottom + 10, anchor: "right" as const }
    case "BR":
      return { cx: right, cy: bottom, lx: ox + w - tileW / 2, ly: oy + h - tileH / 2, tx: right + 4, ty: bottom + 10, anchor: "left" as const }
  }
}

function audPdfLine(
  s: WallConfig["audience_position"],
  ox: number,
  oy: number,
  w: number,
  h: number
) {
  const off = 28
  switch (s) {
    case "bottom":
      return { x1: ox, y1: oy + h + off, x2: ox + w, y2: oy + h + off, tx: ox + w / 2, ty: oy + h + off + 10, anchor: "center" as const }
    case "top":
      return { x1: ox, y1: oy - off, x2: ox + w, y2: oy - off, tx: ox + w / 2, ty: oy - off - 4, anchor: "center" as const }
    case "left":
      return { x1: ox - off, y1: oy, x2: ox - off, y2: oy + h, tx: ox - off - 4, ty: oy + h / 2, anchor: "right" as const }
    case "right":
      return { x1: ox + w + off, y1: oy, x2: ox + w + off, y2: oy + h, tx: ox + w + off + 4, ty: oy + h / 2, anchor: "left" as const }
  }
}

// ---------- download helper ----------

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
