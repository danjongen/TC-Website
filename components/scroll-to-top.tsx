"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Resets scroll on route change. Skipped when the URL carries a hash
 * (e.g. /about#daniel-jongen) so anchor links land on their target.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.location.hash) return
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void } }).lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])

  return null
}
