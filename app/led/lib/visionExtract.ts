/**
 * Datasheet vision extraction — gates 1 and 2 of "triple validation".
 *
 *  Gate 1 (extract):    Gemini reads the datasheet → structured cabinet fields.
 *  Gate 2 (cross-check): Claude reads the same datasheet independently →
 *                        structured fields. We compare the two; disagreements
 *                        are surfaced, never silently averaged.
 *  Gate 3 (physics):     validateCabinet() runs downstream (see route).
 *
 * Two different model families is the point — agreement between them is a far
 * stronger signal than one model run twice. Server-only.
 *
 * Env:
 *   GOOGLE_API_KEY     — Gemini (gate 1)
 *   ANTHROPIC_API_KEY  — Claude (gate 2)
 *   GEMINI_MODEL       — default "gemini-2.5-pro"
 *   ANTHROPIC_MODEL    — default "claude-opus-4-7"
 */

import Anthropic from "@anthropic-ai/sdk"

// Fields a datasheet realistically provides. Everything is nullable —
// a model must return null rather than guess.
export type ExtractedCabinet = {
  manufacturer: string | null
  model: string | null
  pixel_pitch_mm: number | null
  tile_width_mm: number | null
  tile_height_mm: number | null
  tile_width_px: number | null
  tile_height_px: number | null
  tile_weight_kg: number | null
  max_power_w: number | null
  avg_power_w: number | null
  brightness_nits: number | null
  refresh_hz: number | null
  bit_depth: number | null
  color_space: string | null
  scan_ratio: string | null
  viewing_angle_h: number | null
  viewing_angle_v: number | null
  ip_rating_front: string | null
  ip_rating_rear: string | null
  service_access: "front" | "rear" | "both" | null
  service_depth_mm: number | null
  daisy_chain_limit: number | null
  power_factor: number | null
}

const NUMERIC_FIELDS: (keyof ExtractedCabinet)[] = [
  "pixel_pitch_mm",
  "tile_width_mm",
  "tile_height_mm",
  "tile_width_px",
  "tile_height_px",
  "tile_weight_kg",
  "max_power_w",
  "avg_power_w",
  "brightness_nits",
  "refresh_hz",
  "bit_depth",
  "viewing_angle_h",
  "viewing_angle_v",
  "service_depth_mm",
  "daisy_chain_limit",
  "power_factor",
]

const STRING_FIELDS: (keyof ExtractedCabinet)[] = [
  "manufacturer",
  "model",
  "color_space",
  "scan_ratio",
  "ip_rating_front",
  "ip_rating_rear",
  "service_access",
]

const PROMPT = `You are reading a manufacturer datasheet for a single LED video wall cabinet (panel/tile).
Extract ONLY values explicitly stated in the document. If a value is not present or you are unsure, return null for that field — never guess or infer.

Field notes:
- pixel_pitch_mm: the pixel pitch in millimetres (the nominal/marketed value is fine).
- tile_width_mm / tile_height_mm: physical cabinet dimensions in millimetres.
- tile_width_px / tile_height_px: the cabinet's pixel resolution (module/panel resolution).
- tile_weight_kg: per-cabinet weight in kilograms.
- max_power_w / avg_power_w: per-cabinet max and average power draw in watts.
- brightness_nits: peak brightness in nits (cd/m²).
- refresh_hz: refresh rate in Hz. bit_depth in bits.
- scan_ratio: e.g. "1/13". color_space: e.g. "Rec.709".
- ip_rating_front / ip_rating_rear: e.g. "IP65". If only one IP rating is given, use it for both.
- service_access: "front", "rear", or "both".
- power_factor: 0-1 if stated; else null.
Return strictly the JSON object matching the schema. No commentary.`

// JSON schema shared by both providers (Gemini responseSchema / Claude tool).
const SCHEMA_PROPS: Record<string, { type: string; nullable?: boolean; enum?: string[] }> = {
  manufacturer: { type: "string", nullable: true },
  model: { type: "string", nullable: true },
  pixel_pitch_mm: { type: "number", nullable: true },
  tile_width_mm: { type: "number", nullable: true },
  tile_height_mm: { type: "number", nullable: true },
  tile_width_px: { type: "number", nullable: true },
  tile_height_px: { type: "number", nullable: true },
  tile_weight_kg: { type: "number", nullable: true },
  max_power_w: { type: "number", nullable: true },
  avg_power_w: { type: "number", nullable: true },
  brightness_nits: { type: "number", nullable: true },
  refresh_hz: { type: "number", nullable: true },
  bit_depth: { type: "number", nullable: true },
  color_space: { type: "string", nullable: true },
  scan_ratio: { type: "string", nullable: true },
  viewing_angle_h: { type: "number", nullable: true },
  viewing_angle_v: { type: "number", nullable: true },
  ip_rating_front: { type: "string", nullable: true },
  ip_rating_rear: { type: "string", nullable: true },
  service_access: { type: "string", nullable: true, enum: ["front", "rear", "both"] },
  service_depth_mm: { type: "number", nullable: true },
  daisy_chain_limit: { type: "number", nullable: true },
  power_factor: { type: "number", nullable: true },
}

