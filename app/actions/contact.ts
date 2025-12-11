"use server"

import { redirect } from "next/navigation"
import { Resend } from "resend"

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(
  prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const data = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    projectType: formData.get("projectType") as string,
    budget: formData.get("budget") as string,
    timeline: formData.get("timeline") as string,
    message: formData.get("message") as string,
  }

  if (!data.name || !data.email || !data.message) {
    return { error: "Please fill in all required fields (name, email, and message)." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { error: "Please provide a valid email address." }
  }

  const emailText = `
New Contact Form Submission - TC Agency

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:        ${data.name}
Company:     ${data.company || "Not provided"}
Email:       ${data.email}
Phone:       ${data.phone || "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project Type: ${data.projectType || "Not specified"}
Budget Range: ${data.budget || "Not specified"}
Timeline:     ${data.timeline || "Not specified"}

Message:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Detroit" })} EST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

  try {
    await resend.emails.send({
      from: "TC Agency <noreply@tc.agency>",
      to: ["info@tc.agency"],
      replyTo: data.email,
      subject: `New Inquiry: ${data.name}${data.company ? ` from ${data.company}` : ""}`,
      text: emailText,
    })

    // ┌─────────────────────────────────────────────────────────────┐
    // │ FUTURE INTEGRATIONS - Add additional hooks here:            │
    // ├─────────────────────────────────────────────────────────────┤
    // │                                                             │
    // │ 1. CRM Integration (HubSpot, Salesforce, Pipedrive):       │
    // │    await createCRMContact(data)                             │
    // │    - Create or update contact record                        │
    // │    - Track lead source and qualification                    │
    // │    - Assign to sales rep based on budget/timeline           │
    // │                                                             │
    // │ 2. Slack Notification:                                      │
    // │    await sendSlackNotification({                            │
    // │      channel: "#sales-inquiries",                           │
    // │      message: `New inquiry from ${data.name}...`            │
    // │    })                                                       │
    // │    - Real-time team alerts                                  │
    // │    - Include priority flag for high-budget projects         │
    // │                                                             │
    // │ 3. Analytics & Logging:                                     │
    // │    await logEvent({                                         │
    // │      event: "contact_form_submit",                          │
    // │      properties: { projectType, budget, timeline }          │
    // │    })                                                       │
    // │    - Track conversion funnels                               │
    // │    - Monitor form drop-off rates                            │
    // │    - A/B test form variations                               │
    // │                                                             │
    // └─────────────────────────────────────────────────────────────┘

    console.log("[v0] Contact form submitted successfully:", {
      name: data.name,
      email: data.email,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Resend error:", error)
    return {
      error: "Failed to send your message. Please try again or email us directly at info@tc.agency.",
    }
  }

  redirect("/thank-you")
}
