import { Barlow_Condensed, IBM_Plex_Mono } from "next/font/google"
import type { ReactNode } from "react"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

import { ProductChrome } from "./_components/product-chrome"
import "./layout-points.css"

// The Datum Label Studio label faces print in these two families.
const labelCond = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-lp-cond",
  display: "swap",
})
const labelMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-lp-mono",
  display: "swap",
})

export default function LayoutPointsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className={`${labelCond.variable} ${labelMono.variable} min-h-screen bg-black text-white [overflow-wrap:anywhere]`}>
        <ProductChrome />
        {children}
      </main>
      <Footer />
    </>
  )
}
