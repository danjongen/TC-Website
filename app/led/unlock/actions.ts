"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const COOKIE_NAME = "led_auth"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function unlock(formData: FormData) {
  const password = String(formData.get("password") || "")
  const from = String(formData.get("from") || "/led")
  const expected = process.env.LED_TOOL_PASSWORD || "tc-detroit"

  if (password !== expected) {
    redirect(`/led/unlock?error=1&from=${encodeURIComponent(from)}`)
  }

  const token = await tokenFor(expected)
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  })

  redirect(from.startsWith("/led") ? from : "/led")
}

async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode(`led-tool:${password}`)
  const buf = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}
