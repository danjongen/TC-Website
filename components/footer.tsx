"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const MATRIX_GREEN = "#00D26A"

export function Footer() {
  return (
    <footer className="py-12 sm:py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-mono text-sm font-bold uppercase tracking-tight mb-3 sm:mb-4">
              TECHNICALLY_CREATIVE
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Production infrastructure for high-stakes live events.
            </p>
            <p className="text-xs font-mono text-gray-400">tc.agency</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wide mb-3 sm:mb-4 text-gray-400">Contact</h4>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="mailto:info@tc.agency"
                className="flex items-center gap-2 text-sm text-gray-300 transition-colors"
                style={{ ["--hover-color" as string]: MATRIX_GREEN }}
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <span className="break-all">info@tc.agency</span>
              </a>
              <a
                href="tel:+13132615200"
                className="flex items-center gap-2 text-sm text-gray-300 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                +1 313 261 5200
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wide mb-3 sm:mb-4 text-gray-400">
              Locations
            </h4>
            <div className="space-y-1 sm:space-y-2 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <span>
                  Detroit, MI <span className="text-xs text-gray-400">(HQ)</span>
                </span>
              </p>
              <p className="pl-6">Los Angeles, CA</p>
              <p className="pl-6">Las Vegas, NV</p>
            </div>
          </div>

          {/* Services - Only show services with dedicated pages */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wide mb-3 sm:mb-4 text-gray-400">Services</h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2 text-sm text-gray-300">
              <Link
                href="/services/consulting"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
              >
                Executive Consulting
              </Link>
              <Link
                href="/services/automation"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
              >
                Workflow Automation
              </Link>
              <Link
                href="/services/unreal-engine"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
              >
                Unreal Engine
              </Link>
              <Link
                href="/services/3d-scanning"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
              >
                3D Scanning
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col gap-6">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <Link
                href="/privacy-policy"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Cookie Policy
              </Link>
              <Link
                href="/do-not-sell"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Do Not Sell or Share My Personal Information
              </Link>
              <Link
                href="/accessibility"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Accessibility
              </Link>
              <Link
                href="/security"
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Security
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
              <p className="text-center sm:text-left font-mono">
                © {new Date().getFullYear()} Technically Creative LLC
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/about"
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                >
                  About TC Agency
                </Link>
                <Link
                  href="/about#daniel-jongen"
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                >
                  Meet Daniel Jongen →
                </Link>
                <a
                  href="https://linkedin.com/company/technicallycreative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                >
                  LinkedIn
                </a>
              </div>
              <a href="/about-daniel" className="sr-only" aria-hidden="true">
                About Executive Technical Producer Daniel Jongen
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
