"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "What We Do", href: "#services" },
  { name: "Who We Work With", href: "#clients" },
  { name: "How We Work", href: "#approach" },
  { name: "Get In Touch", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="text-lg sm:text-xl font-bold tracking-tighter uppercase">
          <span className="hidden lg:inline">Technically Creative</span>
          <span className="lg:hidden">TC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-150"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-4 py-2 bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors duration-150"
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
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
            className="fixed inset-0 top-14 sm:top-16 bg-background z-40 md:hidden"
          >
            <nav className="flex flex-col h-full p-6">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-4 text-xl font-bold text-white border-b border-border"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="#contact"
                  className="block w-full px-6 py-4 bg-white text-black text-center text-lg font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Start a Project
                </Link>
              </div>

              <div className="mt-auto pb-8">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-2">Direct Contact</p>
                <a href="mailto:info@tc.agency" className="block text-sm text-white mb-1">
                  info@tc.agency
                </a>
                <a href="tel:+13135551234" className="block text-sm text-muted-foreground">
                  +1 (313) 555-1234
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
