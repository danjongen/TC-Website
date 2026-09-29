/**
 * Where Layout Points release-list and support messages are delivered.
 * Defaults to the existing TC Agency inbox used by the contact form; set
 * LAYOUT_POINTS_SUPPORT_EMAIL to route product mail elsewhere.
 */
export function supportInbox(): string {
  return process.env.LAYOUT_POINTS_SUPPORT_EMAIL?.trim() || "info@tc.agency"
}

export const SENDER = "TC Agency <noreply@tc.agency>"

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function jsonHeaders() {
  return { "Cache-Control": "no-store" }
}
