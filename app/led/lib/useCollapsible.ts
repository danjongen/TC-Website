"use client"
import { useEffect, useState } from "react"

/**
 * Per-section collapse state, remembered in localStorage so a section the
 * user minimizes (e.g. the optional INGEST panel) stays that way across
 * visits. Starts from `defaultOpen` on the server / first paint to avoid a
 * hydration mismatch, then reconciles with the stored value after mount.
 */
export function useCollapsible(key: string, defaultOpen = true) {
  const storageKey = `led:collapse:${key}`
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(storageKey)
      if (v !== null) setOpen(v === "1")
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggle() {
    setOpen((o) => {
      const next = !o
      try {
        window.localStorage.setItem(storageKey, next ? "1" : "0")
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return { open, toggle }
}
