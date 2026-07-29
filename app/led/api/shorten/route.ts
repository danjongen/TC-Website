import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { mintShortLink } from "../../lib/shortlink"

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

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  let token: string
  try {
    const body = (await req.json()) as { token?: string }
    token = String(body.token || "")
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }
  if (!token) return NextResponse.json({ error: "missing token" }, { status: 400 })

  const id = await mintShortLink(token)
  if (!id) {
    // Redis unavailable - signal the client to fall back to the long URL.
    return NextResponse.json({ id: null })
  }
  return NextResponse.json({ id })
}
