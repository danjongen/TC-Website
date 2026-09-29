import { NextResponse } from "next/server"
import { Resend } from "resend"

import { emailPattern, jsonHeaders, SENDER, supportInbox } from "@/lib/layout-points/inbox"
import { rateLimitLayoutPoints } from "@/lib/rate-limit"
import { verifyTurnstileToken } from "@/lib/turnstile"

export const runtime = "nodejs"

const VECTORWORKS = new Set(["", "2023", "2024", "2025", "2026", "other", "none"])

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: jsonHeaders() })
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 8_192) return error("That request is too large.", 413)

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return error("That request could not be read.", 400)
  }

  const email = String(body.email || "")
    .trim()
    .toLowerCase()
  const name = String(body.name || "").trim()
  const vectorworks = String(body.vectorworksVersion || "").trim()
  const honeypot = String(body.companyWebsite || "").trim()
  const elapsedMs = Number(body.elapsedMs || 0)

  // Absorb obvious automated submissions without storing anything.
  if (honeypot || !elapsedMs || elapsedMs < 2_500) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return NextResponse.json({ ok: true }, { headers: jsonHeaders() })
  }

  if (!emailPattern.test(email) || email.length > 254) return error("Enter a valid email address.", 422)
  if (name.length > 80) return error("Keep your name under 80 characters.", 422)
  if (!VECTORWORKS.has(vectorworks)) return error("Choose a Vectorworks version from the list.", 422)
  if (body.consent !== true) return error("Tick the box so we can email you about the release.", 422)

  const { allowed } = await rateLimitLayoutPoints("release-list", email)
  if (!allowed) return error("Too many requests. Try again later.", 429)

  if (process.env.TURNSTILE_SECRET_KEY) {
    const verification = await verifyTurnstileToken(String(body.turnstileToken || ""))
    if (!verification.success) return error("Verification failed. Refresh the page and try again.", 403)
  }

  if (!process.env.RESEND_API_KEY)
    return error("The release list is not configured yet. Email info@tc.agency instead.", 503)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const audienceId = process.env.RESEND_LAYOUT_POINTS_AUDIENCE_ID
    if (audienceId) {
      const created = await resend.contacts.create({
        email,
        firstName: name || undefined,
        unsubscribed: false,
        audienceId,
      })
      if (created.error && !/already exists/i.test(created.error.message)) throw new Error(created.error.message)
    }

    const sent = await resend.emails.send({
      from: SENDER,
      to: supportInbox(),
      replyTo: email,
      subject: "Layout Points release list: new sign-up",
      text: `Layout Points + Datum Label Studio release list

Email:       ${email}
Name:        ${name || "Not provided"}
Vectorworks: ${vectorworks || "Not provided"}
Audience:    ${audienceId ? "added to RESEND_LAYOUT_POINTS_AUDIENCE_ID" : "not configured, notification only"}
Consent:     release announcements for this product
`,
    })
    if (sent.error) throw new Error(sent.error.message)

    return NextResponse.json({ ok: true }, { headers: jsonHeaders() })
  } catch (err) {
    console.error("[Layout Points release list] Delivery failed:", err)
    return error("That did not go through. Try again, or email info@tc.agency.", 502)
  }
}
