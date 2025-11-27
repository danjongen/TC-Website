import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { Analytics as NextAnalytics } from "@/components/analytics"
import { CookieConsent } from "@/components/cookie-consent"
import { ScrollToTop } from "@/components/scroll-to-top"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Inter, JetBrains_Mono, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["Consolas", "Monaco", "monospace"],
})

export const metadata: Metadata = {
  title: {
    default: "TC Agency | Technically Creative — Production Engineering & Technical Direction",
    template: "%s | TC Agency — Technically Creative",
  },
  description:
    "TC Agency (tc.agency) is Technically Creative — the official home for production engineering, technical direction, and live event automation. High-stakes shows delivered through scalable systems and systematic execution. TC Agency provides end-to-end technical leadership for complex productions worldwide.",
  keywords: [
    "TC Agency",
    "tc.agency",
    "Technically Creative",
    "TC",
    "production engineering",
    "technical direction",
    "live events",
    "automation",
    "concert production",
    "system integration",
    "workflow automation",
    "event technology",
    "production management",
    "technical production",
    "live production",
    "touring production",
    "stage automation",
    "3D scanning",
    "aerial surveying",
    "custom fabrication",
    "LED video wall",
    "broadcast engineering",
    "venue technology",
    "show control",
    "live event technology",
    "production systems",
    "technical producer",
    "event engineering",
  ],
  authors: [{ name: "TC Agency" }, { name: "Technically Creative" }],
  creator: "TC Agency — Technically Creative",
  publisher: "TC Agency",
  metadataBase: new URL("https://tc.agency"),
  applicationName: "TC Agency",
  alternates: {
    canonical: "https://tc.agency",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tc.agency",
    siteName: "TC Agency — Technically Creative",
    title: "TC Agency | Technically Creative — Production Engineering & Technical Direction",
    description:
      "TC Agency (tc.agency) is Technically Creative — production engineering, technical direction, and live event automation. The official home for high-stakes show delivery.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TC Agency — Technically Creative | Production Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tc_agency",
    creator: "@tc_agency",
    title: "TC Agency | Technically Creative — Production Engineering",
    description:
      "TC Agency (tc.agency) is Technically Creative — production engineering, technical direction, and live event automation.",
    images: ["/og-image.jpg"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "ADD_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
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
        {children}
        <CookieConsent />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
