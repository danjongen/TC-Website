"use server"

import { Resend } from "resend"
import { verifyTurnstileToken } from "@/lib/turnstile"
import { rateLimitContactForm } from "@/lib/rate-limit"
import {
  checkForSpam,
  sanitizePhone,
  validateName,
  validateMessage,
} from "@/lib/spam-detection"

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY)

interface FormResponse {
  error?: string
  success?: boolean
}

export async function submitContactForm(
  prevState: FormResponse | null,
  formData: FormData,
): Promise<FormResponse | null> {
  const startTime = Date.now()

  // Extract form data
  const data = {
    name: (formData.get("name") as string)?.trim() || "",
    company: (formData.get("company") as string)?.trim() || "",
    email: (formData.get("email") as string)?.trim() || "",
    phone: (formData.get("phone") as string)?.trim() || "",
    projectType: (formData.get("projectType") as string)?.trim() || "",
    budget: (formData.get("budget") as string)?.trim() || "",
    timeline: (formData.get("timeline") as string)?.trim() || "",
    message: (formData.get("message") as string)?.trim() || "",
    honeypot: formData.get("company_website") as string, // Honeypot field
    formElapsedMs: Number(formData.get("form_elapsed_ms") || 0),
    turnstileToken: formData.get("cf-turnstile-response") as string,
  }

  // =========================================================================
  // LAYER 1: Honeypot Check
  // =========================================================================
  if (data.honeypot) {
    // Bot detected - return success but don't send email
    console.log("[Contact Form] ❌ BLOCKED - Honeypot triggered:", {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
    })

    // Return generic success to not reveal detection
    // Delay slightly so timing matches a real submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return { success: true }
  }

  // =========================================================================
  // LAYER 1b: Time trap — bots fill forms in well under 3 seconds
  // =========================================================================
  // missing value means JS never ran (headless bot) or an old cached page;
  // require at least 2.5s of fill time measured on the client's own clock
  if (!data.formElapsedMs || data.formElapsedMs < 2500) {
    console.warn("[Contact Form] Time-trap triggered, dropping submission")
    return { success: true }
  }

  // =========================================================================
  // LAYER 2: Rate Limiting
  // =========================================================================
  const { allowed, result, ip } = await rateLimitContactForm()

  if (!allowed) {
    console.log("[Contact Form] ❌ BLOCKED - Rate limit exceeded:", {
      ip,
      limit: result.limit,
      remaining: result.remaining,
      resetAt: new Date(result.reset * 1000).toISOString(),
    })

    return {
      error: `Too many submissions. Please try again in ${Math.ceil((result.reset * 1000 - Date.now()) / 60000)} minutes.`,
    }
  }

  // =========================================================================
  // LAYER 3: Required Fields Validation
  // =========================================================================
  if (!data.name || !data.email || !data.message) {
    return { error: "Please fill in all required fields (name, email, and message)." }
  }

  // =========================================================================
  // LAYER 4: Field Length Validation
  // =========================================================================
  if (!validateName(data.name)) {
    return { error: "Name must be between 2 and 80 characters." }
  }

  if (!validateMessage(data.message)) {
    return { error: "Message must be between 20 and 4000 characters." }
  }

  // =========================================================================
  // LAYER 5: Email Format Validation
  // =========================================================================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { error: "Please provide a valid email address." }
  }

  // =========================================================================
  // LAYER 6: Cloudflare Turnstile Verification
  // =========================================================================
  const turnstileEnabled = !!process.env.TURNSTILE_SECRET_KEY

  if (turnstileEnabled) {
    const turnstileResult = await verifyTurnstileToken(data.turnstileToken)

    if (!turnstileResult.success) {
      console.log("[Contact Form] ❌ BLOCKED - Turnstile verification failed:", {
        ip,
        email: data.email,
        error: turnstileResult.error,
      })

      return {
        error: "Verification failed. Please refresh the page and try again.",
      }
    }
  }

  // =========================================================================
  // LAYER 7: Spam Content Detection
  // =========================================================================
  const spamCheck = checkForSpam(data.message, data.email, data.name)

  if (spamCheck.isSpam) {
    // Soft block - return success but don't send email
    console.log("[Contact Form] ❌ BLOCKED - Spam detected:", {
      timestamp: new Date().toISOString(),
      ip,
      name: data.name,
      email: data.email,
      score: spamCheck.score,
      reason: spamCheck.reason,
      message: data.message.substring(0, 200),
    })

    // Return generic success to not reveal detection
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return { success: true }
  }

  // =========================================================================
  // LAYER 8: Sanitization
  // =========================================================================
  const sanitizedPhone = data.phone ? sanitizePhone(data.phone) : "Not provided"

  // =========================================================================
  // SEND EMAIL (Legitimate submission)
  // =========================================================================
  const isLowSpamScore = spamCheck.score < 30
  const subjectPrefix = isLowSpamScore ? "" : "[Low Priority] "

  const emailText = `
New Contact Form Submission - TC Agency

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:        ${data.name}
Company:     ${data.company || "Not provided"}
Email:       ${data.email}
Phone:       ${sanitizedPhone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project Type: ${data.projectType || "Not specified"}
Budget Range: ${data.budget || "Not specified"}
Timeline:     ${data.timeline || "Not specified"}

Message:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted:    ${new Date().toLocaleString("en-US", { timeZone: "America/Detroit" })} EST
IP Address:   ${ip}
Spam Score:   ${spamCheck.score}/100 ${isLowSpamScore ? "✓ CLEAN" : "⚠ REVIEW"}
${!isLowSpamScore ? `Flags:        ${spamCheck.reason}\n` : ""}
Processing:   ${Date.now() - startTime}ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

  try {
    await resend.emails.send({
      from: "TC Agency <noreply@tc.agency>",
      to: ["info@tc.agency"],
      replyTo: data.email,
      subject: `${subjectPrefix}New Inquiry: ${data.name}${data.company ? ` from ${data.company}` : ""}`,
      text: emailText,
    })

    console.log("[Contact Form] ✅ SUCCESS - Email sent:", {
      name: data.name,
      email: data.email,
      spamScore: spamCheck.score,
      ip,
      processingTime: Date.now() - startTime,
    })
  } catch (error) {
    console.error("[Contact Form] ❌ ERROR - Resend failed:", error)
    return {
      error: "Failed to send your message. Please try again or email us directly at info@tc.agency.",
    }
  }

  return { success: true }
}
