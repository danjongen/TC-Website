import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { Inter, JetBrains_Mono, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Technically Creative | Production Engineering",
    template: "%s | Technically Creative",
  },
  description:
    "High-stakes shows delivered through automation, scalable systems, and systematic execution. End-to-end technical leadership for complex productions.",
  keywords: [
    "production engineering",
    "technical direction",
    "live events",
    "automation",
    "concert production",
    "system integration",
    "workflow automation",
  ],
  authors: [{ name: "Technically Creative" }],
  creator: "Technically Creative",
  publisher: "Technically Creative",
  metadataBase: new URL("https://tc.agency"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tc.agency",
    siteName: "Technically Creative",
    title: "Technically Creative | Production Engineering",
    description: "High-stakes shows delivered through automation, scalable systems, and systematic execution.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Technically Creative - Production Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technically Creative | Production Engineering",
    description: "High-stakes shows delivered through automation, scalable systems, and systematic execution.",
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
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
      >
        {children}
      </body>
    </html>
  )
}
