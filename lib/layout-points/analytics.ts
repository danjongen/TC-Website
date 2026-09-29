import { CONSENT_STORAGE_KEY } from "@/components/cookie-consent"

/**
 * Consent-aware product analytics for the Layout Points pages.
 *
 * Only the events below exist, and only two parameters can be sent: the
 * product component and its public version. Project data, point IDs,
 * coordinates, filenames, printer details and field-package contents are
 * never collected. Nothing is sent unless the visitor accepted analytics
 * cookies and Google Analytics has loaded.
 */

export type LayoutPointsEvent =
  | "lp_view_product"
  | "lp_view_workflow"
  | "lp_open_install_guide"
  | "lp_download_start"
  | "lp_open_checksum"
  | "lp_open_release_notes"
  | "lp_open_support"
  | "lp_download_error"

export type LayoutPointsEventParams = {
  component?: "layout-points" | "datum-label-studio"
  version?: string
}

type Gtag = (command: "event", name: string, params: Record<string, string>) => void

function hasConsent() {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted"
  } catch {
    return false
  }
}

export function trackLayoutPoints(event: LayoutPointsEvent, params: LayoutPointsEventParams = {}) {
  if (typeof window === "undefined" || !hasConsent()) return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag !== "function") return

  const safe: Record<string, string> = {}
  if (params.component === "layout-points" || params.component === "datum-label-studio") {
    safe.component = params.component
  }
  if (params.version && /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(params.version)) {
    safe.version = params.version
  }
  gtag("event", event, safe)
}
