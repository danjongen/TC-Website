import type { ReactNode } from "react"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

import { ProductChrome } from "./_components/product-chrome"
import "./layout-points.css"

export default function LayoutPointsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-black text-white [overflow-wrap:anywhere]">
        <ProductChrome />
        {children}
      </main>
      <Footer />
    </>
  )
}
