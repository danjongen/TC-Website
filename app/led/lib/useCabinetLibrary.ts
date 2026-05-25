"use client"
import { useEffect, useMemo, useState } from "react"
import { CABINETS } from "../data/cabinets"
import type { Cabinet } from "./types"

/**
 * Merge the published DB library over the built-in list. DB values win for
 * matching ids (so a record edited in Airtable supersedes the hard-coded
 * spec), the built-in order is preserved, and any DB-only cabinets are
 * appended. The built-in list always remains as an offline fallback.
 */
export function mergeCabinets(base: Cabinet[], extra: Cabinet[]): Cabinet[] {
  const extraById = new Map(extra.filter((c) => c.id).map((c) => [c.id, c]))
  const seen = new Set<string>()
  const out: Cabinet[] = []
  for (const c of base) {
    out.push(extraById.get(c.id) ?? c)
    seen.add(c.id)
  }
  for (const c of extra) {
    if (c.id && !seen.has(c.id)) out.push(c)
  }
  return out
}

/**
 * Client hook: renders instantly with the built-in library, then swaps in
 * the published DB library once it loads. Never blocks and never throws —
 * if the endpoint is unreachable the built-in list stands.
 */
export function useCabinetLibrary() {
  const [cabinets, setCabinets] = useState<Cabinet[]>(CABINETS)
  const [loading, setLoading] = useState(true)
  const [fromDb, setFromDb] = useState(false)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const res = await fetch("/led/api/cabinets", { cache: "no-store" })
        if (!res.ok) throw new Error(String(res.status))
        const data = (await res.json()) as { cabinets?: Cabinet[] }
        if (cancelled) return
        if (data.cabinets && data.cabinets.length > 0) {
          setCabinets(mergeCabinets(CABINETS, data.cabinets))
          setFromDb(true)
        }
      } catch {
        // Keep the built-in fallback.
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const getCabinet = useMemo(() => {
    const byId = new Map(cabinets.map((c) => [c.id, c]))
    return (id: string): Cabinet | undefined => byId.get(id)
  }, [cabinets])

  return { cabinets, getCabinet, loading, fromDb }
}
