"use client"

import Link from "next/link"

const MATRIX_GREEN = "#00D26A"

export function Footer() {
  return (
    <footer className="py-16 border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-mono text-sm font-bold mb-4">tc.agency</div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Production engineering and executive technical direction for failure-intolerant environments. We name
              risks upfront and only proceed when they're explicitly accepted.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wide text-gray-400 mb-4">Navigation</h4>
            <div className="space-y-2">
              <Link href="/services" className="block text-sm text-gray-600 hover:text-black">
                Services
              </Link>
              <Link href="/approach" className="block text-sm text-gray-600 hover:text-black">
                Approach
              </Link>
              <Link href="/portfolio" className="block text-sm text-gray-600 hover:text-black">
                Case Studies
              </Link>
              <Link href="/contact" className="block text-sm text-gray-600 hover:text-black">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wide text-gray-400 mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <a href="mailto:info@tc.agency" className="block hover:text-black">
                info@tc.agency
              </a>
              <a href="tel:+13132615200" className="block hover:text-black">
                +1 313 261 5200
              </a>
              <p>Detroit, MI</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Technically Creative LLC</p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy-policy" className="hover:text-black">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-black">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
