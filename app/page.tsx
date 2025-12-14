import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Clients } from "@/components/clients"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SchemaOrgGraph } from "@/components/schema-org"

// PERFORMANCE GUARDRAIL: This page MUST remain static for optimal Core Web Vitals.
// DO NOT add: export const dynamic = 'force-dynamic'
// DO NOT use: fetch(..., { cache: 'no-store' })
// See PERFORMANCE.md for guidelines.

// This reduces TTFB from ~2s to <200ms by serving pre-rendered HTML from CDN
// CRITICAL: Do NOT add cookies(), headers(), or searchParams to this page
export const dynamic = "force-static"
export const revalidate = 3600 // Revalidate every 1 hour

export default function Home() {
  return (
    <>
      <SchemaOrgGraph />

      <div className="min-h-screen bg-background text-foreground selection:bg-emerald-900 selection:text-white">
        {/* Header landmark containing navigation */}
        <header role="banner">
          <Navbar />
        </header>

        {/* Main content landmark */}
        <main id="main-content" role="main">
          {/* Hero section with primary H1 */}
          <Hero />

          {/* Client logos section */}
          <Clients />

          {/* Navigation section */}
          <section aria-labelledby="navigation-heading" className="py-24 border-b border-border">
            <div className="container mx-auto px-6">
              {/* Screen reader only heading for section */}
              <h2 id="navigation-heading" className="sr-only">
                Explore TC Production Engineering
              </h2>

              <nav aria-label="Page sections">
                <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 list-none p-0 m-0">
                  {[
                    {
                      title: "About",
                      desc: "Meet the team behind TC Agency",
                      href: "/about",
                      cta: "Meet the Team",
                    },
                    {
                      title: "Services",
                      desc: "Technical direction, automation, and engineering",
                      href: "/services",
                      cta: "View Services",
                    },
                    {
                      title: "Approach",
                      desc: "How we deliver complex productions",
                      href: "/approach",
                      cta: "Learn More",
                    },
                    {
                      title: "Portfolio",
                      desc: "Featured projects and case studies",
                      href: "/portfolio",
                      cta: "See Our Work",
                    },
                    {
                      title: "Insights",
                      desc: "Technical articles and industry perspectives",
                      href: "/insights",
                      cta: "Read Insights",
                    },
                  ].map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="group flex flex-col h-full p-6 border border-border bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-150"
                      >
                        <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.desc}</p>
                        <span className="inline-flex items-center gap-2 text-sm font-mono text-emerald-500">
                          {item.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>
        </main>

        {/* Footer landmark */}
        <Footer />
      </div>
    </>
  )
}
