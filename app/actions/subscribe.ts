"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// You'll need to create an Audience in Resend and add the ID here
// Go to: https://resend.com/audiences → Create Audience → Copy the ID
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ""

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

    return { success: true, message: "You're on the list! We'll notify you when we launch." }
  } catch (error: any) {
    // Handle duplicate email (already subscribed)
    if (error?.message?.includes("already exists")) {
      return { success: true, message: "You're already subscribed! We'll notify you when we launch." }
    }

    console.error("[v0] Newsletter subscription error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}
