import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold uppercase tracking-tighter mb-4">TECHNICALLY CREATIVE</div>
            <p className="text-sm text-muted-foreground mb-4">
              Production engineering for high-stakes live events. Automation, precision, and systematic execution.
            </p>
            <p className="text-xs font-mono text-emerald-700">TC Agency / tc.agency</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@tc.agency"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@tc.agency
              </a>
              <a
                href="tel:+13135551234"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (313) 555-1234
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Locations</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Detroit, MI (HQ)</span>
              </p>
              <p className="pl-6">Los Angeles, CA</p>
              <p className="pl-6">Las Vegas, NV</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide mb-4">Services</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Technical Direction</p>
              <p>Production Management</p>
              <p>System Integration</p>
              <p>Workflow Automation</p>
              <p>3D Scanning & Unreal</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Technically Creative (TC Agency). All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
