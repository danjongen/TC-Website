import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { Bell } from "lucide-react"
import { BreadcrumbSchema } from "@/components/structured-data"
import { NewsletterForm } from "@/components/newsletter-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Portfolio | TC Agency — Technically Creative",
  description:
    "Featured productions by TC Agency: stadium tours, immersive LED experiences, and technical innovations. Backstreet Boys, The Sphere, Samsung, Ford, and more.",
  keywords: [
    "live event portfolio",
    "concert production case studies",
    "stadium tour technical direction",
    "LED video wall projects",
    "immersive experience production",
    "touring production portfolio",
    "event technology projects",
    "Sphere Las Vegas production",
    "Backstreet Boys tour",
    "Samsung event production",
    "Ford product launch",
  ],
  openGraph: {
    title: "Portfolio | TC Agency — Technically Creative",
    description:
      "Stadium tours, immersive installations, and technical innovations for the world's most demanding productions.",
    url: "https://tc.agency/portfolio",
    siteName: "TC Agency",
    images: [
      {
        url: "/images/dsf3010.jpg",
        width: 1200,
        height: 630,
        alt: "TC Agency portfolio - engineering at scale",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | TC Agency",
    description: "Engineering at scale. Stadium tours, immersive installations, and technical innovations.",
    images: ["/images/dsf3010.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/portfolio",
  },
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Portfolio", url: "https://tc.agency/portfolio" },
        ]}
      />

      <Navbar />

      {/* Coming Soon Hero */}
      <section className="pt-32 pb-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-mono text-emerald-500 mb-6 uppercase tracking-widest">04 / Portfolio</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Coming Soon</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We're curating our most impactful productions—stadium tours, immersive installations, and technical
              innovations that pushed the boundaries of live entertainment. Be the first to explore our work.
            </p>

            {/* Teaser Topics */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              <div className="p-4 border border-border bg-zinc-950/50">
                <p className="text-xs font-mono text-emerald-500 uppercase mb-2">Stadium Tours</p>
                <p className="text-sm text-muted-foreground">Automation systems for global touring artists</p>
              </div>
              <div className="p-4 border border-border bg-zinc-950/50">
                <p className="text-xs font-mono text-emerald-500 uppercase mb-2">Immersive Installations</p>
                <p className="text-sm text-muted-foreground">LED experiences and spatial computing</p>
              </div>
              <div className="p-4 border border-border bg-zinc-950/50">
                <p className="text-xs font-mono text-emerald-500 uppercase mb-2">Brand Activations</p>
                <p className="text-sm text-muted-foreground">Technical production for global launches</p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-mono text-muted-foreground">Get notified when we launch</span>
              </div>
              <NewsletterForm />
              <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
            </div>

            {/* Preview Link */}
            <div className="mt-16 pt-8 border-t border-border">
              <Link
                href="/portfolio/preview"
                className="text-xs font-mono text-muted-foreground hover:text-emerald-500 transition-colors uppercase tracking-widest"
              >
                Team Preview →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
