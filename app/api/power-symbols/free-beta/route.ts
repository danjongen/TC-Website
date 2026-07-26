import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { Resend } from "resend"

import { rateLimitPowerSymbolsFreeBeta } from "@/lib/rate-limit"
import { createPowerSymbolsComplimentarySerial } from "@/lib/power-symbols-license"
import { verifyTurnstileToken } from "@/lib/turnstile"

export const runtime = "nodejs"

type FreeBetaRequest = {
  name?: unknown
  email?: unknown
  vectorworksVersion?: unknown
  macosVersion?: unknown
  feedbackPromise?: unknown
  companyWebsite?: unknown
  elapsedMs?: unknown
  turnstileToken?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const supportedVectorworksVersions = new Set(["2023", "2024", "2025", "2026"])

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  )
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > 16_384) {
    return jsonError("That request is too large.", 413)
  }

  let body: FreeBetaRequest
  try {
    body = (await request.json()) as FreeBetaRequest
  } catch {
    return jsonError("That request could not be read.", 400)
  }

  const name = String(body.name || "").trim()
  const email = String(body.email || "").trim().toLowerCase()
  const vectorworksVersion = String(body.vectorworksVersion || "").trim()
  const macosVersion = String(body.macosVersion || "").trim()
  const honeypot = String(body.companyWebsite || "").trim()
  const elapsedMs = Number(body.elapsedMs || 0)
  const turnstileToken = String(body.turnstileToken || "").trim()

  // Quietly absorb obvious automated submissions without issuing a licence.
  if (honeypot || !elapsedMs || elapsedMs < 2_500) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return NextResponse.json(
      { delivered: true },
      { headers: { "Cache-Control": "no-store" } },
    )
  }

  if (name.length < 2 || name.length > 80) {
    return jsonError("Enter your name (2–80 characters).", 422)
  }
  if (!emailPattern.test(email) || email.length > 254) {
    return jsonError("Enter a valid email address.", 422)
  }
  if (!supportedVectorworksVersions.has(vectorworksVersion)) {
    return jsonError("Choose your Vectorworks version.", 422)
  }
  if (macosVersion.length > 80) {
    return jsonError("Keep the macOS version under 80 characters.", 422)
  }
  if (body.feedbackPromise !== true) {
    return jsonError("Please agree to send useful beta feedback.", 422)
  }

  const { allowed, result } = await rateLimitPowerSymbolsFreeBeta(email)
  if (!allowed) {
    const minutes = Math.max(
      1,
      Math.ceil((result.reset * 1_000 - Date.now()) / 60_000),
    )
    return jsonError(
      `That is enough sympathy serials for now. Try again in ${minutes} minutes.`,
      429,
    )
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const verification = await verifyTurnstileToken(turnstileToken)
    if (!verification.success) {
      return jsonError(
        "Verification failed. Refresh the page and try again.",
        403,
      )
    }
  }

  try {
    const serial = createPowerSymbolsComplimentarySerial(email)
    const download = new URL(
      "/api/power-symbols/download",
      "https://www.tc.agency",
    )
    download.searchParams.set("serial", serial)
    const resend = new Resend(process.env.RESEND_API_KEY)
    const deliveryIdentity = createHash("sha256")
      .update(email)
      .digest("hex")
      .slice(0, 24)
    const firstName = name.split(/\s+/)[0]
    const result = await resend.emails.send(
      {
        from: "TC Agency <noreply@tc.agency>",
        to: email,
        replyTo: "hello@tc.agency",
        subject: "Your Power Symbols sympathy serial + beta download",
        text: `Hi ${firstName},

You chose the heroic zero-dollar route. The green lightning bolt has judged you, found you useful, and issued a sympathy serial.

PRIVATE DOWNLOAD
${download.toString()}

ACTIVATION SERIAL
${serial}

Install the beta kit, open Vectorworks, then choose Power Symbol > Tool Preferences or Licence / Activation. Enter this email and the serial above. Activation needs internet once; the signed licence then works offline on that Mac.

Your test setup
Vectorworks ${vectorworksVersion}
macOS ${macosVersion || "not supplied"}

Your side of the bargain: test on a backed-up drawing and send useful field notes, screenshots or reproducible bugs to hello@tc.agency.

Power Symbols records and displays power information; it does not replace qualified electrical review.

Technically Creative
https://www.tc.agency/store/power-symbols`,
      },
      { idempotencyKey: `power-symbols-free-${deliveryIdentity}` },
    )
    if (result.error) throw new Error(result.error.message)

    return NextResponse.json(
      { delivered: true },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("[Power Symbols Free Beta] Delivery failed:", error)
    return jsonError(
      "Your serial could not be delivered just now. Please try again shortly.",
      503,
    )
  }
}
