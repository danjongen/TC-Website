"use client"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-J8BEX66DS9"
const CLARITY_PROJECT_ID = "ucf0zh9oje"

// Combined Analytics Provider - only loads if user has consented
export function Analytics() {
  // Only load analytics scripts after user has consented
  // This will be handled by cookie-consent component
  if (typeof window === "undefined") {
    return null
  }

  const hasConsent = localStorage.getItem("tc_cookie_consent") === "accepted"

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
