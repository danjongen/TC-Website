"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Approach", href: "#approach" },
  { name: "About", href: "#about" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
          {/* Switched to lg breakpoint to prevent text cutoff on tablets */}
          <span className="hidden lg:inline">Technically Creative</span>
          <span className="lg:hidden">TC</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#contact"
            className="px-4 py-2 bg-white text-black text-sm font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors"
          >
            Talk to our team
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 left-0 right-0 bg-background border-b border-border p-6 md:hidden flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-white uppercase tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-4 py-3 bg-white text-black text-center text-sm font-bold uppercase tracking-wide"
            onClick={() => setIsOpen(false)}
          >
            Talk to our team
          </Link>
        </motion.div>
      )}
    </header>
  )
}
