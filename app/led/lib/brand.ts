/**
 * TC brand standards / Section /08 of the project brief.
 * Non-negotiable. Do not deviate without re-issuing the brief.
 */

export const COLORS = {
  bg: "#0a0a0a",
  bg1: "#111111",
  bg2: "#161616",
  line: "#2a2a2a",
  ink: "#ffffff",
  inkDim: "#888888",
  inkFaint: "#444444",
  accent: "#00e58a",
  error: "#ff4444",
  tileA: "#1a1a1a",
  tileB: "#242424",
} as const

export const COPYRIGHT = "TECHNICALLY CREATIVE / DETROIT"

/**
 * Liability disclaimer. Shown on every screen and baked into every
 * export. These numbers are derived from a cabinet library that may
 * be incomplete or out of date — they are not a substitute for the
 * manufacturer's own documentation.
 */
export const DISCLAIMER =
  "PLANNING ESTIMATE ONLY / VERIFY ALL VALUES AGAINST MANUFACTURER DATASHEETS AND LOCAL CODE BEFORE PROCUREMENT, POWER, OR RIGGING / TC ACCEPTS NO LIABILITY FOR ERRORS OR OMISSIONS"

export const DISCLAIMER_SHORT =
  "PLANNING ESTIMATE ONLY / VERIFY AGAINST MANUFACTURER SPECS"

export const WORDMARK_FULL = "TECHNICALLY CREATIVE / DETROIT"
export const WORDMARK_SHORT = "TC / DETROIT"

export const PROJECT_CODE_REGEX = /^\d{2}-[A-Z]{3}-\d{2}-[A-Z]+$/
