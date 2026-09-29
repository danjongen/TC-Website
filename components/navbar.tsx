"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { DUR, EASE_EXPO, STAGGER } from "@/lib/motion"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "APPROACH", href: "/approach" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "INSIGHTS", href: "/insights" },
  { name: "STORE", href: "/store" },
  { name: "CONTACT", href: "/contact" },
]

function isActive(pathname: string, href: string) {
  if (href === "/store" && pathname === "/sslshelf") {
    return true
  }

  return pathname === href || (href !== "/" && pathname.startsWith(href))
}

/**
 * The single nav item that owns the green underline, or null. The underline
 * carries view-transition-name "tc-nav-active", which must be unique in the
 * document (a duplicate aborts the page transition), so this always resolves
 * to one href: the longest one that matches.
 */
function activeHref(pathname: string) {
  let best: string | null = null
  for (const item of navItems) {
    if (isActive(pathname, item.href) && (best === null || item.href.length > best.length)) best = item.href
  }
  return best
}

const FOCUSABLE = "a[href], button:not(:disabled)"
const DESKTOP = "(min-width: 1024px)"

type LenisLike = { stop: () => void; start: () => void }

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)
  const reduce = useReducedMotion()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const restoreFocus = useRef(false)
  const current = activeHref(pathname)

  // Close the menu on route change (state adjusted during render, not in an effect).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  // While open: lock scroll, move focus in, trap Tab, close on Escape.
  // After close: hand focus back to the toggle.
  useEffect(() => {
    if (!isOpen) {
      if (restoreFocus.current) {
        restoreFocus.current = false
        toggleRef.current?.focus({ preventScroll: true })
      }
      return
    }
    restoreFocus.current = true

    const lenis = (window as unknown as { lenis?: LenisLike }).lenis
    document.body.style.overflow = "hidden"
    lenis?.stop()

    let raf = 0
    if (closeRef.current) closeRef.current.focus({ preventScroll: true })
    else raf = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }))

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        setIsOpen(false)
        return
      }
      const menu = menuRef.current
      if (e.key !== "Tab" || !menu) return
      const items = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (!menu.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    // The overlay is lg:hidden; if the viewport grows past it, close so the lock releases.
    const desktop = window.matchMedia(DESKTOP)
    const onDesktop = () => {
      if (desktop.matches) setIsOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onDesktop)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onDesktop)
      document.body.style.overflow = ""
      lenis?.start()
    }
  }, [isOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const ariaCurrent = (href: string) => (href === current ? (pathname === href ? "page" : "true") : undefined)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-600 ease-expo ${
          scrolled ? "border-b border-zinc-900 bg-black/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link href="/" className="py-1 font-mono text-sm font-bold tracking-tight text-white">
            TECHNICALLY_CREATIVE
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.map((item) => {
              const active = item.href === current
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={ariaCurrent(item.href)}
                  className={`group relative py-1 font-mono text-xs tracking-[0.15em] transition-colors duration-300 ease-expo hover:text-white focus-visible:text-white ${
                    active ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {item.name}
                  {active ? (
                    // Named so it slides to the new item during a page transition.
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-[#00D26A]"
                      style={{ viewTransitionName: "tc-nav-active" }}
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-zinc-500 transition-transform duration-300 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 p-2 text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          // Scrolls on its own on short viewports; data-lenis-prevent lets native scroll through while Lenis is stopped.
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-black lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={
              reduce
                ? { opacity: 1, transition: { duration: DUR.micro, ease: EASE_EXPO } }
                : { clipPath: "inset(0 0 0% 0)", transition: { duration: DUR.reveal, ease: EASE_EXPO } }
            }
            exit={
              reduce
                ? { opacity: 0, transition: { duration: DUR.micro, ease: EASE_EXPO } }
                : { clipPath: "inset(0 0 100% 0)", transition: { duration: DUR.ui, ease: EASE_EXPO } }
            }
          >
            <div className="flex h-16 items-center justify-between px-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="py-1 font-mono text-sm font-bold text-white">
                TECHNICALLY_CREATIVE
              </Link>
              <button
                ref={closeRef}
                type="button"
                className="-mr-2 p-2 text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Primary" className="flex flex-col gap-2 p-6 pt-12">
              {navItems.map((item, i) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={ariaCurrent(item.href)}
                  className={`block py-3 text-3xl font-semibold tracking-[-0.02em] ${
                    item.href === current ? "text-[#00D26A]" : "text-white"
                  }`}
                >
                  {/* Mask: the line rises out of its own box. The clip sits inside the link so its focus ring is not cut. */}
                  <span className="block overflow-hidden">
                    <m.span
                      className="block"
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: DUR.reveal, ease: EASE_EXPO, delay: DUR.micro + i * STAGGER }}
                    >
                      <span className="mr-4 font-mono text-xs text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
                      {item.name}
                    </m.span>
                  </span>
                </Link>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
