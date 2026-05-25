/**
 * Reads the cabinet library from the "LED Cabinet DB" Airtable base.
 * Server-only. The deployed app needs a PAT with read access to that
 * base — AIRTABLE_CABINETS_PAT if set, else falls back to AIRTABLE_PAT.
 *
 * Env:
 *   AIRTABLE_CABINETS_PAT      — optional, PAT scoped to the cabinet base
 *   AIRTABLE_PAT               — fallback PAT
 *   AIRTABLE_CABINETS_BASE_ID  — default: appDjrhujOaKBBULu
 *   AIRTABLE_CABINETS_TABLE_ID — default: tblUCaJotJ8i6NvFJ
 */

import type { Cabinet } from "./types"

const API_BASE = "https://api.airtable.com/v0"

export const CABINET_DB = {
  baseId: process.env.AIRTABLE_CABINETS_BASE_ID || "appDjrhujOaKBBULu",
  tableId: process.env.AIRTABLE_CABINETS_TABLE_ID || "tblUCaJotJ8i6NvFJ",
}

function pat(): string {
  const t = process.env.AIRTABLE_CABINETS_PAT || process.env.AIRTABLE_PAT
  if (!t) throw new Error("AIRTABLE_CABINETS_PAT / AIRTABLE_PAT is not set")
  return t
}

export type CabinetRecord = {
  recordId: string
  cabinet: Cabinet
  confidence: "verified" | "datasheet" | "estimated" | null
  published: boolean
  source_url: string | null
}

const F = {
  id: "fldQpw419whcw7MfS",
  manufacturer: "fldpRV5o7JYS6joWw",
  model: "fldsdcKy6C8EaJM63",
  pixel_pitch_mm: "fldul34mZ8rbY6JSA",
  tile_width_mm: "fld80MTiEI1fGLW0Q",
  tile_height_mm: "fldTRxvFCk6tzEJXR",
  tile_width_px: "fldVOeZPuYdn4S3Pf",
  tile_height_px: "fldC12ZJbd3QgUJsI",
  tile_weight_kg: "fldGy0mMUEDPn29xM",
  max_power_w: "fldmZrHQ9lEdFlAtq",
  avg_power_w: "fldmGJ7Gz9FpHRh5y",
  brightness_nits: "fldTpcpXkEQ1sbksS",
  refresh_hz: "fldZBAuuvfmO2yES7",
  bit_depth: "fldqh5wqdPCfsyFes",
  color_space: "fldyL6Nl0inOduYvF",
  scan_ratio: "fldp6Lg6FeDe6lAVA",
  viewing_angle_h: "fldm1DqAASODGiDfQ",
  viewing_angle_v: "flddAfo6SyTlrV5kv",
  ip_rating_front: "fldTLZixcthn7riVV",
  ip_rating_rear: "fldDU0FwuHDFmxHI2",
  service_access: "fldaQpkQfLb5LOYeM",
  service_depth_mm: "fldfr2ET44s4ZL8FT",
  touring_rated: "flduFtzKOMlzyH53u",
  curvature_concave_deg: "flduaJowHiAzpfilO",
  curvature_convex_deg: "fld84CWrC2HzSDfOF",
  processor_compatibility: "fldKKb3e8dnoaemhx",
  daisy_chain_limit: "fld6jF0wXnP66ihxJ",
  power_factor: "fldP5QQiQB4T5PEqZ",
  confidence: "fldKHbXga5AlUgJvc",
  source_url: "fldNp5eeVL8Qih29f",
  published: "fldU7Ebceo31HIDXy",
  notes: "fldToUgAwm8rTHTxj",
} as const

function n(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) ? v : 0
}
function s(v: unknown): string {
  return typeof v === "string" ? v : ""
}

function toCabinet(fields: Record<string, unknown>): Cabinet {
  const procRaw = s(fields[F.processor_compatibility])
  return {
    id: s(fields[F.id]),
    manufacturer: s(fields[F.manufacturer]),
    model: s(fields[F.model]),
    pixel_pitch_mm: n(fields[F.pixel_pitch_mm]),
    tile_width_mm: n(fields[F.tile_width_mm]),
    tile_height_mm: n(fields[F.tile_height_mm]),
    tile_width_px: n(fields[F.tile_width_px]),
    tile_height_px: n(fields[F.tile_height_px]),
    tile_weight_kg: n(fields[F.tile_weight_kg]),
    max_power_w: n(fields[F.max_power_w]),
    avg_power_w: n(fields[F.avg_power_w]),
    brightness_nits: n(fields[F.brightness_nits]),
    refresh_hz: n(fields[F.refresh_hz]),
    bit_depth: n(fields[F.bit_depth]),
    color_space: s(fields[F.color_space]),
    scan_ratio: s(fields[F.scan_ratio]),
    viewing_angle_h: n(fields[F.viewing_angle_h]),
    viewing_angle_v: n(fields[F.viewing_angle_v]),
    ip_rating_front: s(fields[F.ip_rating_front]),
    ip_rating_rear: s(fields[F.ip_rating_rear]),
    service_access: (s(fields[F.service_access]) || "front") as Cabinet["service_access"],
    service_depth_mm: n(fields[F.service_depth_mm]),
    touring_rated: fields[F.touring_rated] === true,
    curvature_concave_deg: n(fields[F.curvature_concave_deg]),
    curvature_convex_deg: n(fields[F.curvature_convex_deg]),
    processor_compatibility: procRaw
      ? procRaw.split(",").map((x) => x.trim()).filter(Boolean)
      : [],
    daisy_chain_limit: n(fields[F.daisy_chain_limit]),
    power_factor: n(fields[F.power_factor]) || 1,
    notes: s(fields[F.notes]) || undefined,
  }
}

