import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { listCabinetRecords } from "../../../lib/cabinetDb"
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
