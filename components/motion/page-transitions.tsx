"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

/**
 * Page transitions on the View Transitions API.
 *
 * Every internal link click (plain next/link or <a>) is intercepted in the
 * capture phase, so next/link sees defaultPrevented and stands down. We then
 * run router.push inside document.startViewTransition and resolve the update
 * once the new pathname has committed. CSS in app/globals.css draws the wipe
 * and the green scan line (see "Page transitions" there).
 *
 * Shared-element morphs: inside the clicked link, mark the element that
 * should fly into the next page with data-vt-source="title" or "media". On
 * the destination page, mark the matching element with data-vt="title" or
 * data-vt="media" (one of each per page at most). Kinds without a source
 * stay unnamed for that navigation, so they wipe in with the page instead of
 * fading in on their own.
 *
 * Skipped for: modified clicks, new tabs, downloads, external links, same-page
 * hash or query changes, the /led tool, reduced motion, browsers without the
 * API, and any link with data-transition="off". Those behave exactly as before.
 */

type ViewTransitionLike = { finished: Promise<void>; skipTransition: () => void }
type VTDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => ViewTransitionLike
}

declare global {
  interface Window {
    /** true after the first client-side navigation; lets components tell a cold load from a route change */
    __tcNav?: boolean
  }
}

const KINDS = ["title", "media"] as const
// The old page is frozen on screen until the new route commits. Static routes
// commit in well under 100ms once prefetched; if one is slow, stop waiting
// after this long and let the route land without the wipe.
const FAILSAFE_MS = 1500

function isLed(path: string) {
  return path === "/led" || path.startsWith("/led/")
}

export function PageTransitions() {
  const router = useRouter()
  const pathname = usePathname()
  const routerRef = useRef(router)
  const pending = useRef<(() => void) | null>(null)

  useEffect(() => {
    routerRef.current = router
  }, [router])

  // The new route has committed: let the transition capture it.
  useEffect(() => {
    const finish = pending.current
    if (finish) finish()
  }, [pathname])

  useEffect(() => {
    const doc = document as VTDocument
    if (typeof doc.startViewTransition !== "function") return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const root = document.documentElement

    const navigate = (href: string, anchor: HTMLAnchorElement) => {
      // Name the morph sources inside the clicked link (first of each kind wins).
      const named: HTMLElement[] = []
      const kinds = new Set<string>()
      anchor.querySelectorAll<HTMLElement>("[data-vt-source]").forEach((el) => {
        const kind = el.dataset.vtSource
        if (!kind || !(KINDS as readonly string[]).includes(kind) || kinds.has(kind)) return
        kinds.add(kind)
        el.style.setProperty("view-transition-name", `tc-${kind}`)
        named.push(el)
      })

      // Static destination names stay off while the old page is captured.
      root.dataset.vtStatic = "off"
      window.__tcNav = true

      const transition = doc.startViewTransition!(
        () =>
          new Promise<void>((resolve) => {
            let settled = false
            const finish = (committed: boolean) => {
              if (settled) return
              settled = true
              clearTimeout(timer)
              pending.current = null
              if (!committed) {
                // The route is still loading and the old page is still mounted:
                // re-enabling names now could duplicate one (the old page's own
                // h1 plus the clicked source), and a wipe would only reveal the
                // same page. Skip the animation; the route lands when it lands.
                resolve()
                transition.skipTransition()
                return
              }
              // Re-enable only the destination names that have a source to morph from.
              root.dataset.vtStatic = kinds.size ? [...kinds].join(" ") : "off"
              root.dataset.vtActive = "1"
              resolve()
            }
            const timer = setTimeout(() => finish(false), FAILSAFE_MS)
            pending.current = () => finish(true)
            routerRef.current.push(href)
          }),
      )

      const cleanup = () => {
        delete root.dataset.vtActive
        delete root.dataset.vtStatic
        named.forEach((el) => el.style.removeProperty("view-transition-name"))
      }
      transition.finished.then(cleanup, cleanup)
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (reduce.matches) return
      const target = e.target as Element | null
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target && anchor.target !== "_self") return
      if (anchor.hasAttribute("download") || anchor.dataset.transition === "off") return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return
      if (isLed(url.pathname) || isLed(window.location.pathname)) return
      e.preventDefault()
      if (pending.current) return // a transition is already in flight
      navigate(url.pathname + url.search + url.hash, anchor)
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  // Swept across the viewport during a transition; hidden otherwise.
  return <div id="tc-scanline" aria-hidden="true" />
}
