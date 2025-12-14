import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { SchemaOrgGraph } from "@/components/schema-org"

export const dynamic = "force-static"
export const revalidate = 3600

export default function Home() {
  return (
    <>
      <SchemaOrgGraph />
      <div className="min-h-screen bg-white text-black">
        <Navbar />

        <main>
          <Hero />

          {/* Services Section */}
          <section className="py-20 md:py-28 border-b border-gray-200">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What We Do</h2>
              <p className="text-gray-600 mb-12 max-w-2xl">
                Core services built around managing specific risks in failure-intolerant environments.
              </p>

              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                <div>
                  <h3 className="text-xl font-bold mb-4">Technical Direction</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Identify hidden dependencies in partial specs to prevent mid-event failures</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Translate stakeholder requirements into executable technical plans</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Own the "no" when scope threatens delivery timeline</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Production Engineering</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Design signal chains with documented failure modes, not just happy paths</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>
                        Build redundancy at the protocol level—alternative paths that don't depend on one vendor
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Verify power specs: amp draw per phase, ground impedance, backup generator capacity</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Systems Integration</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Map every system handoff and document what happens when it fails</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Build for replaceability: documented APIs, swappable components</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Test failure scenarios before show day, not during</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Automation</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Eliminate manual steps that introduce human error under pressure</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Build repeatable sequences with rollback procedures</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400">—</span>
                      <span>Document runbooks so anyone can execute—not just the person who built it</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Approach Section */}
          <section className="py-20 md:py-28 border-b border-gray-200 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How We Handle Ambiguity</h2>
              <p className="text-gray-600 mb-12 max-w-2xl">
                In live production, incomplete information is the default. We proceed responsibly—not recklessly.
              </p>

              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="bg-white p-8 border border-gray-200">
                  <div className="font-mono text-sm text-gray-400 mb-4">01</div>
                  <h3 className="text-lg font-bold mb-3">Risk Assessment Matrix</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every unclear handoff gets a written confirmation loop. We list what we're assuming and what happens
                    if we're wrong. The client signs off or provides clarity. Either way, it's documented before we
                    deploy.
                  </p>
                </div>

                <div className="bg-white p-8 border border-gray-200">
                  <div className="font-mono text-sm text-gray-400 mb-4">02</div>
                  <h3 className="text-lg font-bold mb-3">Staged Commitments</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We don't sign off on full scope until we've verified assumptions. Each phase has explicit go/no-go
                    criteria. If conditions change, we renegotiate—not scramble.
                  </p>
                </div>

                <div className="bg-white p-8 border border-gray-200">
                  <div className="font-mono text-sm text-gray-400 mb-4">03</div>
                  <h3 className="text-lg font-bold mb-3">Explicit Risk Communication</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We turn down work where risks aren't acknowledged. If a client can't accept that their timeline
                    creates specific failure modes, we're not the right fit.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="py-20 md:py-28 border-b border-gray-200">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Case Studies</h2>
              <p className="text-gray-600 mb-12 max-w-2xl">
                Process over heroics. Here's how we've handled real situations.
              </p>

              <div className="space-y-8">
                <div className="border-l-2 border-gray-300 pl-6 py-2">
                  <h3 className="font-bold mb-2">Global Brand Launch</h3>
                  <p className="text-gray-600 mb-3">
                    Vendor changed LED panel specs 72 hours before load-in. Previous TD had quit. We mapped every signal
                    path, identified three single points of failure, and built workarounds for each. Show ran without
                    downtime.
                  </p>
                  <p className="text-sm text-gray-500 font-mono">
                    Outcome: Zero critical failures. Vendor issue contained. Client relationship preserved.
                  </p>
                </div>

                <div className="border-l-2 border-gray-300 pl-6 py-2">
                  <h3 className="font-bold mb-2">Stadium Concert Series</h3>
                  <p className="text-gray-600 mb-3">
                    Tour management added a last-minute production element that conflicted with venue power capacity. We
                    documented the risk, proposed two alternatives with trade-offs, and let stakeholders decide. They
                    chose the conservative option.
                  </p>
                  <p className="text-sm text-gray-500 font-mono">
                    Outcome: No power issues. Decision documented. Blame avoided.
                  </p>
                </div>

                <div className="border-l-2 border-gray-300 pl-6 py-2">
                  <h3 className="font-bold mb-2">Corporate Event with Political Constraints</h3>
                  <p className="text-gray-600 mb-3">
                    Multiple stakeholders couldn't say no to each other, causing scope to drift weekly. We implemented
                    change documentation with impact statements for each addition. When timeline slipped, the record
                    showed exactly why.
                  </p>
                  <p className="text-sm text-gray-500 font-mono">
                    Outcome: Project delivered late but with documented accountability. No finger-pointing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Client Logos */}
          <section className="py-12 border-b border-gray-200">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale">
                {[
                  { name: "Ford", logo: "/images/ford-logo-flat.png" },
                  { name: "The Sphere", logo: "/images/sphere-logo.jpg" },
                  { name: "Google", logo: "/images/google-favicon-2025.png" },
                  { name: "Samsung", logo: "/images/samsung-orig-wordmark-blue-rgb.png" },
                  { name: "OpenAI", logo: "/images/openai-logo.svg" },
                  { name: "Visa", logo: "/images/visa-logo.webp" },
                ].map((client) => (
                  <div key={client.name} className="relative h-8 w-20">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Client Filter / CTA */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  If you're serious about accountability in high-stakes environments, let's talk.
                </h2>
                <p className="text-gray-600 mb-8">
                  We don't chase miracles. We attract operators who value preparation over panic.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  Start a Project
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
