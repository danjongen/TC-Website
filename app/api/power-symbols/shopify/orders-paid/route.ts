import { createHmac, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  createPowerSymbolsSerial,
  POWER_SYMBOLS_BETA_VARIANTS,
} from "@/lib/power-symbols-license"

export const runtime = "nodejs"

type ShopifyOrder = {
  id?: string | number
  name?: string
  email?: string
  contact_email?: string
  customer?: { email?: string; first_name?: string }
  line_items?: Array<{ variant_id?: string | number; title?: string }>
}
function validShopifySignature(raw: string, supplied: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET?.trim()
  if (!secret || !supplied) return false
  const expected = Buffer.from(
    createHmac("sha256", secret).update(raw, "utf8").digest("base64"),
    "ascii",
  )
  const actual = Buffer.from(supplied, "ascii")
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export async function POST(request: Request) {
  const raw = await request.text()
  if (
    !validShopifySignature(
      raw,
      request.headers.get("x-shopify-hmac-sha256") || "",
    )
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  let order: ShopifyOrder
  try {
    order = JSON.parse(raw) as ShopifyOrder
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
  const eligible = (order.line_items || []).some((item) =>
    POWER_SYMBOLS_BETA_VARIANTS.has(String(item.variant_id || "")),
  )
  if (!eligible) return NextResponse.json({ ignored: true })

  const email = String(
    order.email || order.contact_email || order.customer?.email || "",
  )
    .trim()
    .toLowerCase()
  if (!order.id || !email) {
    return NextResponse.json(
      { error: "Paid order is missing its customer email." },
      { status: 422 },
    )
  }

  try {
    const serial = createPowerSymbolsSerial(order.id, email)
    const download = new URL(
      "/api/power-symbols/download",
      "https://www.tc.agency",
    )
    download.searchParams.set("serial", serial)
    const firstName = String(order.customer?.first_name || "").trim()
    const greeting = firstName ? `Hi ${firstName},` : "Hello,"
    const resend = new Resend(process.env.RESEND_API_KEY)
    const webhookId =
      request.headers.get("x-shopify-webhook-id") ||
      `order-${String(order.id)}`
    const result = await resend.emails.send(
      {
        from: "TC Agency <noreply@tc.agency>",
        to: email,
        replyTo: "hello@tc.agency",
        subject: "Your Power Symbols beta + activation serial",
        text: `${greeting}

Thanks for backing the Power Symbols paid beta.

PRIVATE DOWNLOAD
${download.toString()}

ACTIVATION SERIAL
${serial}

Install the beta kit, open Vectorworks, then choose Power Symbol > Tool Preferences or Licence / Activation. Enter this checkout email and the serial above. Activation needs internet once; the signed licence then works offline on that Mac.

This is beta software. Test it on a backed-up drawing and please send field notes to hello@tc.agency. The plug-in records and displays power information; it does not replace qualified electrical review.

Order: ${order.name || order.id}

Technically Creative
https://www.tc.agency/store/power-symbols`,
      },
      { idempotencyKey: `power-symbols-paid-${webhookId}` },
    )
    if (result.error) throw new Error(result.error.message)
    return NextResponse.json({ delivered: true })
  } catch {
    return NextResponse.json(
      { error: "Beta delivery could not be completed." },
      { status: 503 },
    )
  }
}
