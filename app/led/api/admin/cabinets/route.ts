import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createCabinet, listCabinetRecords } from "../../../lib/cabinetDb"
import { validateCabinet } from "../../../lib/validateCabinet"

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

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  try {
    const records = await listCabinetRecords()
    const rows = records.map((r) => ({
      recordId: r.recordId,
      id: r.cabinet.id,
      manufacturer: r.cabinet.manufacturer,
      model: r.cabinet.model,
      confidence: r.confidence,
      published: r.published,
      source_url: r.source_url,
      validation: validateCabinet(r.cabinet),
    }))
    return NextResponse.json({ rows })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// Create a draft cabinet (from a reviewed ingest). Always unpublished -
// confidence is capped at "datasheet"; only a human flips to verified +
// published in Airtable.
export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  let body: {
    fields?: Record<string, string | number | boolean | null>
    confidence?: "datasheet" | "estimated"
    source_url?: string | null
    notes?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }
  if (!body.fields || !body.fields.id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 })
  }
  try {
    const result = await createCabinet({
      fields: body.fields,
      confidence: body.confidence === "datasheet" ? "datasheet" : "estimated",
      published: false,
      source_url: body.source_url ?? null,
      notes: body.notes,
    })
    return NextResponse.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
