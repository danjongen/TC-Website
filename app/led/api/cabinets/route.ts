import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getPublishedCabinetsCached } from "../../lib/cabinetDb"

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

// Published cabinet library for the builder. Gated to the same cookie as the
// builder itself; the client falls back to the built-in list on any error.
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  try {
    const cabinets = await getPublishedCabinetsCached()
    return NextResponse.json({ cabinets })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
