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
                <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
                  {[
                    { title: "About", desc: "Meet Executive Technical Producer Daniel Jongen", href: "/about" },
                    { title: "Services", desc: "Technical services and expertise", href: "/capabilities" },
                    { title: "Our Approach", desc: "How we deliver complex productions", href: "/approach" },
                    { title: "Portfolio", desc: "Featured projects and case studies", href: "/portfolio" },
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
                          Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
