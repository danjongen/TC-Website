"use client"

import Script from "next/script"

// Google Analytics 4 Component
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Microsoft Clarity Component
export function MicrosoftClarity({ projectId }: { projectId: string }) {
  if (!projectId) return null

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  )
}

// Combined Analytics Provider
export function Analytics() {
  // These IDs should be set as environment variables in production
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || ""

  return (
    <>
      <GoogleAnalytics measurementId={gaId} />
      <MicrosoftClarity projectId={clarityId} />
    </>
  )
}