function emptyExtract(): ExtractedCabinet {
  const o = {} as Record<string, unknown>
  for (const k of Object.keys(SCHEMA_PROPS)) o[k] = null
  return o as ExtractedCabinet
}

function coerce(raw: Record<string, unknown>): ExtractedCabinet {
  const out = emptyExtract()
  for (const k of Object.keys(SCHEMA_PROPS) as (keyof ExtractedCabinet)[]) {
    const v = raw[k]
    if (v === null || v === undefined || v === "") continue
    if (NUMERIC_FIELDS.includes(k)) {
      const n = typeof v === "number" ? v : parseFloat(String(v))
      ;(out[k] as number | null) = Number.isFinite(n) ? n : null
    } else {
      ;(out[k] as string | null) = String(v)
    }
  }
  return out
}

// ---------- Gemini (gate 1) ----------

export async function extractWithGemini(
  base64: string,
  mimeType: string
): Promise<ExtractedCabinet> {
  const key = process.env.GOOGLE_API_KEY
  if (!key) throw new Error("GOOGLE_API_KEY is not set")
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-pro"

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inline_data: { mime_type: mimeType, data: base64 } },
              { text: PROMPT },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: Object.fromEntries(
              Object.entries(SCHEMA_PROPS).map(([k, v]) => [
                k,
                v.enum
                  ? { type: "string", nullable: true }
                  : { type: v.type.toUpperCase(), nullable: true },
              ])
            ),
          },
        },
      }),
    }
  )
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
  return coerce(JSON.parse(text))
}

// ---------- Claude (gate 2) ----------

export async function extractWithClaude(
  base64: string,
  mimeType: string
): Promise<ExtractedCabinet> {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set")
  const client = new Anthropic()
  const model = process.env.ANTHROPIC_MODEL || "claude-opus-4-7"

  const isPdf = mimeType === "application/pdf"
  const docBlock = isPdf
    ? { type: "document" as const, source: { type: "base64" as const, media_type: "application/pdf" as const, data: base64 } }
    : { type: "image" as const, source: { type: "base64" as const, media_type: mimeType as "image/png" | "image/jpeg", data: base64 } }

  const response = await client.messages.create({
    model,
    max_tokens: 2048,
    tools: [
      {
        name: "record_cabinet_spec",
        description: "Record the extracted LED cabinet specifications.",
        input_schema: {
          type: "object",
          properties: Object.fromEntries(
            Object.entries(SCHEMA_PROPS).map(([k, v]) => [
              k,
              v.enum ? { type: ["string", "null"], enum: [...v.enum, null] } : { type: [v.type, "null"] },
            ])
          ),
          required: Object.keys(SCHEMA_PROPS),
          additionalProperties: false,
        },
      },
    ],
    tool_choice: { type: "tool", name: "record_cabinet_spec" },
    messages: [{ role: "user", content: [docBlock, { type: "text", text: PROMPT }] }],
  })

  const toolUse = response.content.find((b) => b.type === "tool_use")
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Claude returned no structured extraction")
  }
  return coerce(toolUse.input as Record<string, unknown>)
}

// ---------- cross-check (gate 2 comparison) ----------

export type FieldComparison = {
  field: keyof ExtractedCabinet
  gemini: string | number | null
  claude: string | number | null
  agree: boolean
}

export type CrossCheckResult = {
  merged: ExtractedCabinet
  comparisons: FieldComparison[]
  agreementCount: number
  disagreementCount: number
}

export function crossCheck(
  gemini: ExtractedCabinet,
  claude: ExtractedCabinet
): CrossCheckResult {
  const merged = emptyExtract()
  const comparisons: FieldComparison[] = []
  let agree = 0
  let disagree = 0

  for (const k of Object.keys(SCHEMA_PROPS) as (keyof ExtractedCabinet)[]) {
    const g = gemini[k]
    const c = claude[k]
    let isAgree: boolean

    if (g === null && c === null) {
      isAgree = true
    } else if (g === null || c === null) {
      isAgree = false
    } else if (NUMERIC_FIELDS.includes(k)) {
      const gn = Number(g)
      const cn = Number(c)
      // Within 2% (or both ~0) counts as agreement.
      const denom = Math.max(Math.abs(gn), Math.abs(cn), 1e-9)
      isAgree = Math.abs(gn - cn) / denom <= 0.02
    } else {
      isAgree = String(g).trim().toLowerCase() === String(c).trim().toLowerCase()
    }

    // Merge: prefer the agreed value (Gemini as primary); on disagreement
    // keep Gemini's but flag it; if only one is non-null, take it.
    let chosen: string | number | null
    if (g !== null && c !== null) chosen = g
    else chosen = (g ?? c) as string | number | null
    ;(merged[k] as string | number | null) = chosen

    comparisons.push({ field: k, gemini: g as never, claude: c as never, agree: isAgree })
    if (isAgree) agree++
    else disagree++
  }

  return { merged, comparisons, agreementCount: agree, disagreementCount: disagree }
}

export { NUMERIC_FIELDS, STRING_FIELDS, SCHEMA_PROPS }
