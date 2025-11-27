import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand - full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-lg sm:text-xl font-bold uppercase tracking-tighter mb-3 sm:mb-4">
              TECHNICALLY CREATIVE
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Production engineering for high-stakes live events. Automation, precision, and systematic execution.
            </p>
            <p className="text-xs font-mono text-emerald-700">TC Agency / tc.agency</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-3 sm:mb-4">Contact</h4>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="mailto:info@tc.agency"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">info@tc.agency</span>
              </a>
              <a
                href="tel:+13132615200"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +1 313 261 5200
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-3 sm:mb-4">Locations</h4>
            <div className="space-y-1 sm:space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Detroit, MI (HQ)</span>
              </p>
              <p className="pl-6">Los Angeles, CA</p>
              <p className="pl-6">Las Vegas, NV</p>
            </div>
          </div>

          {/* Services */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wide mb-3 sm:mb-4">Services</h4>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2 text-sm text-muted-foreground">
              <Link href="/services/automation" className="hover:text-white transition-colors">
                Workflow Automation
              </Link>
              <Link href="/services/unreal-engine" className="hover:text-white transition-colors">
                Unreal Engine
              </Link>
              <Link href="/services/3d-scanning" className="hover:text-white transition-colors">
                3D Scanning
              </Link>
              <p>System Integration</p>
              <p>Technical Direction</p>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col gap-6">
            {/* Legal Links - Two rows */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p className="text-center sm:text-left">
                © {new Date().getFullYear()} Technically Creative LLC (TC Agency). All rights reserved.
              </p>
              <a
                href="https://linkedin.com/company/tc-agency"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
