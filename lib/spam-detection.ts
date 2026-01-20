// Spam detection utilities for contact form

export const SPAM_KEYWORDS = [
  "googlesearchindex",
  "search index",
  "add domain",
  "indexing",
  "register.org",
  "seo submission",
  "submit to search",
  "backlinks",
  "submit url",
  "submit site",
  "submit website",
  "list your site",
  "add your site",
  "directory submission",
  "link building",
  "get indexed",
] as const

export const SUSPICIOUS_TLDS = [
  ".xyz",
  ".top",
  ".info",
  ".click",
  ".link",
  ".pw",
  ".tk",
  ".ml",
  ".ga",
  ".cf",
  ".gq",
] as const

export interface SpamCheckResult {
  isSpam: boolean
  reason?: string
  score: number // 0-100, higher = more likely spam
}

/**
 * Detect spam keywords in message (case-insensitive)
 */
export function containsSpamKeywords(text: string): boolean {
  const lowerText = text.toLowerCase()
  return SPAM_KEYWORDS.some((keyword) => lowerText.includes(keyword.toLowerCase()))
}

/**
 * Count URLs in text
 */
export function countUrls(text: string): number {
  const urlRegex = /https?:\/\/[^\s]+|www\.[^\s]+|\b[a-z0-9-]+\.(com|org|net|io|co|agency|dev)[^\s]*/gi
  const matches = text.match(urlRegex)
  return matches ? matches.length : 0
}

/**
 * Check for suspicious TLDs in text
 */
export function containsSuspiciousTld(text: string): boolean {
  const lowerText = text.toLowerCase()
  return SUSPICIOUS_TLDS.some((tld) => lowerText.includes(tld))
}

/**
 * Comprehensive spam check
 */
export function checkForSpam(message: string, email: string, name: string): SpamCheckResult {
  let score = 0
  const reasons: string[] = []

  // Check for spam keywords
  if (containsSpamKeywords(message)) {
    score += 80
    reasons.push("spam keywords detected")
  }

  // Check URL count
  const urlCount = countUrls(message)
  if (urlCount > 1) {
    score += 60
    reasons.push(`multiple URLs (${urlCount})`)
  } else if (urlCount === 1) {
    score += 20
    reasons.push("contains URL")
  }

  // Check for suspicious TLDs
  if (containsSuspiciousTld(message)) {
    score += 40
    reasons.push("suspicious domain extension")
  }

  // Check message length (too short or too long can be spam)
  if (message.length < 20) {
    score += 30
    reasons.push("message too short")
  } else if (message.length > 4000) {
    score += 20
    reasons.push("message too long")
  }

  // Check for generic/spammy names
  const spammyNamePatterns = [/^test$/i, /^admin$/i, /^user$/i, /^webmaster$/i]
  if (spammyNamePatterns.some((pattern) => pattern.test(name))) {
    score += 30
    reasons.push("generic name")
  }

  // Check for temporary/disposable email patterns
  const tempEmailPatterns = [
    /temp/i,
    /throwaway/i,
    /disposable/i,
    /guerrilla/i,
    /10minute/i,
    /mailinator/i,
  ]
  if (tempEmailPatterns.some((pattern) => pattern.test(email))) {
    score += 40
    reasons.push("disposable email")
  }

  // Determine if spam (score > 50 = likely spam)
  const isSpam = score >= 50

  return {
    isSpam,
    reason: isSpam ? reasons.join(", ") : undefined,
    score: Math.min(score, 100),
  }
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+\-() ]/g, "").trim()
}

/**
 * Validate name length
 */
export function validateName(name: string): boolean {
  return name.length >= 2 && name.length <= 80
}

/**
 * Validate message length
 */
export function validateMessage(message: string): boolean {
  return message.length >= 20 && message.length <= 4000
}
