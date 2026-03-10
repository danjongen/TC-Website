// Rate limiting for contact form submissions
// Uses Upstash Redis when available, falls back to in-memory for development

import { headers } from "next/headers"

// In-memory store for development (not suitable for production multi-instance)
const inMemoryStore = new Map<string, { count: number; resetAt: number }>()

// Cleanup old entries every hour
if (typeof global !== "undefined") {
  setInterval(
    () => {
      const now = Date.now()
      for (const [key, value] of inMemoryStore.entries()) {
        if (value.resetAt < now) {
          inMemoryStore.delete(key)
        }
      }
    },
    60 * 60 * 1000,
  )
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  error?: string
}

interface RateLimitConfig {
  limit: number // Max requests per window
  window: number // Window in seconds
}

/**
 * Get client IP from headers
 */
async function getClientIp(): Promise<string> {
  const headersList = await headers()

  // Check various headers for IP (in order of priority)
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("cf-connecting-ip") || // Cloudflare
    "unknown"

  return ip
}

/**
 * Rate limit using Upstash Redis
 */
async function rateLimitRedis(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!upstashUrl || !upstashToken) {
    throw new Error("Upstash Redis credentials not configured")
  }

  const now = Date.now()
  const window = config.window * 1000 // Convert to milliseconds

  try {
    // Use Upstash REST API with pipeline for atomic operations
    const response = await fetch(`${upstashUrl}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${upstashToken}`,
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, config.window],
        ["TTL", key],
      ]),
    })

    if (!response.ok) {
      throw new Error(`Redis request failed: ${response.statusText}`)
    }

    const results = (await response.json()) as Array<{ result: number }>
    const count = results[0].result
    const ttl = results[2].result

    const remaining = Math.max(0, config.limit - count)
    const reset = Math.floor((now + ttl * 1000) / 1000)

    return {
      success: count <= config.limit,
      limit: config.limit,
      remaining,
      reset,
    }
  } catch (error) {
    console.error("[Rate Limit] Redis error:", error)
    // Fail open - allow request if Redis is down
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit,
      reset: Math.floor((now + config.window * 1000) / 1000),
      error: error instanceof Error ? error.message : "Redis error",
    }
  }
}

/**
 * Rate limit using in-memory store (development fallback)
 */
function rateLimitMemory(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const window = config.window * 1000

  const entry = inMemoryStore.get(key)

  if (!entry || entry.resetAt < now) {
    // New window
    inMemoryStore.set(key, {
      count: 1,
      resetAt: now + window,
    })

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: Math.floor((now + window) / 1000),
    }
  }

  // Increment count
  entry.count++
  inMemoryStore.set(key, entry)

  const remaining = Math.max(0, config.limit - entry.count)

  return {
    success: entry.count <= config.limit,
    limit: config.limit,
    remaining,
    reset: Math.floor(entry.resetAt / 1000),
  }
}

/**
 * Rate limit contact form submissions by IP
 * Config: 5 submissions per hour, burst of 2 per 5 minutes
 */
export async function rateLimitContactForm(): Promise<{
  allowed: boolean
  result: RateLimitResult
  ip: string
}> {
  const ip = await getClientIp()
  const hourlyKey = `contact-form:hourly:${ip}`
  const burstKey = `contact-form:burst:${ip}`

  // Check burst limit (2 per 5 minutes)
  const burstConfig: RateLimitConfig = { limit: 2, window: 5 * 60 }

  // Check hourly limit (5 per hour)
  const hourlyConfig: RateLimitConfig = { limit: 5, window: 60 * 60 }

  const hasRedis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN

  try {
    let burstResult: RateLimitResult
    let hourlyResult: RateLimitResult

    if (hasRedis) {
      // Use Redis
      ;[burstResult, hourlyResult] = await Promise.all([
        rateLimitRedis(burstKey, burstConfig),
        rateLimitRedis(hourlyKey, hourlyConfig),
      ])
    } else {
      // Use in-memory (development)
      console.warn(
        "[Rate Limit] Using in-memory rate limiting. Configure Upstash Redis for production.",
      )
      burstResult = rateLimitMemory(burstKey, burstConfig)
      hourlyResult = rateLimitMemory(hourlyKey, hourlyConfig)
    }

    // Both limits must pass
    const allowed = burstResult.success && hourlyResult.success

    // Return the more restrictive result
    const result = !burstResult.success ? burstResult : hourlyResult

    return { allowed, result, ip }
  } catch (error) {
    console.error("[Rate Limit] Error:", error)
    // Fail open - allow request if rate limiting fails
    return {
      allowed: true,
      result: {
        success: true,
        limit: hourlyConfig.limit,
        remaining: hourlyConfig.limit,
        reset: Math.floor(Date.now() / 1000) + hourlyConfig.window,
        error: "Rate limit check failed",
      },
      ip,
    }
  }
}
