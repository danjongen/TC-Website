"use client"

import { useState, useEffect } from "react"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-J8BEX66DS9"
const CLARITY_PROJECT_ID = "ucf0zh9oje"
const CONSENT_COOKIE_NAME = "tc_cookie_consent"

// Google Analytics 4 Component
function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

// Microsoft Clarity Component
function MicrosoftClarity() {
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  )
}

// Combined Analytics Provider - only loads if user has consented
export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_COOKIE_NAME)
    setHasConsent(storedConsent === "accepted")
  }, [])

  // Don't load analytics until user has accepted cookies
  if (!hasConsent) {
    return null
  }

  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  )
}
