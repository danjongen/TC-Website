import { NextRequest, NextResponse } from "next/server"

/**
 * Password gate for the LED tool builder at `/led`.
 *
 * Public:    /led/share/[token]  — client/crew-facing share pages stay open
 *            /led/unlock         — the unlock form itself
 * Gated:     /led, /led/anything else
 *
 * Password lives in env `LED_TOOL_PASSWORD` (set in Vercel project
 * settings). Defaults to "tc-detroit" if unset so the tool works
 * out of the box in preview; override in production.
 *
 * The session cookie is signed with a per-deployment secret derived
 * from the password so rotating the password invalidates old cookies.
 */

const COOKIE_NAME = "led_auth"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export const config = {
  matcher: ["/led", "/led/:path*"],
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Open routes inside /led:
  // - the unlock page
  // - any /led/share/* and /led/s/* (client-facing artifacts)
  // - any /led/api/* (handles its own auth via the same cookie)
  if (
    pathname === "/led/unlock" ||
    pathname.startsWith("/led/share") ||
    pathname.startsWith("/led/s/") ||
    pathname.startsWith("/led/api")
  ) {
    return NextResponse.next()
  }

  const password = process.env.LED_TOOL_PASSWORD || "tc-detroit"
  const expected = await tokenFor(password)
  const cookie = req.cookies.get(COOKIE_NAME)?.value

  if (cookie === expected) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = "/led/unlock"
  url.searchParams.set("from", pathname + (req.nextUrl.search || ""))
  return NextResponse.redirect(url)
}

async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode(`led-tool:${password}`)
  const buf = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export { COOKIE_NAME, COOKIE_MAX_AGE }
