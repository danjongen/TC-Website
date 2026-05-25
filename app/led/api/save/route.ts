import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { saveDocument, type SaveDocumentInput } from "../../lib/airtable"

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
// Allow larger payloads — spec PDF + map PNG can each be a few hundred KB.
export const maxDuration = 60

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  let body: SaveDocumentInput
  try {
    body = (await req.json()) as SaveDocumentInput
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }
  if (!body.projectCode || !body.specPdfBase64 || !body.mapPngBase64) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 })
  }
  try {
    const result = await saveDocument(body)
    return NextResponse.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
