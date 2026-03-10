// Cloudflare Turnstile verification

interface TurnstileResponse {
  success: boolean
  "error-codes"?: string[]
  challenge_ts?: string
  hostname?: string
}

/**
 * Verify Cloudflare Turnstile token
 */
export async function verifyTurnstileToken(token: string): Promise<{
  success: boolean
  error?: string
}> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.warn("[Turnstile] Secret key not configured. Skipping verification.")
    return { success: true } // Allow in development
  }

  if (!token) {
    return { success: false, error: "No verification token provided" }
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    })

    if (!response.ok) {
      throw new Error(`Turnstile API error: ${response.statusText}`)
    }

    const data = (await response.json()) as TurnstileResponse

    if (!data.success) {
      const errorCodes = data["error-codes"]?.join(", ") || "unknown error"
      console.error("[Turnstile] Verification failed:", errorCodes)
      return { success: false, error: "Verification failed" }
    }

    return { success: true }
  } catch (error) {
    console.error("[Turnstile] Verification error:", error)
    // Fail open in case of API issues
    return { success: true, error: "Verification service unavailable" }
  }
}
