/**
 * Short links for shareable spec URLs.
 *
 * The builder keeps the full base64 config in its own URL (refresh-safe
 * editing), but the *shared* link is shortened so it's pasteable into
 * Slack / email / advance docs without a wall of base64.
 *
 * Store: Upstash Redis (REST API), same instance used for rate limiting.
 * Key:   led:s:<id>  ->  <base64 config token>
 *
 * IDs are deterministic (hash of the token) so re-minting the same
 * config is idempotent — no duplicate keys, stable links.
 *
 * If Redis isn't configured, minting returns null and callers fall
 * back to the long URL. Server-only.
 */

const PREFIX = "led:s:"

function redisCreds() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return { url, token }
}

async function shortIdFor(configToken: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(configToken)
  )
  const bytes = new Uint8Array(buf)
  let b64 = ""
  if (typeof btoa === "function") {
    let bin = ""
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
    b64 = btoa(bin)
  } else {
    b64 = Buffer.from(bytes).toString("base64")
  }
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "").slice(0, 10)
}

/**
 * Store the config token under a short id and return the id.
 * Returns null if Redis is unavailable (caller uses the long URL).
 */
export async function mintShortLink(configToken: string): Promise<string | null> {
  const creds = redisCreds()
  if (!creds) return null
  const id = await shortIdFor(configToken)
  try {
    // SET led:s:<id> <token>  — idempotent, no expiry (specs persist).
    const res = await fetch(`${creds.url}/set/${PREFIX}${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${creds.token}` },
      body: configToken,
    })
    if (!res.ok) return null
    return id
  } catch {
    return null
  }
}

/**
 * Resolve a short id back to the config token. Null if not found.
 */
export async function resolveShortLink(id: string): Promise<string | null> {
  const creds = redisCreds()
  if (!creds) return null
  const safe = id.replace(/[^A-Za-z0-9_-]/g, "")
  if (!safe) return null
  try {
    const res = await fetch(`${creds.url}/get/${PREFIX}${safe}`, {
      headers: { Authorization: `Bearer ${creds.token}` },
      cache: "no-store",
    })
    if (!res.ok) return null
    const data = (await res.json()) as { result: string | null }
    return data.result || null
  } catch {
    return null
  }
}
