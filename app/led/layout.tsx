import type { Metadata } from "next"
import { Space_Mono, Inter } from "next/font/google"
import "./led.css"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-led-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-led-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LED Wall Spec Generator",
  description:
    "TC internal tool. Generate branded LED wall spec sheets, panel maps, and share links.",
  robots: { index: false, follow: false },
}

export default function LedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`led-app ${spaceMono.variable} ${inter.variable} min-h-screen`}>
      {children}
    </div>
  )
}
