"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-tight uppercase">
          TECHNICALLY_CREATIVE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-150 ${
                pathname === item.href ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-4 py-2 bg-signal-orange text-black text-sm font-bold hover:bg-orange-400 transition-colors duration-150"
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 -mr-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-14 sm:top-16 z-50 md:hidden overflow-y-auto"
            style={{ backgroundColor: "#000000" }}
          >
            <nav className="flex flex-col h-full p-6 text-white">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-baseline gap-3 py-4 text-xl font-bold border-b ${
                      pathname === item.href ? "text-white border-gray-700" : "text-gray-200 border-gray-800"
                    }`}
                  >
                    <span className="font-mono text-xs text-gray-500">{String(index + 1).padStart(2, "0")}</span>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="block w-full px-6 py-4 bg-signal-orange text-black text-center text-lg font-bold"
                >
                  Start a Project
                </Link>
              </div>

              <div className="mt-auto pb-8">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wide mb-2">Direct Contact</p>
                <a href="mailto:info@tc.agency" className="block text-sm text-white mb-1">
                  info@tc.agency
                </a>
                <a href="tel:+13132615200" className="block text-sm text-gray-400">
                  +1 313 261 5200
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
