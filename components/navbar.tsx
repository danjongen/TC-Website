"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const MATRIX_GREEN = "#00D26A"

const navItems = [
  { name: "Mission", href: "/mission" },
  { name: "Services", href: "/capabilities" },
  { name: "Approach", href: "/approach" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Insights", href: "/insights" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 border-b border-neutral-800"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-tight uppercase text-white"
          >
            TECHNICALLY_CREATIVE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname === item.href ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-bold transition-all duration-150 glow-matrix-hover"
              style={{ backgroundColor: MATRIX_GREEN, color: "#000000" }}
            >
              Start a Project
            </Link>
          </nav>

          <button
            className="md:hidden p-2 -mr-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            style={{ color: "#ffffff" }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: "#000000" }}>
          {/* Menu header matching main header */}
          <div
            className="h-14 sm:h-16 border-b flex items-center justify-between px-4 sm:px-6"
            style={{ borderColor: "#262626", backgroundColor: "#000000" }}
          >
            <Link
              href="/"
              className="font-mono text-xs sm:text-sm font-bold tracking-tight uppercase"
              style={{ color: "#ffffff" }}
            >
              TECHNICALLY_CREATIVE
            </Link>
            <button
              className="p-2 -mr-2"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              style={{ color: "#ffffff" }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu content */}
          <nav className="flex flex-col h-full p-6 overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-baseline gap-3 py-4 text-xl font-bold border-b"
                  style={{
                    color: pathname === item.href ? "#ffffff" : "#e5e5e5",
                    borderColor: "#333333",
                  }}
                >
                  <span className="font-mono text-xs" style={{ color: "#666666" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full px-6 py-4 text-center text-lg font-bold"
                style={{ backgroundColor: MATRIX_GREEN, color: "#000000" }}
              >
                Start a Project
              </Link>
            </div>

            <div className="mt-auto pb-8">
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "#666666" }}>
                Direct Contact
              </p>
              <a href="mailto:info@tc.agency" className="block text-sm mb-1" style={{ color: "#ffffff" }}>
                info@tc.agency
              </a>
              <a href="tel:+13132615200" className="block text-sm" style={{ color: "#999999" }}>
                +1 313 261 5200
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
