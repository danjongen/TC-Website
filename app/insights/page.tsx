import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { Bell } from "lucide-react"
import { BreadcrumbSchema } from "@/components/structured-data"
import { NewsletterForm } from "@/components/newsletter-form"

export const metadata: Metadata = {
  title: "Insights | TC Agency — Technically Creative",
  description:
    "Technical insights, case studies, and industry perspectives from TC Agency. Deep dives into production engineering, automation, and live event technology.",
  keywords: [
    "production engineering blog",
    "live event case studies",
    "technical direction insights",
    "event technology articles",
    "production automation guides",
  ],
  openGraph: {
    title: "Insights | TC Agency — Technically Creative",
    description: "Technical insights, case studies, and industry perspectives on production engineering.",
    url: "https://tc.agency/insights",
    siteName: "TC Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | TC Agency",
    description: "Technical insights and case studies from the production engineering experts.",
  },
  alternates: {
    canonical: "https://tc.agency/insights",
  },
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Insights", url: "https://tc.agency/insights" },
        ]}
      />

      <Navbar />

      {/* Coming Soon Hero */}
      <section className="pt-32 pb-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-mono text-emerald-500 mb-6 uppercase tracking-widest">06 / Insights</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Coming Soon</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We're preparing technical case studies, production guides, and industry insights from our work on the
              world's most demanding productions. Be the first to know when we launch.
            </p>

            {/* Teaser Topics */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              <div className="p-4 border border-border bg-zinc-950/50">
                <p className="text-xs font-mono text-emerald-500 uppercase mb-2">Case Studies</p>
                <p className="text-sm text-muted-foreground">Behind-the-scenes technical breakdowns</p>
              </div>
              <div className="p-4 border border-border bg-zinc-950/50">
                <p className="text-xs font-mono text-emerald-500 uppercase mb-2">Technical Guides</p>
                <p className="text-sm text-muted-foreground">Best practices for production engineering</p>
              </div>
              <div className="p-4 border border-border bg-zinc-950/50">
                <p className="text-xs font-mono text-emerald-500 uppercase mb-2">Industry Trends</p>
                <p className="text-sm text-muted-foreground">Where live production is heading</p>
              </div>
            </div>

            {/* Newsletter Signup - now using client component */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-mono text-muted-foreground">Get notified when we launch</span>
              </div>
              <NewsletterForm />
              <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
