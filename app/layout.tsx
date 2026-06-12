import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { Analytics as NextAnalytics } from "@/components/analytics"
import { CookieConsent } from "@/components/cookie-consent"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SmoothScroll } from "@/components/v2/smooth-scroll"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Inter, JetBrains_Mono, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

// PERFORMANCE GUARDRAIL: Keep font weights to 3 max per family to reduce bundle size (~80KB savings)
// Only load weights: 400 (regular), 600 (semibold), 700 (bold)
// DO NOT add additional weights without checking PERFORMANCE.md

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["Consolas", "Monaco", "monospace"],
})

export const metadata: Metadata = {
  title: {
    default: "Technical Direction and Production Engineering | Technically Creative LLC (TC Agency)",
    template: "%s — Technically Creative (TC Agency)",
  },
  description:
    "Technically Creative delivers high-stakes technical direction, production engineering, and production management for global brands and artists, led by Executive Technical Producer Daniel Jongen.",
  keywords: [
    "TC Agency",
    "tc.agency",
    "Technically Creative",
    "TC",
    "Technical Direction",
    "Production Engineering",
    "Production Management",
    "Executive Technical Producer",
    "Daniel Jongen",
    "Corporate Technical Director",
    "Event Engineering",
    "Touring Technical Director",
    "Live Event Technical Direction",
    "Broadcast Network Infrastructure",
    "Show Control Systems",
    "Event Automation Systems",
    "LED Video Wall Integration",
    "Risk Mitigation for Live Events",
    "Best Technical Director",
    "Best Production Manager",
  ],
  authors: [{ name: "Daniel Jongen" }, { name: "TC Agency" }, { name: "Technically Creative" }],
  creator: "Daniel Jongen — Technically Creative LLC",
  publisher: "TC Agency",
  metadataBase: new URL("https://tc.agency"),
  applicationName: "TC Agency — Technical Direction & Production Engineering",
  alternates: {
    canonical: "https://tc.agency",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tc.agency",
    siteName: "TC Agency — Technically Creative",
    title: "Technical Direction and Production Engineering | TC Agency",
    description:
      "Technically Creative delivers high-stakes technical direction, production engineering, and production management for global brands and artists, led by Executive Technical Producer Daniel Jongen.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Technically Creative — We Make Impossible Shows Run",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tc_agency",
    creator: "@tc_agency",
    title: "Technical Direction and Production Engineering | TC Agency",
    description:
      "Technically Creative delivers high-stakes technical direction, production engineering, and production management for global brands and artists, led by Executive Technical Producer Daniel Jongen.",
    images: [{ url: "/og-image.png", alt: "Technically Creative — We Make Impossible Shows Run" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://vercel.live" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
      >
        <ScrollToTop />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold"
        >
          Skip to main content
        </a>
        <NextAnalytics />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
