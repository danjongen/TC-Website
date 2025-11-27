"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ""

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." }
  }

  if (!AUDIENCE_ID) {
    console.error("[v0] Missing RESEND_AUDIENCE_ID environment variable")
    return { success: false, message: "Subscription service is not configured." }
  }

  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    })

    await delay(600)

    await resend.emails.send({
      from: "TC Agency <info@tc.agency>",
      to: email,
      subject: "You're In. The Best Seat in the House.",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
                    <!-- Header -->
                    <tr>
                      <td style="padding-bottom: 40px; border-bottom: 1px solid #333;">
                        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">TC</h1>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 50px 0;">
                        <h2 style="margin: 0 0 24px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                          Welcome to the Inner Circle.
                        </h2>
                        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                          You've just secured early access to TC Insights — where we share the stories, strategies, and technical deep-dives behind the world's most ambitious live productions.
                        </p>
                        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                          From LED video walls the size of buildings to AI-driven broadcast workflows, we're pulling back the curtain on how impossible becomes inevitable.
                        </p>
                        <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #ffffff; font-weight: 500;">
                          We'll be in touch when we go live. Until then — stay creative.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                      <td style="padding-bottom: 50px;">
                        <a href="https://tc.agency" style="display: inline-block; padding: 14px 32px; background-color: #ffffff; color: #000000; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.5px;">
                          EXPLORE TC AGENCY
                        </a>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding-top: 40px; border-top: 1px solid #333;">
                        <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                          Technically Creative LLC
                        </p>
                        <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                          Detroit, MI, USA
                        </p>
                        <p style="margin: 0 0 16px 0; font-size: 12px; color: #444;">
                          You're receiving this because you subscribed at tc.agency
                        </p>
                        <p style="margin: 0;">
                          <a href="https://tc.agency/unsubscribe?email=${encodeURIComponent(email)}" style="font-size: 12px; color: #666; text-decoration: underline;">
                            Unsubscribe
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    return { success: true, message: "You're on the list! Check your inbox for a welcome note." }
  } catch (error: any) {
    if (error?.message?.includes("already exists")) {
      return { success: true, message: "You're already subscribed! We'll notify you when we launch." }
    }

    if (error?.message?.includes("rate_limit") || error?.message?.includes("429")) {
      return { success: false, message: "Too many requests. Please wait a moment and try again." }
    }

    console.error("[v0] Newsletter subscription error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address." }
  }

  if (!AUDIENCE_ID) {
    return { success: false, message: "Unsubscribe service is not configured." }
  }

  try {
    // Get contact ID by email
    const contacts = await resend.contacts.list({ audienceId: AUDIENCE_ID })
    const contact = contacts.data?.data?.find((c: any) => c.email === email)

    if (!contact) {
      return { success: false, message: "Email not found in our records." }
    }

    await delay(600)

    // Update contact to unsubscribed
    await resend.contacts.update({
      id: contact.id,
      audienceId: AUDIENCE_ID,
      unsubscribed: true,
    })

    return { success: true, message: "You've been unsubscribed. We're sorry to see you go." }
  } catch (error: any) {
    console.error("[v0] Unsubscribe error:", error)
    return { success: false, message: "Something went wrong. Please try again or contact info@tc.agency." }
  }
}
