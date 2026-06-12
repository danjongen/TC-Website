/**
 * Short links for shareable spec URLs.
 *
 * The builder keeps the full base64 config in its own URL (refresh-safe
 * editing), but the *shared* link is shortened so it's pasteable into
 * Slack / email / advance docs without a wall of base64.
 *
 * Store priority (server-only):
 *   1. Upstash Redis (REST)  — if UPSTASH_REDIS_REST_URL/TOKEN are set.
 *   2. Airtable              — falls back to the LED Cabinet DB base using
 *                              the same PAT the cabinet library uses, so
 *                              short links work with no extra infra.
 *   3. none                  — minting returns null; callers use the long URL.
 *
 * IDs are deterministic (hash of the token) so re-minting the same config is
 * idempotent. Resolve checks Upstash first, then Airtable, so links minted
 * before Upstash was enabled keep working afterwards.
 */

const PREFIX = "led:s:"

// In-process cache. The id→token mapping is immutable, so a hit never goes
// stale; this spares the store on repeat views of the same shared link.
const resolveCache = new Map<string, string>()

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

// ---- Upstash Redis store ----------------------------------------------------

function redisCreds() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return { url, token }
}

async function redisSet(id: string, configToken: string): Promise<boolean> {
  const creds = redisCreds()
  if (!creds) return false
  try {
    const res = await fetch(`${creds.url}/set/${PREFIX}${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${creds.token}` },
      body: configToken,
    })
    return res.ok
  } catch {
    return false
  }
}

async function redisGet(id: string): Promise<string | null> {
  const creds = redisCreds()
  if (!creds) return null
  try {
    const res = await fetch(`${creds.url}/get/${PREFIX}${id}`, {
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

// ---- Airtable store ---------------------------------------------------------

// Lives in the CRM base (same base + PAT as "Save to project"), which is
// the Airtable token known to have write access in production.
const AIRTABLE_API = "https://api.airtable.com/v0"
const AIRTABLE_SL = {
  baseId: process.env.AIRTABLE_CRM_BASE_ID || "app5wcWdD13yBPnSd",
  tableId: process.env.AIRTABLE_SHORTLINKS_TABLE_ID || "tbl3w9JEMyw3mFZ0x",
  idField: "id",
  tokenField: "token",
}

function airtablePat(): string | null {
  return process.env.AIRTABLE_PAT || null
}

async function airtableGet(id: string): Promise<string | null> {
  const pat = airtablePat()
  if (!pat) return null
  const url = new URL(`${AIRTABLE_API}/${AIRTABLE_SL.baseId}/${AIRTABLE_SL.tableId}`)
  url.searchParams.set("filterByFormula", `{${AIRTABLE_SL.idField}}='${id}'`)
  url.searchParams.set("maxRecords", "1")
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${pat}` },
      cache: "no-store",
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      records: Array<{ fields: Record<string, unknown> }>
    }
    const token = data.records[0]?.fields?.[AIRTABLE_SL.tokenField]
    return typeof token === "string" && token ? token : null
  } catch {
    return null
  }
}

async function airtableSet(id: string, configToken: string): Promise<boolean> {
  const pat = airtablePat()
  if (!pat) return false
  try {
    // Idempotent: same config → same id, so skip if already stored.
    if (await airtableGet(id)) return true
    const res = await fetch(`${AIRTABLE_API}/${AIRTABLE_SL.baseId}/${AIRTABLE_SL.tableId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        records: [
          { fields: { [AIRTABLE_SL.idField]: id, [AIRTABLE_SL.tokenField]: configToken } },
        ],
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

// ---- Public API -------------------------------------------------------------

/**
 * Store the config token under a short id and return the id.
 * Returns null if no store is available (caller uses the long URL).
 */
export async function mintShortLink(configToken: string): Promise<string | null> {
  const id = await shortIdFor(configToken)
  if (redisCreds()) {
    if (await redisSet(id, configToken)) {
      resolveCache.set(id, configToken)
      return id
    }
  }
  if (airtablePat()) {
    if (await airtableSet(id, configToken)) {
      resolveCache.set(id, configToken)
      return id
    }
  }
  return null
}

/**
 * Resolve a short id back to the config token. Null if not found. Checks
 * Upstash then Airtable so links survive enabling Upstash later.
 */
export async function resolveShortLink(id: string): Promise<string | null> {
  const safe = id.replace(/[^A-Za-z0-9_-]/g, "")
  if (!safe) return null
  const cached = resolveCache.get(safe)
  if (cached) return cached

  const fromRedis = await redisGet(safe)
  if (fromRedis) {
    resolveCache.set(safe, fromRedis)
    return fromRedis
  }
  const fromAirtable = await airtableGet(safe)
  if (fromAirtable) {
    resolveCache.set(safe, fromAirtable)
    return fromAirtable
  }
  return null
}
