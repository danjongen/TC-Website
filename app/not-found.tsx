import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          {/* System status indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-muted/50 mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground tracking-wider">ERR_404_NOT_FOUND</span>
          </div>

          {/* Error code */}
          <h1 className="font-mono text-8xl md:text-9xl font-bold tracking-tighter text-foreground/10 mb-4">404</h1>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Navigation options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-border font-medium hover:bg-muted transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/capabilities" className="hover:text-foreground transition-colors text-muted-foreground">
                Services
              </Link>
              <Link href="/approach" className="hover:text-foreground transition-colors text-muted-foreground">
                Approach
              </Link>
              <Link href="/mission" className="hover:text-foreground transition-colors text-muted-foreground">
                Mission
              </Link>
              <Link href="/portfolio" className="hover:text-foreground transition-colors text-muted-foreground">
                Portfolio
              </Link>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
