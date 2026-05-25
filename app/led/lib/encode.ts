import type { WallConfig } from "./types"

/**
 * Compact, URL-safe base64 of the JSON config. Refresh-safe.
 * Works in browser and Node (no Buffer dependency at module load).
 */

function toBase64Url(s: string): string {
  let b64: string
  if (typeof window === "undefined") {
    b64 = Buffer.from(s, "utf-8").toString("base64")
  } else {
    b64 = btoa(unescape(encodeURIComponent(s)))
  }
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(s: string): string {
  let b64 = s.replace(/-/g, "+").replace(/_/g, "/")
  const pad = b64.length % 4
  if (pad) b64 += "=".repeat(4 - pad)
  if (typeof window === "undefined") {
    return Buffer.from(b64, "base64").toString("utf-8")
  }
  return decodeURIComponent(escape(atob(b64)))
}

export function encodeConfig(cfg: WallConfig): string {
  return toBase64Url(JSON.stringify(cfg))
}

export function decodeConfig(token: string): WallConfig | null {
  try {
    const parsed = JSON.parse(fromBase64Url(token)) as Partial<WallConfig>
    if (!parsed || typeof parsed !== "object") return null
    if (!parsed.cabinet_id || !parsed.project_code) return null
    return parsed as WallConfig
  } catch {
    return null
  }
}
