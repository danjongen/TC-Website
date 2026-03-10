import { NextResponse } from 'next/server'

export async function GET() {
  // Diagnostic endpoint to check environment variables (NEVER expose secrets)
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    turnstile: {
      siteKeyPresent: !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      siteKeyValue: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? `${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.substring(0, 10)}...` : 'NOT SET',
      secretKeyPresent: !!process.env.TURNSTILE_SECRET_KEY,
    },
    redis: {
      urlPresent: !!process.env.UPSTASH_REDIS_REST_URL,
      tokenPresent: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    },
    resend: {
      apiKeyPresent: !!process.env.RESEND_API_KEY,
    },
    spamProtectionLayers: {
      honeypot: 'ACTIVE (always on)',
      rateLimiting: process.env.UPSTASH_REDIS_REST_URL ? 'ACTIVE (Redis)' : 'FALLBACK (in-memory)',
      validation: 'ACTIVE (always on)',
      turnstile: process.env.TURNSTILE_SECRET_KEY ? 'ACTIVE' : 'DISABLED (no secret key)',
      spamDetection: 'ACTIVE (always on)',
      sanitization: 'ACTIVE (always on)',
    },
  }

  return NextResponse.json(diagnostics, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
