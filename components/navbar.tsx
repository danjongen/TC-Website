"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "APPROACH", href: "/approach" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "INSIGHTS", href: "/insights" },
  { name: "STORE", href: "/sslshelf" },
  { name: "CONTACT", href: "/contact" },
]

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href))
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "border-b border-zinc-900 bg-black/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-6 md:px-12">
          <Link href="/" className="font-mono text-sm font-bold tracking-tight text-white">
            TECHNICALLY_CREATIVE
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-mono text-xs tracking-[0.15em] transition-colors duration-300 hover:text-white ${
                  isActive(pathname, item.href) ? "text-white" : "text-zinc-400"
                }`}
              >
                {item.name}
                {isActive(pathname, item.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#00D26A]" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>

          <button
            className="-mr-2 p-2 text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black lg:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/" className="font-mono text-sm font-bold text-white">
              TECHNICALLY_CREATIVE
            </Link>
            <button className="-mr-2 p-2 text-white" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 p-6 pt-12">
            {navItems.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 text-3xl font-semibold tracking-[-0.02em] ${
                  isActive(pathname, item.href) ? "text-[#00D26A]" : "text-white"
                }`}
              >
                <span className="mr-4 font-mono text-xs text-zinc-400">0{i + 1}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
