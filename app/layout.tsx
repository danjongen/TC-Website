import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Inter, JetBrains_Mono, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const inter = Inter({
  variable: "--font-geist-sans", // Keeping the variable name consistent with globals.css
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono", // Keeping the variable name consistent with globals.css
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Technically Creative | Production Engineering",
  description: "High-stakes shows delivered through automation, scalable systems, and systematic execution.",
    generator: 'v0.app'
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
