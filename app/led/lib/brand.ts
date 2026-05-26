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

/**
 * Power figures are the wall's total connected load (max = full white,
 * avg = typical content). They are not a service-sizing spec: final
 * circuit, breaker, and distro sizing must add continuous-load headroom
 * per the local electrical code for the territory (e.g. NEC 125% in North
 * America) and be confirmed by the power vendor / local electrician.
 */
export const POWER_NOTE =
  "POWER = TOTAL CONNECTED LOAD / ADD CONTINUOUS-LOAD HEADROOM + LOCAL CODE (NEC 125% IN NORTH AMERICA) / CONFIRM FINAL CIRCUIT + BREAKER SIZING WITH THE POWER VENDOR"

export const WORDMARK_FULL = "TECHNICALLY CREATIVE / DETROIT"
export const WORDMARK_SHORT = "TC / DETROIT"

export const PROJECT_CODE_REGEX = /^\d{2}-[A-Z]{3}-\d{2}-[A-Z]+$/

/**
 * Installed weight allowance presets (percent of base wall weight).
 * Wind bracing is never on by default — outdoor/engineered only.
 */
export const ALLOWANCE_PRESETS = {
  standard: { cabling_pct: 3, rigging_pct: 12, top_rigging_pct: 5 },
  conservative: { cabling_pct: 5, rigging_pct: 15, top_rigging_pct: 10 },
} as const

export const ALLOWANCE_DEFAULTS = {
  allowance_preset: "standard" as const,
  cabling_pct: 3,
  rigging_pct: 12,
  top_rigging_pct: 5,
  wind_bracing: false,
  wind_bracing_pct: 10,
}

export const ALLOWANCE_NOTE =
  "Allowance values are planning estimates only. Final rigging loads should be verified against the LED vendor rigging manual, hardware BOM, motor/hoist weights, and a qualified rigging or structural engineer."
