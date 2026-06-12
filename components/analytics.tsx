"use client"
import { useEffect, useState } from "react"
import Script from "next/script"
import { CONSENT_STORAGE_KEY, CONSENT_CHANGE_EVENT } from "@/components/cookie-consent"

const GA_MEASUREMENT_ID = "G-J8BEX66DS9"
const CLARITY_PROJECT_ID = "ucf0zh9oje"

// Combined Analytics Provider - only renders the GA + Clarity script tags
// once the user has accepted analytics cookies via the consent banner.
export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const readConsent = () => {
      setHasConsent(localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted")
    }

    // Initial check (returning visitors who accepted previously)
    readConsent()

    // Same-tab updates: dispatched by the cookie consent banner on Accept/Decline
    window.addEventListener(CONSENT_CHANGE_EVENT, readConsent)
    // Cross-tab updates via localStorage
    window.addEventListener("storage", readConsent)

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, readConsent)
      window.removeEventListener("storage", readConsent)
    }
  }, [])

  if (!hasConsent) {
    return null
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="microsoft-clarity" strategy="lazyOnload">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `}
      </Script>
    </>
  )
}
