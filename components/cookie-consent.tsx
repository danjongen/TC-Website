"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"

type ConsentStatus = "pending" | "accepted" | "declined"

export const CONSENT_STORAGE_KEY = "tc_cookie_consent"
export const CONSENT_CHANGE_EVENT = "tc-consent-changed"

const CONSENT_COOKIE_NAME = CONSENT_STORAGE_KEY

function notifyConsentChange() {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

export function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check for existing consent
    const storedConsent = localStorage.getItem(CONSENT_COOKIE_NAME)
    if (storedConsent === "accepted" || storedConsent === "declined") {
      setConsentStatus(storedConsent as ConsentStatus)
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_COOKIE_NAME, "accepted")
    setConsentStatus("accepted")
    setIsVisible(false)
    // Notify the Analytics component so scripts load immediately (no reload)
    notifyConsentChange()
  }

  const handleDecline = () => {
    localStorage.setItem(CONSENT_COOKIE_NAME, "declined")
    setConsentStatus("declined")
    setIsVisible(false)
    notifyConsentChange()
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible || consentStatus !== "pending") {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 p-4 md:p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-2">Cookie Preferences</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              We use cookies and similar technologies to analyze site traffic and optimize your experience. By clicking
              "Accept", you consent to the use of analytics cookies. You can change your preferences at any time.{" "}
              <Link href="/cookie-policy" className="text-white underline underline-offset-2 hover:text-zinc-300">
                Learn more
              </Link>
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-transparent border border-zinc-600 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                Decline
              </button>
              <Link
                href="/cookie-policy"
                className="px-4 py-2 text-zinc-400 text-xs font-semibold hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 rounded"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
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
