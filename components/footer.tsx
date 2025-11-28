import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

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
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <span className="break-all">info@tc.agency</span>
              </a>
              <a
                href="tel:+13132615200"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
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

          {/* Services */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wide mb-3 sm:mb-4 text-gray-400">Services</h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2 text-sm text-gray-300">
              <Link href="/services/automation" className="hover:text-white transition-colors">
                Workflow Automation
              </Link>
              <Link href="/services/unreal-engine" className="hover:text-white transition-colors">
                Unreal Engine
              </Link>
              <Link href="/services/3d-scanning" className="hover:text-white transition-colors">
                3D Scanning
              </Link>
              <p className="text-gray-400">System Integration</p>
              <p className="text-gray-400">Technical Direction</p>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col gap-6">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/do-not-sell" className="hover:text-white transition-colors">
                Do Not Sell or Share My Personal Information
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
              <Link href="/security" className="hover:text-white transition-colors">
                Security
              </Link>
            </div>

            {/* Copyright and Social */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
              <p className="text-center sm:text-left font-mono">
                © {new Date().getFullYear()} Technically Creative LLC
              </p>
              <a
                href="https://linkedin.com/company/technicallycreative"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
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
