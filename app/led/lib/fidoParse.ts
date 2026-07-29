/**
 * FidoLED for iOS export PDF parser.
 * Extracts: cabinet name, tiles wide/high, power service.
 *
 * Runs entirely client-side via pdfjs-dist. The legacy worker is
 * configured at call time so this module can be statically imported
 * without breaking SSR.
 */

import type { PowerService } from "./types"

export type FidoParseResult =
  | {
      ok: true
      cabinetName: string
      tilesWide: number
      tilesHigh: number
      totalTiles: number
      powerService: PowerService
      rawText: string
    }
  | { ok: false; error: string; rawText?: string }

export async function parseFidoPdf(file: File): Promise<FidoParseResult> {
  if (typeof window === "undefined") {
    return { ok: false, error: "FidoLED parse must run client-side." }
  }
  try {
    const pdfjs = await import("pdfjs-dist")
    // Worker URL - Next bundles assets under chunk paths; the legacy
    // CDN-less path below uses Vite-style ?url import, which Webpack
    // also honors via static `new URL(...)`.
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString()
    }

    const buf = await file.arrayBuffer()
    const doc = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise
    const page = await doc.getPage(1)
    const content = await page.getTextContent()
    const items = (content.items as Array<{ str?: string }>)
      .map((it) => (typeof it.str === "string" ? it.str : ""))
      .filter(Boolean)
    const rawText = items.join("\n")

    // "Results for ROE Vanish V8T GOB"
    const m = rawText.match(/Results\s+for\s+(.+?)(?:\n|$)/i)
    if (!m) {
      return {
        ok: false,
        error: "Not a recognizable FidoLED export - missing 'Results for' header.",
        rawText,
      }
    }
    const cabinetName = m[1].trim()

    // FidoLED for iOS emits all field labels first, then all values.
    // The first two pure integers in document order are Tiles Wide and
    // Tiles High. Pixel counts and totals come later and are larger.
    const tileCounts = firstTwoTileIntegers(items)
    if (!tileCounts) {
      return {
        ok: false,
        error: "Could not extract Tiles Wide / Tiles High from PDF.",
        rawText,
      }
    }
    const [tilesWide, tilesHigh] = tileCounts

    const totalTiles = tilesWide * tilesHigh
    const powerService = guessPowerService(rawText)

    return {
      ok: true,
      cabinetName,
      tilesWide,
      tilesHigh,
      totalTiles,
      powerService,
      rawText,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? `PDF parse failed / ${e.message}` : "PDF parse failed.",
    }
  }
}

/**
 * FidoLED value-block heuristic: the first two items that parse as
 * plain integers ≤ 999 are Tiles Wide and Tiles High. Larger integers
 * (pixel counts, totals) appear later in the value block.
 */
function firstTwoTileIntegers(items: string[]): [number, number] | null {
  const found: number[] = []
  for (const raw of items) {
    const t = raw.trim()
    // Skip values that carry units (e.g. "44,000 mm") or are
    // comma-formatted big numbers (e.g. "7,727,104").
    if (t.includes(",") || /[^\d]/.test(t)) continue
    const n = parseInt(t, 10)
    if (Number.isNaN(n)) continue
    if (n < 1 || n > 999) continue
    found.push(n)
    if (found.length === 2) break
  }
  if (found.length < 2) return null
  return [found[0], found[1]]
}

function guessPowerService(raw: string): PowerService {
  const m = raw.match(/3\s*[ØoO]?\s*(\d{3})\s*v/i)
  if (m) {
    const v = parseInt(m[1], 10)
    if (v >= 460) return "480V-3PH"
    if (v >= 380) return "400V-3PH"
  }
  return "208V-3PH"
}

/**
 * Fuzzy-match a cabinet name from FidoLED against the library.
 * Returns the matched cabinet id, or null.
 *
 * Strategy:
 *   1. Exact normalized match on `${mfr} ${model}` or `${model}`.
 *   2. Substring containment either direction - FidoLED often
 *      omits the disambiguating part of the manufacturer name
 *      (e.g. "ROE Vanish V8T GOB" vs library "ROE Visual Vanish
 *      V8T GOB"). The library's normalized model alone should
 *      land inside the target string.
 *   3. Longest shared suffix of model - covers the case where
 *      FidoLED labels a panel by its model line only.
 */
export function fuzzyMatchCabinet(
  name: string,
  library: Array<{ id: string; manufacturer: string; model: string }>
): string | null {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
  const target = norm(name)
  if (!target) return null

  // 1. Exact normalized match
  for (const c of library) {
    if (norm(`${c.manufacturer} ${c.model}`) === target) return c.id
    if (norm(c.model) === target) return c.id
  }

  // 2. Substring containment - pick the longest-model match so a
  // longer model name beats a shorter one that's also a substring.
  let bestContains: { id: string; score: number } | null = null
  for (const c of library) {
    const m = norm(c.model)
    if (m.length < 4) continue
    if (target.includes(m) || m.includes(target)) {
      if (!bestContains || m.length > bestContains.score) {
        bestContains = { id: c.id, score: m.length }
      }
    }
  }
  if (bestContains) return bestContains.id

  // 3. Token-overlap fallback (e.g. "Black Pearl 2" vs "Black Pearl
  // BP2 V2") - count distinct alpha-numeric tokens shared.
  const tokens = (s: string) =>
    s.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 2)
  const tTok = new Set(tokens(name))
  let bestOverlap: { id: string; score: number } | null = null
  for (const c of library) {
    const cTok = tokens(`${c.manufacturer} ${c.model}`)
    let shared = 0
    for (const t of cTok) if (tTok.has(t)) shared++
    if (!bestOverlap || shared > bestOverlap.score) {
      bestOverlap = { id: c.id, score: shared }
    }
  }
  if (bestOverlap && bestOverlap.score >= 2) return bestOverlap.id
  return null
}
