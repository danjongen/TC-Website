import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
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

          {/* Risk Ownership Section */}
          <section className="py-24 md:py-32 border-b border-border">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Risk Ownership</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  We don't pitch perfect plans. We name the risks you're already carrying and take ownership of specific
                  failure modes.
                </p>

                <div className="space-y-6 mb-12">
                  <div className="border-l-2 border-gray-700 pl-6">
                    <h3 className="text-xl font-bold mb-2">Political Constraints → Scope Creep</h3>
                    <p className="text-gray-400 leading-relaxed">
                      When stakeholders can't say no, requirements drift. We've seen it turn 3-month builds into 9-month
                      scrambles. We document every assumption change and own the "no" when it protects delivery.
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-700 pl-6">
                    <h3 className="text-xl font-bold mb-2">Vendor Lock-In → Single Points of Failure</h3>
                    <p className="text-gray-400 leading-relaxed">
                      One proprietary system goes dark, the show stops. We've designed around this by building
                      redundancy at the protocol level—not just backup hardware, but alternative signal paths that don't
                      depend on one vendor's uptime.
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-700 pl-6">
                    <h3 className="text-xl font-bold mb-2">Partial Documentation → Cascading Failures</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Incomplete handoffs are the norm. We've seen one missing cable spec cascade into three days of
                      troubleshooting on-site. We structure against it: every system map includes failure modes, not
                      just happy paths.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Client Logos Inline */}
          <section className="py-16 border-b border-border">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-8 items-center opacity-60">
                {[
                  { name: "Ford", logo: "/images/ford-logo-flat.png" },
                  { name: "The Sphere", logo: "/images/sphere-logo.jpg" },
                  { name: "Backstreet Boys", logo: "/images/backstreet-20boys.png" },
                  { name: "Google", logo: "/images/google-favicon-2025.png" },
                  { name: "Samsung", logo: "/images/samsung-orig-wordmark-blue-rgb.png" },
                  { name: "OpenAI", logo: "/images/openai-logo.svg", invert: true },
                  { name: "Visa", logo: "/images/visa-logo.webp" },
                  { name: "Daniel Caesar", logo: "/images/daniel-caesar-logo.png", invert: true },
                  { name: "Jelly Roll", logo: "/images/jelly-roll-logo.png" },
                  { name: "No Doubt", logo: "/images/no-doubt-logo.png" },
                ].map((client) => (
                  <div key={client.name} className="relative h-12 grayscale">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className={`object-contain ${client.invert ? "invert" : ""}`}
                      sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 10vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ambiguity Handling Section */}
          <section className="py-24 md:py-32 border-b border-border">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ambiguity Handling</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Most production environments have incomplete information by default. We proceed responsibly—not
                  recklessly.
                </p>

                <div className="space-y-6">
                  <div className="border-l-2 border-gray-700 pl-6">
                    <h3 className="text-xl font-bold mb-2">We've seen partial info turn into cascading failures</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      A venue says "power is handled"—but doesn't specify phase, grounding, or breaker capacity. Show
                      day, we trip circuits. Now we verify: amp draw per phase, ground impedance, backup generator
                      specs. No assumptions.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      <strong className="text-white">How we structure against it:</strong> Every unclear handoff gets a
                      written confirmation loop. If specs are missing, we list what we're assuming and what happens if
                      we're wrong. The client signs off or provides clarity. Either way, it's documented before we
                      deploy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scalability Section */}
          <section className="py-24 md:py-32 border-b border-border">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Scalability</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Heroic individual effort doesn't scale. We build repeatable processes that work without one person
                  being on-call 24/7.
                </p>

                <div className="space-y-6">
                  <div className="border-l-2 border-gray-700 pl-6">
                    <h3 className="text-xl font-bold mb-2">Documented Runbooks, Not Tribal Knowledge</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We've inherited systems where only one engineer knew the startup sequence. When they left, the
                      system became a black box. We document every critical path: boot order, failover procedures,
                      rollback steps. If it's mission-critical, it's written down.
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-700 pl-6">
                    <h3 className="text-xl font-bold mb-2">Modular Systems, Not Monolithic Dependencies</h3>
                    <p className="text-gray-400 leading-relaxed">
                      One custom script breaks, the whole show stops. We architect for replaceability: video routing
                      that doesn't depend on one software version, control systems with documented APIs, signal chains
                      that can swap components without reconfiguring everything downstream.
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-700 pl-6">
                    <h3 className="text-xl font-bold mb-2">Training Protocols, Not Just Expertise Transfer</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We build training environments that mirror production: same configs, same interfaces, same failure
                      modes. New operators get hands-on practice before show day. Knowledge transfer isn't a handoff
                      meeting—it's structured onboarding with verification checkpoints.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Client Filter Section */}
          <section className="py-24 md:py-32">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Client Filter</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We attract operators who value preparation over panic. If you're looking for someone to promise
                  perfection, we're not the right fit. If you want someone to own specific risks and execute with clear
                  communication when things get ambiguous—let's talk.
                </p>
              </div>
            </div>
          </section>

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
