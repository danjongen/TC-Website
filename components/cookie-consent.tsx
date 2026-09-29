"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { DUR, EASE_EXPO } from "@/lib/motion"

export const CONSENT_STORAGE_KEY = "tc_cookie_consent"
export const CONSENT_CHANGE_EVENT = "tc-consent-changed"

const CONSENT_COOKIE_NAME = CONSENT_STORAGE_KEY

/**
 * The banner waits for the visitor's first gesture (they have read the hero
 * and are moving on), with an 8s fallback for anyone who just sits on the
 * first screen. Shown any earlier, the card lands on the hero's intro copy.
 * Nothing is tracked before consent (components/analytics.tsx), so waiting
 * costs nothing on compliance. "Scroll" is read from the gestures that cause
 * it (wheel, touch, keys, scrollbar drag) rather than the scroll event, so a
 * programmatic scroll (scroll restoration, hash jump, route reset) cannot
 * bring it in early.
 */
const SHOW_DELAY_MS = 8000
const INTERACTION_EVENTS = ["wheel", "touchmove", "pointerdown", "keydown"] as const

function notifyConsentChange() {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

function readStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_COOKIE_NAME)
  } catch {
    return null
  }
}

function storeConsent(value: "accepted" | "declined") {
  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, value)
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const stored = readStoredConsent()
    if (stored === "accepted" || stored === "declined") return

    const listenerOptions = { capture: true, passive: true } as const
    const stop = () => {
      window.clearTimeout(timer)
      INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, show, listenerOptions))
    }
    const show = () => {
      stop()
      setIsVisible(true)
    }
    const timer = window.setTimeout(show, SHOW_DELAY_MS)
    INTERACTION_EVENTS.forEach((type) => window.addEventListener(type, show, listenerOptions))
    return stop
  }, [])

  const handleAccept = () => {
    storeConsent("accepted")
    setIsVisible(false)
    // Notify the Analytics component so scripts load immediately (no reload)
    notifyConsentChange()
  }

  const handleDecline = () => {
    storeConsent("declined")
    setIsVisible(false)
    notifyConsentChange()
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const choiceClass =
    "h-9 border font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-150 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          key="cookie-consent"
          role="region"
          aria-label="Cookie consent"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: DUR.ui, ease: EASE_EXPO } }}
          exit={{ opacity: 0, transition: { duration: DUR.micro, ease: EASE_EXPO } }}
          className="fixed bottom-3 left-3 right-3 z-50 border border-zinc-800 bg-zinc-950 p-4 md:bottom-6 md:left-6 md:right-auto md:w-full md:max-w-sm md:p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white">Cookies</h2>
            <button
              type="button"
              onClick={handleClose}
              className="-mr-1 rounded p-1 text-zinc-400 transition-colors duration-150 ease-expo hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
              aria-label="Close cookie banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">
            We use analytics cookies to see how the site is used. Nothing loads until you accept.{" "}
            <Link
              href="/cookie-policy"
              className="text-white underline underline-offset-2 transition-colors duration-150 ease-expo hover:text-zinc-300"
            >
              Cookie policy
            </Link>
          </p>
          {/* Equal weight: same grid cell, height and border. One filled, one outlined. */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className={`${choiceClass} border-white bg-white text-black hover:border-zinc-300 hover:bg-zinc-300`}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className={`${choiceClass} border-zinc-500 bg-transparent text-white hover:border-white hover:bg-zinc-900`}
            >
              Decline
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

// Hook to check consent status
export function useAnalyticsConsent(): boolean {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const readConsent = () => {
      setHasConsent(localStorage.getItem(CONSENT_COOKIE_NAME) === "accepted")
    }
    readConsent()
    window.addEventListener(CONSENT_CHANGE_EVENT, readConsent)
    window.addEventListener("storage", readConsent)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, readConsent)
      window.removeEventListener("storage", readConsent)
    }
  }, [])

  return hasConsent
}
