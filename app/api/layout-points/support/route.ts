import { NextResponse } from "next/server"
import { Resend } from "resend"

import { emailPattern, jsonHeaders, SENDER, supportInbox } from "@/lib/layout-points/inbox"
import {
  ATTACHMENT_EXTENSIONS,
  ATTACHMENT_MAX_BYTES,
  SUPPORT_ARCHITECTURES,
  SUPPORT_CATEGORIES,
  SUPPORT_COMPONENTS,
  SUPPORT_IMPORT_TYPES,
  SUPPORT_VECTORWORKS,
} from "@/lib/layout-points/support-options"
import { rateLimitLayoutPoints } from "@/lib/rate-limit"
import { checkForSpam } from "@/lib/spam-detection"
import { verifyTurnstileToken } from "@/lib/turnstile"

export const runtime = "nodejs"

// Vercel functions accept request bodies up to 4.5 MB.
const MAX_BODY = 4.4 * 1024 * 1024

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: jsonHeaders() })
}

function text(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max)
}

function oneOf(value: string, allowed: readonly string[], required: boolean) {
  if (!value) return !required
  return allowed.includes(value)
}

function safeFilename(name: string) {
  return name.replace(/[^A-Za-z0-9._-]+/g, "_").slice(-100) || "attachment"
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) {
    return error("That request is too large. Keep attachments under 4 MB.", 413)
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return error("That request could not be read.", 400)
  }

  const honeypot = text(form, "companyWebsite", 200)
  const elapsedMs = Number(form.get("elapsedMs") || 0)
  if (honeypot || !elapsedMs || elapsedMs < 2_500) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return NextResponse.json({ ok: true }, { headers: jsonHeaders() })
  }

  const data = {
    name: text(form, "name", 80),
    email: text(form, "email", 254).toLowerCase(),
    component: text(form, "component", 40),
    productVersion: text(form, "productVersion", 40),
    macosVersion: text(form, "macosVersion", 40),
    architecture: text(form, "architecture", 20),
    vectorworksVersion: text(form, "vectorworksVersion", 20),
    printer: text(form, "printer", 120),
    labelDimensions: text(form, "labelDimensions", 60),
    importType: text(form, "importType", 40),
    category: text(form, "category", 60),
    message: text(form, "message", 4000),
  }

  if (data.name.length < 2) return error("Enter your name.", 422)
  if (!emailPattern.test(data.email)) return error("Enter a valid email address.", 422)
  if (!oneOf(data.component, SUPPORT_COMPONENTS, true)) return error("Choose the product component.", 422)
  if (!oneOf(data.category, SUPPORT_CATEGORIES, true)) return error("Choose a problem category.", 422)
  if (!oneOf(data.architecture, SUPPORT_ARCHITECTURES, false))
    return error("Choose a Mac architecture from the list.", 422)
  if (!oneOf(data.vectorworksVersion, SUPPORT_VECTORWORKS, false))
    return error("Choose a Vectorworks version from the list.", 422)
  if (!oneOf(data.importType, SUPPORT_IMPORT_TYPES, false)) return error("Choose an import type from the list.", 422)
  if (data.message.length < 20) return error("Tell us a little more: at least 20 characters.", 422)

  const file = form.get("attachment")
  let attachment: { filename: string; content: Buffer } | undefined
  if (file instanceof File && file.size > 0) {
    const lower = file.name.toLowerCase()
    if (!ATTACHMENT_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
      return error(`Attach one of: ${ATTACHMENT_EXTENSIONS.join(", ")}.`, 422)
    }
    if (file.size > ATTACHMENT_MAX_BYTES) return error("Keep the attachment under 4 MB.", 413)
    attachment = { filename: safeFilename(file.name), content: Buffer.from(await file.arrayBuffer()) }
  }

  const { allowed } = await rateLimitLayoutPoints("support", data.email)
  if (!allowed) return error("Too many requests. Try again later, or email info@tc.agency.", 429)

  if (process.env.TURNSTILE_SECRET_KEY) {
    const verification = await verifyTurnstileToken(text(form, "cf-turnstile-response", 4096))
    if (!verification.success) return error("Verification failed. Refresh the page and try again.", 403)
  }

  const spam = checkForSpam(data.message, data.email, data.name)
  if (spam.isSpam) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return NextResponse.json({ ok: true }, { headers: jsonHeaders() })
  }

  if (!process.env.RESEND_API_KEY)
    return error("Support mail is not configured yet. Email info@tc.agency instead.", 503)

  const body = `Layout Points + Datum Label Studio support request

Name:               ${data.name}
Email:              ${data.email}
Component:          ${data.component}
Product version:    ${data.productVersion || "Not provided"}
macOS:              ${data.macosVersion || "Not provided"}
Mac architecture:   ${data.architecture || "Not provided"}
Vectorworks:        ${data.vectorworksVersion || "Not provided"}
Printer and driver: ${data.printer || "Not provided"}
Label dimensions:   ${data.labelDimensions || "Not provided"}
Import type:        ${data.importType || "Not provided"}
Category:           ${data.category}
Attachment:         ${attachment ? `${attachment.filename} (${attachment.content.length} bytes)` : "None"}

Message:
${data.message}

The sender was warned not to upload production coordinates or client data unless authorised.
`

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const sent = await resend.emails.send({
      from: SENDER,
      to: supportInbox(),
      replyTo: data.email,
      subject: `Layout Points support: ${data.category} (${data.component})`,
      text: body,
      attachments: attachment ? [attachment] : undefined,
    })
    if (sent.error) throw new Error(sent.error.message)
    return NextResponse.json({ ok: true }, { headers: jsonHeaders() })
  } catch (err) {
    console.error("[Layout Points support] Delivery failed:", err)
    return error("That did not go through. Try again, or email info@tc.agency.", 502)
  }
}