export type NewCabinetInput = {
  fields: Partial<Record<string, string | number | boolean | null>> // keyed by our field names
  confidence: "verified" | "datasheet" | "estimated"
  published: boolean
  source_url?: string | null
  notes?: string
}

// Maps our friendly field names → Airtable field IDs for writes.
const NAME_TO_FIELD: Record<string, string> = {
  id: F.id,
  manufacturer: F.manufacturer,
  model: F.model,
  pixel_pitch_mm: F.pixel_pitch_mm,
  tile_width_mm: F.tile_width_mm,
  tile_height_mm: F.tile_height_mm,
  tile_width_px: F.tile_width_px,
  tile_height_px: F.tile_height_px,
  tile_weight_kg: F.tile_weight_kg,
  max_power_w: F.max_power_w,
  avg_power_w: F.avg_power_w,
  brightness_nits: F.brightness_nits,
  refresh_hz: F.refresh_hz,
  bit_depth: F.bit_depth,
  color_space: F.color_space,
  scan_ratio: F.scan_ratio,
  viewing_angle_h: F.viewing_angle_h,
  viewing_angle_v: F.viewing_angle_v,
  ip_rating_front: F.ip_rating_front,
  ip_rating_rear: F.ip_rating_rear,
  service_access: F.service_access,
  service_depth_mm: F.service_depth_mm,
  daisy_chain_limit: F.daisy_chain_limit,
  power_factor: F.power_factor,
}

/**
 * Create a draft cabinet record in LED Cabinet DB. Always unpublished
 * unless explicitly told otherwise — ingest drafts await human review.
 */
export async function createCabinet(
  input: NewCabinetInput
): Promise<{ recordId: string; recordUrl: string }> {
  const fields: Record<string, unknown> = {}
  for (const [name, fid] of Object.entries(NAME_TO_FIELD)) {
    const v = input.fields[name]
    if (v !== undefined && v !== null && v !== "") fields[fid] = v
  }
  fields[F.confidence] = input.confidence
  fields[F.published] = input.published
  if (input.source_url) fields[F.source_url] = input.source_url
  if (input.notes) fields[F.notes] = input.notes

  const res = await fetch(`${API_BASE}/${CABINET_DB.baseId}/${CABINET_DB.tableId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${pat()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  })
  if (!res.ok) throw new Error(`Airtable create cabinet ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as { records: Array<{ id: string }> }
  const recordId = data.records[0]?.id
  if (!recordId) throw new Error("Airtable create returned no record id")
  return {
    recordId,
    recordUrl: `https://airtable.com/${CABINET_DB.baseId}/${CABINET_DB.tableId}/${recordId}`,
  }
}

export async function listCabinetRecords(): Promise<CabinetRecord[]> {
  const url = new URL(`${API_BASE}/${CABINET_DB.baseId}/${CABINET_DB.tableId}`)
  url.searchParams.set("pageSize", "100")
  url.searchParams.set("returnFieldsByFieldId", "true")

  const out: CabinetRecord[] = []
  let offset: string | undefined
  do {
    if (offset) url.searchParams.set("offset", offset)
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${pat()}` },
      cache: "no-store",
    })
    if (!res.ok) throw new Error(`Airtable cabinet read ${res.status}: ${await res.text()}`)
    const data = (await res.json()) as {
      records: Array<{ id: string; fields: Record<string, unknown> }>
      offset?: string
    }
    for (const r of data.records) {
      out.push({
        recordId: r.id,
        cabinet: toCabinet(r.fields),
        confidence: (s(r.fields[F.confidence]) || null) as CabinetRecord["confidence"],
        published: r.fields[F.published] === true,
        source_url: s(r.fields[F.source_url]) || null,
      })
    }
    offset = data.offset
  } while (offset)
  return out
}
