"use client"

import Link from "next/link"

const MATRIX_GREEN = "#00D26A"

export function Footer() {
  return (
    <footer className="py-16 border-t border-zinc-800 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-mono text-sm font-bold mb-4 text-white">TECHNICALLY_CREATIVE</div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Production engineering and executive technical direction for failure-intolerant environments. We deliver
              systems that work when it matters most.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wide text-zinc-400 mb-4">Services</h4>
            <div className="space-y-2">
              <Link
                href="/services/consulting"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
                style={{ ["--hover-color" as string]: MATRIX_GREEN }}
              >
                Executive Consulting
              </Link>
              <Link
                href="/services/automation"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                Workflow Automation
              </Link>
              <Link
                href="/services/unreal-engine"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                Unreal Engine
              </Link>
              <Link
                href="/services/3d-scanning"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                3D Scanning
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wide text-zinc-400 mb-4">Company</h4>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                About TC Agency
              </Link>
              <Link
                href="/about#leadership"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                Leadership
              </Link>
              <Link
                href="/portfolio"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                Portfolio
              </Link>
              <Link
                href="/insights"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                Insights
              </Link>
              <Link
                href="/store"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                Store
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-8 border-t border-zinc-800 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-zinc-400 mb-1">Email</p>
              <a
                href="mailto:info@tc.agency"
                className="text-white transition-colors"
              >
                info@tc.agency
              </a>
            </div>
            <div>
              <p className="text-zinc-400 mb-1">Location</p>
              <p className="text-white">Detroit, MI</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Technically Creative LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-zinc-400">
            <Link
              href="/privacy-policy"
              className="transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
