/**
 * Branded output generation for the LED tool.
 *
 *  - Spec Sheet PDF — Letter landscape, jsPDF, embedded Space Mono.
 *  - Panel Map PNG — high-contrast functional artifact for content
 *    mapping in AE/PS. Bright, one-cabinet-per-cell, TC watermark.
 *
 * Everything runs client-side.
 */

import type { Cabinet, Derived, WallConfig } from "./types"
import { fmt, padWidth } from "./derive"
import { COLORS, DISCLAIMER } from "./brand"

const PT_PER_IN = 72

// ---------- font loading ----------

let fontPromise: Promise<{ regular: string; bold: string }> | null = null

async function fetchTtfBase64(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load font ${url} (${res.status})`)
  const buf = await res.arrayBuffer()
  let bin = ""
  const bytes = new Uint8Array(buf)
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return btoa(bin)
}

function loadSpaceMonoBase64() {
  if (!fontPromise) {
    fontPromise = Promise.all([
      fetchTtfBase64("/fonts/SpaceMono-Regular.ttf"),
      fetchTtfBase64("/fonts/SpaceMono-Bold.ttf"),
    ]).then(([regular, bold]) => ({ regular, bold }))
  }
  return fontPromise
}

async function registerSpaceMono(doc: any) {
  try {
    const { regular, bold } = await loadSpaceMonoBase64()
    doc.addFileToVFS("SpaceMono-Regular.ttf", regular)
    doc.addFont("SpaceMono-Regular.ttf", "SpaceMono", "normal")
    doc.addFileToVFS("SpaceMono-Bold.ttf", bold)
    doc.addFont("SpaceMono-Bold.ttf", "SpaceMono", "bold")
    doc.setFont("SpaceMono", "normal")
  } catch {
    // Fall back to built-in courier if font fetch fails.
    doc.setFont("courier", "normal")
  }
}

// Ensure the page has Space Mono fully loaded before drawing on canvas.
async function ensureCanvasFonts() {
  if (typeof document === "undefined") return
  const fonts: any = (document as any).fonts
  if (!fonts) return
  try {
    await Promise.all([
      fonts.load('700 14px "Space Mono"'),
      fonts.load('400 12px "Space Mono"'),
    ])
    if (fonts.ready) await fonts.ready
  } catch {
    /* ignore */
  }
}

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

  await registerSpaceMono(doc)

  // Background fill
  setFill(doc, COLORS.bg)
  doc.rect(0, 0, W, H, "F")

  const M = 24 // page margin in pt

  // Header strip
  setStroke(doc, COLORS.line)
  doc.setLineWidth(0.5)
  doc.line(M, M + 22, W - M, M + 22)

  // TC glyph + wordmark
  drawGlyph(doc, M, M + 4, 12, COLORS.ink)
  setText(doc, COLORS.ink)
  doc.setFont("SpaceMono", "bold")
  doc.setFontSize(8)
  doc.text("TECHNICALLY CREATIVE / DETROIT", M + 18, M + 14)

  setText(doc, COLORS.inkDim)
  doc.setFont("SpaceMono", "normal")
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
  drawKV(doc, M, wtY, "BASE WT", `${fmt.num(d.total_weight_kg, 0)} kg / ${fmt.int(d.total_weight_lb)} lb`, 170)
  drawKV(doc, M + 180, wtY, `INSTALLED WT / +${fmt.num(d.total_allowance_pct, 0)}%`, `${fmt.num(d.installed_weight_kg, 0)} kg / ${fmt.int(d.installed_weight_lb)} lb`, 180)
  drawKV(doc, M + 370, wtY, "WT / ROW", `${fmt.num(d.weight_per_row_kg, 0)} kg`, 80)
  drawKV(doc, M + 460, wtY, "WT / m²", `${fmt.num(d.weight_per_m2_kg, 0)} kg`, 80)
  drawKV(doc, M + 550, wtY, "PROCESSOR", `${d.processor_count_required} x ${d.processor_label}`, 200)

  const wtY2 = wtY + 28
  drawKV(doc, M, wtY2, "DAISY CHAIN", `${cab.daisy_chain_limit} cabs / line`, 160)
  drawKV(doc, M + 170, wtY2, "SIGNAL ENTRY", signalEntryLabel(cfg.signal_entry), 150)
  drawKV(doc, M + 330, wtY2, "IP FRONT/REAR", `${cab.ip_rating_front} / ${cab.ip_rating_rear}`, 140)
  drawKV(doc, M + 480, wtY2, "SERVICE", `${cab.service_access.toUpperCase()} / ${cab.service_depth_mm}mm`, 160)
  drawKV(doc, M + 650, wtY2, "SPARES", `${Math.max(1, Math.ceil(d.tiles_total * 0.05))} / 5%`, 110)

  if (cfg.notes) {
    const wtY3 = wtY2 + 28
    drawKV(doc, M, wtY3, "NOTES", cfg.notes, W - 2 * M)
  }

  // Disclaimer (dim, above footer divider — clinical, no highlight)
  setText(doc, COLORS.inkDim)
  doc.setFont("SpaceMono", "normal")
  doc.setFontSize(6.5)
  doc.text(DISCLAIMER, W / 2, H - M - 30, { align: "center" })

  // Footer
  setStroke(doc, COLORS.line)
  doc.line(M, H - M - 22, W - M, H - M - 22)
  setText(doc, COLORS.inkFaint)
  doc.setFont("SpaceMono", "normal")
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

  // Page 2 — cabinet layout map, so the spec + layout ship as one document.
  await addLayoutPage(doc, cab, cfg, W, H, M)

  return doc.output("blob") as Blob
}

/**
 * Second page of the spec PDF: the cabinet layout diagram, fit to the
 * same Letter-landscape page on the dark ground with a mirrored header /
 * footer. The layout is rendered once (shared canvas) and embedded.
 */
async function addLayoutPage(
  doc: any,
  cab: Cabinet,
  cfg: WallConfig,
  W: number,
  H: number,
  M: number
) {
  doc.addPage([W, H], "l")

  setFill(doc, COLORS.bg)
  doc.rect(0, 0, W, H, "F")

  // Header strip (mirrors page 1)
  setStroke(doc, COLORS.line)
  doc.setLineWidth(0.5)
  doc.line(M, M + 22, W - M, M + 22)
  drawGlyph(doc, M, M + 4, 12, COLORS.ink)
  setText(doc, COLORS.ink)
  doc.setFont("SpaceMono", "bold")
  doc.setFontSize(8)
  doc.text("TECHNICALLY CREATIVE / DETROIT", M + 18, M + 14)
  setText(doc, COLORS.inkDim)
  doc.setFont("SpaceMono", "normal")
  doc.setFontSize(8)
  doc.text(
    `LAYOUT MAP   ${cfg.project_code || "—"}   ${cab.manufacturer} ${cab.model}`,
    W - M,
    M + 14,
    { align: "right" }
  )

  // Layout image, fit within the page below header / above footer.
  const canvas = await renderPanelMapCanvas(cab, cfg)
  const dataUrl = canvas.toDataURL("image/png")
  const topY = M + 34
  const botY = H - M - 22
  const boxW = W - 2 * M
  const boxH = botY - topY
  const ar = canvas.width / canvas.height
  let drawW = boxW
  let drawH = drawW / ar
  if (drawH > boxH) {
    drawH = boxH
    drawW = drawH * ar
  }
  const ix = M + (boxW - drawW) / 2
  const iy = topY + (boxH - drawH) / 2
  doc.addImage(dataUrl, "PNG", ix, iy, drawW, drawH)

  // Footer (mirrors page 1)
  setStroke(doc, COLORS.line)
  doc.line(M, H - M - 22, W - M, H - M - 22)
  setText(doc, COLORS.inkFaint)
  doc.setFont("SpaceMono", "normal")
  doc.setFontSize(7)
  doc.text(
    `LAYOUT / ${cfg.tiles_wide}x${cfg.tiles_high} CABINETS / NUMBERED L-R T-B`,
    M,
    H - M - 8
  )
  doc.text("PAGE 2 / 2", W / 2, H - M - 8, { align: "center" })
  doc.text(
    `© ${new Date().getFullYear()} TECHNICALLY CREATIVE / DETROIT   CALC / 26-TCX-01-LEDTOOL`,
    W - M,
    H - M - 8,
    { align: "right" }
  )
}

function drawKV(doc: any, x: number, y: number, label: string, value: string, maxW: number) {
  setText(doc, COLORS.inkDim)
  doc.setFont("SpaceMono", "normal")
  doc.setFontSize(7)
  doc.text(label, x, y)
  setText(doc, COLORS.ink)
  doc.setFont("SpaceMono", "bold")
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
  doc.line(x + w, y, x + w, y + h)
  setText(doc, COLORS.inkDim)
  doc.setFont("SpaceMono", "normal")
  doc.setFontSize(7)
  doc.text(label, x + 6, y + 12)
  // Hero data values are white — accent is reserved for state, not data.
  setText(doc, COLORS.ink)
  doc.setFont("SpaceMono", "bold")
  doc.setFontSize(20)
  doc.text(big, x + 6, y + 40)
  setText(doc, COLORS.inkDim)
  doc.setFont("SpaceMono", "normal")
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

// ---------- panel map PNG ----------

/**
 * High-contrast functional panel map for content mapping in
 * Photoshop / After Effects. One cell per cabinet, numbered grid,
 * accent corners, TC glyph watermark. White-on-light so the
 * artifact imports cleanly over any underlying content.
 */
async function renderPanelMapCanvas(
  cab: Cabinet,
  cfg: WallConfig
): Promise<HTMLCanvasElement> {
  await ensureCanvasFonts()

  const cols = Math.max(1, cfg.tiles_wide)
  const rows = Math.max(1, cfg.tiles_high)

  // Honor real cabinet aspect.
  const tileAspect = cab.tile_width_mm / cab.tile_height_mm

  // Target ~100px per cabinet in the long dimension, capped at 6000px
  // total so AE / PS imports don't blow up.
  const MAX_LONG = 6000
  let cellH = 100
  let cellW = cellH * tileAspect
  const padHeader = 80
  const padFooter = 96 // room for footer info row + disclaimer row
  const padSide = 60
  const projectedW = cols * cellW + padSide * 2
  const projectedH = rows * cellH + padHeader + padFooter
  const scaleDown = Math.min(
    1,
    MAX_LONG / Math.max(projectedW, projectedH)
  )
  cellH = Math.floor(cellH * scaleDown)
  cellW = Math.floor(cellH * tileAspect)
  const padH = Math.floor(padHeader * scaleDown)
  const padF = Math.floor(padFooter * scaleDown)
  const padS = Math.floor(padSide * scaleDown)

  const W = cols * cellW + padS * 2
  const H = rows * cellH + padH + padF

  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  // Background: very light gray so corners and borders pop and the
  // artifact reads on any monitor / projector.
  const BG = "#f4f4f4"
  const TILE_A = "#ffffff"
  const TILE_B = "#e6e6e6"
  const BORDER = "#9a9a9a"
  const TEXT = "#111111"
  const DIM = "#555555"
  const ACCENT = COLORS.accent

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)

  // Header
  const headerBaseline = Math.max(22, Math.floor(padH * 0.55))
  ctx.fillStyle = TEXT
  ctx.font = `700 ${Math.max(14, Math.floor(padH * 0.32))}px "Space Mono", ui-monospace, monospace`
  ctx.textBaseline = "alphabetic"
  ctx.textAlign = "left"
  // Glyph
  drawCanvasGlyph(ctx, padS, headerBaseline - Math.floor(padH * 0.32), Math.floor(padH * 0.32), TEXT)
  ctx.fillText(
    "TECHNICALLY CREATIVE / DETROIT",
    padS + Math.floor(padH * 0.32) + 8,
    headerBaseline
  )
  ctx.font = `400 ${Math.max(11, Math.floor(padH * 0.22))}px "Space Mono", ui-monospace, monospace`
  ctx.fillStyle = DIM
  ctx.textAlign = "right"
  ctx.fillText(
    `PANEL MAP   ${cfg.project_code || "—"}   ${cab.manufacturer} ${cab.model}   ${cols}W × ${rows}H / ${cols * rows} CABS`,
    W - padS,
    headerBaseline
  )

  // Grid
  const gridX = padS
  const gridY = padH
  const gridW = cols * cellW
  const gridH = rows * cellH
  const pad = padWidth(cols * rows)
  const numberFontPx = Math.max(8, Math.floor(Math.min(cellW, cellH) * 0.32))

  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
  ctx.lineWidth = 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = gridX + c * cellW
      const y = gridY + r * cellH
      const isCorner =
        (r === 0 && c === 0) ||
        (r === 0 && c === cols - 1) ||
        (r === rows - 1 && c === 0) ||
        (r === rows - 1 && c === cols - 1)
      ctx.fillStyle = (r + c) % 2 === 0 ? TILE_A : TILE_B
      ctx.fillRect(x, y, cellW, cellH)
      ctx.strokeStyle = isCorner ? ACCENT : BORDER
      ctx.lineWidth = isCorner ? Math.max(2, Math.floor(cellH * 0.04)) : 1
      ctx.strokeRect(x + 0.5, y + 0.5, cellW - 1, cellH - 1)

      const num = String(r * cols + c + 1).padStart(pad, "0")
      ctx.fillStyle = isCorner ? ACCENT : TEXT
      ctx.font = `700 ${numberFontPx}px "Space Mono", ui-monospace, monospace`
      ctx.fillText(num, x + cellW / 2, y + cellH / 2 + 1)
    }
  }

  // Signal entry arrow (small accent triangle at the corner)
  drawSignalIn(ctx, cfg.signal_entry, gridX, gridY, gridW, gridH, ACCENT, cellW, cellH)

  // Watermark — TC glyph + wordmark in bottom-right corner of grid
  const wmSize = Math.min(120, Math.floor(gridH * 0.18))
  if (wmSize >= 28) {
    ctx.save()
    ctx.globalAlpha = 0.12
    drawCanvasGlyph(ctx, gridX + gridW - wmSize - 12, gridY + gridH - wmSize - 12, wmSize, TEXT)
    ctx.globalAlpha = 0.18
    ctx.fillStyle = TEXT
    ctx.font = `700 ${Math.floor(wmSize * 0.22)}px "Space Mono", ui-monospace, monospace`
    ctx.textAlign = "right"
    ctx.textBaseline = "alphabetic"
    ctx.fillText(
      "TECHNICALLY CREATIVE / DETROIT",
      gridX + gridW - 12,
      gridY + gridH - 14
    )
    ctx.restore()
  }

  // Footer — info row (upper) + disclaimer row (lower).
  ctx.textBaseline = "alphabetic"
  ctx.textAlign = "left"
  ctx.fillStyle = DIM
  ctx.font = `400 ${Math.max(11, Math.floor(padF * 0.18))}px "Space Mono", ui-monospace, monospace`
  const infoY = H - padF + Math.floor(padF * 0.42)
  ctx.fillText(`SIGNAL ENTRY / ${signalEntryLabel(cfg.signal_entry)}`, padS, infoY)
  ctx.fillText(
    `TILE / ${cab.tile_width_mm}×${cab.tile_height_mm} mm   PITCH / ${cab.pixel_pitch_mm.toFixed(2)} mm`,
    padS + Math.floor(W * 0.32),
    infoY
  )
  ctx.textAlign = "right"
  ctx.fillText(
    `${cols * rows} CABS / NUMBERED L→R, T→B / CALC 26-TCX-01-LEDTOOL`,
    W - padS,
    infoY
  )

  // Disclaimer band along the bottom edge — dim, clinical, no highlight.
  ctx.textAlign = "center"
  ctx.fillStyle = DIM
  ctx.font = `700 ${Math.max(10, Math.floor(padF * 0.16))}px "Space Mono", ui-monospace, monospace`
  ctx.fillText(DISCLAIMER, W / 2, H - Math.floor(padF * 0.18))

  return canvas
}

export async function renderPanelMapPng(
  cab: Cabinet,
  cfg: WallConfig
): Promise<Blob> {
  const canvas = await renderPanelMapCanvas(cab, cfg)
  return canvasToPng(canvas)
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("canvas.toBlob failed"))),
      "image/png"
    )
  })
}

// ---------- one-to-one pixel map PNG ----------

/**
 * True 1:1 pixel map. The canvas is the wall's exact pixel resolution
 * (cols·tile_width_px × rows·tile_height_px), full-bleed: each cabinet
 * fills its real pixel footprint as a high-contrast checker cell with its
 * number. Dropped on the wall as full-screen content, one image pixel maps
 * to one LED pixel. TC-branded near-black / softened-green checker.
 */
export async function renderPixelMapPng(
  cab: Cabinet,
  cfg: WallConfig
): Promise<Blob> {
  await ensureCanvasFonts()

  const cols = Math.max(1, cfg.tiles_wide)
  const rows = Math.max(1, cfg.tiles_high)
  const tileW = Math.max(1, Math.round(cab.tile_width_px))
  const tileH = Math.max(1, Math.round(cab.tile_height_px))
  const W = cols * tileW
  const H = rows * tileH

  // Browser canvas hard limit. Downscaling would break the 1:1 guarantee,
  // so refuse rather than silently produce a non-pixel-accurate map.
  const MAX_DIM = 16384
  if (W > MAX_DIM || H > MAX_DIM) {
    throw new Error(
      `pixel map ${W}×${H}px exceeds the ${MAX_DIM}px canvas limit — render on desktop or split the wall`
    )
  }

  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  const DARK = "#0c0c0c"
  // Softened, lower-luma green — not the raw brand accent (#00e58a) — so the
  // full-screen map doesn't bloom on camera or fatigue the eye during
  // commissioning. The site-wide brand accent is unchanged.
  const GREEN = "#16a86a"
  const NUM_ON_DARK = "#ffffff"
  const NUM_ON_GREEN = "#0a0a0a"

  const pad = padWidth(cols * rows)
  const fontPx = Math.max(
    8,
    Math.floor(Math.min(tileH * 0.34, (tileW * 0.82) / Math.max(1, pad * 0.6)))
  )

  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
  ctx.font = `700 ${fontPx}px "Space Mono", ui-monospace, monospace`

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * tileW
      const y = r * tileH
      const even = (r + c) % 2 === 0
      ctx.fillStyle = even ? DARK : GREEN
      ctx.fillRect(x, y, tileW, tileH)
      ctx.fillStyle = even ? NUM_ON_DARK : NUM_ON_GREEN
      ctx.fillText(
        String(r * cols + c + 1).padStart(pad, "0"),
        x + tileW / 2,
        y + tileH / 2 + 1
      )
    }
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("canvas.toBlob failed"))),
      "image/png"
    )
  })
}

function drawCanvasGlyph(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const cut = size * 0.375
  ctx.save()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + size, y)
  ctx.lineTo(x + size, y + size - cut)
  ctx.lineTo(x + size - cut, y + size)
  ctx.lineTo(x, y + size)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawSignalIn(
  ctx: CanvasRenderingContext2D,
  s: WallConfig["signal_entry"],
  gx: number,
  gy: number,
  gw: number,
  gh: number,
  color: string,
  cellW: number,
  cellH: number
) {
  // Small accent circle just outside the corner with a label.
  const r = Math.max(6, Math.floor(Math.min(cellW, cellH) * 0.18))
  const off = r + 4
  let cx = gx,
    cy = gy,
    tx = gx,
    ty = gy,
    align: CanvasTextAlign = "left"
  switch (s) {
    case "TL":
      cx = gx - off
      cy = gy - off
      tx = cx
      ty = cy - r - 4
      align = "left"
      break
    case "TR":
      cx = gx + gw + off
      cy = gy - off
      tx = cx
      ty = cy - r - 4
      align = "right"
      break
    case "BL":
      cx = gx - off
      cy = gy + gh + off
      tx = cx
      ty = cy + r + 12
      align = "left"
      break
    case "BR":
      cx = gx + gw + off
      cy = gy + gh + off
      tx = cx
      ty = cy + r + 12
      align = "right"
      break
  }
  ctx.save()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  ctx.font = `700 ${Math.max(10, r)}px "Space Mono", ui-monospace, monospace`
  ctx.textAlign = align
  ctx.textBaseline = "alphabetic"
  ctx.fillText("SIGNAL IN", tx, ty)
  ctx.restore()
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
