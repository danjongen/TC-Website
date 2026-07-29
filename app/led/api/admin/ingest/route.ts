import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  crossCheck,
  extractWithClaude,
  extractWithGemini,
  type ExtractedCabinet,
} from "../../../lib/visionExtract"
import { validateCabinet } from "../../../lib/validateCabinet"
import type { Cabinet } from "../../../lib/types"

const COOKIE_NAME = "led_auth"

async function isAuthed(): Promise<boolean> {
  const jar = await cookies()
  const cookie = jar.get(COOKIE_NAME)?.value
  if (!cookie) return false
  const password = process.env.LED_TOOL_PASSWORD || "tc-detroit"
  const expected = await tokenFor(password)
  return cookie === expected
}

async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode(`led-tool:${password}`)
  const buf = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export const dynamic = "force-dynamic"
export const maxDuration = 120

function slugify(manufacturer: string | null, model: string | null): string {
  return `${manufacturer ?? ""}-${model ?? ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Extracted fields → a Cabinet-shaped object for the physics validator.
function toCabinetShape(e: ExtractedCabinet, id: string): Partial<Cabinet> {
  return {
    id,
    manufacturer: e.manufacturer ?? undefined,
    model: e.model ?? undefined,
    pixel_pitch_mm: e.pixel_pitch_mm ?? undefined,
    tile_width_mm: e.tile_width_mm ?? undefined,
    tile_height_mm: e.tile_height_mm ?? undefined,
    tile_width_px: e.tile_width_px ?? undefined,
    tile_height_px: e.tile_height_px ?? undefined,
    tile_weight_kg: e.tile_weight_kg ?? undefined,
    max_power_w: e.max_power_w ?? undefined,
    avg_power_w: e.avg_power_w ?? undefined,
    brightness_nits: e.brightness_nits ?? undefined,
    refresh_hz: e.refresh_hz ?? undefined,
    bit_depth: e.bit_depth ?? undefined,
    color_space: e.color_space ?? undefined,
    scan_ratio: e.scan_ratio ?? undefined,
    ip_rating_front: e.ip_rating_front ?? undefined,
    ip_rating_rear: e.ip_rating_rear ?? undefined,
    service_access: e.service_access ?? undefined,
    service_depth_mm: e.service_depth_mm ?? undefined,
    daisy_chain_limit: e.daisy_chain_limit ?? undefined,
    power_factor: e.power_factor ?? undefined,
  } as Partial<Cabinet>
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  let body: { fileBase64?: string; mimeType?: string }
  try {
    body = (await req.json()) as { fileBase64?: string; mimeType?: string }
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }
  const { fileBase64, mimeType } = body
  if (!fileBase64 || !mimeType) {
    return NextResponse.json({ error: "missing file" }, { status: 400 })
  }

  // Run both extractions independently. A failure in one is reported but
  // doesn't kill the other - partial cross-check is still useful.
  const [gRes, cRes] = await Promise.allSettled([
    extractWithGemini(fileBase64, mimeType),
    extractWithClaude(fileBase64, mimeType),
  ])

  const errors: string[] = []
  if (gRes.status === "rejected") errors.push(`Gemini: ${String(gRes.reason).slice(0, 200)}`)
  if (cRes.status === "rejected") errors.push(`Claude: ${String(cRes.reason).slice(0, 200)}`)

  // If both failed, nothing to show.
  if (gRes.status === "rejected" && cRes.status === "rejected") {
    return NextResponse.json({ error: errors.join(" / ") }, { status: 502 })
  }

  const empty = (): ExtractedCabinet =>
    Object.fromEntries(
      Object.keys((gRes.status === "fulfilled" ? gRes.value : cRes.status === "fulfilled" ? cRes.value : {})).map(
        (k) => [k, null]
      )
    ) as ExtractedCabinet

  const gemini = gRes.status === "fulfilled" ? gRes.value : empty()
  const claude = cRes.status === "fulfilled" ? cRes.value : empty()

  const cc = crossCheck(gemini, claude)
  const id = slugify(cc.merged.manufacturer, cc.merged.model)
  const validation = validateCabinet(toCabinetShape(cc.merged, id))

  // Confidence: only "datasheet" when both models ran, fully agreed, and
  // physics passed. Otherwise "estimated". Never auto-publish.
  const bothRan = gRes.status === "fulfilled" && cRes.status === "fulfilled"
  const confidence =
    bothRan && cc.disagreementCount === 0 && validation.ok ? "datasheet" : "estimated"

  return NextResponse.json({
    id,
    merged: cc.merged,
    comparisons: cc.comparisons,
    agreementCount: cc.agreementCount,
    disagreementCount: cc.disagreementCount,
    validation,
    confidence,
    bothRan,
    errors,
  })
}
