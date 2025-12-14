import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { SchemaOrgGraph } from "@/components/schema-org"

// PERFORMANCE: Homepage is STATIC for optimal Core Web Vitals
export const dynamic = "force-static"
export const revalidate = 3600

export default function Home() {
  return (
    <>
      <SchemaOrgGraph />

      <div className="min-h-screen bg-white text-black">
        <Navbar />

        <main>
          <section className="pt-32 pb-24 border-b border-gray-200">
            <div className="container mx-auto px-6 max-w-5xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                We Handle Live Production Risks So You Don't Have To Regret Them Later.
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl">
                We've built and exited businesses in high-stakes operations. Seen enough failures from ambiguity to
                know: reliability comes from naming risks upfront, not promising perfection. We deliver systems that
                work—because we acknowledge what can break.
              </p>
            </div>
          </section>

          <section className="py-24 border-b border-gray-200">
            <div className="container mx-auto px-6 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Services</h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Technical Direction</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Identify hidden dependencies in partial specs to prevent mid-event failures</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Map failure modes across multi-vendor systems before rehearsal</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Structure clear escalation paths when things go sideways on show day</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Production Engineering</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Design redundant signal routing that survives single-device failures</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Build load calculations that account for phase imbalance, not just total draw</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Document system topologies so troubleshooting doesn't require the original installer</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Systems Integration</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Verify vendor compatibility before gear hits site, not during load-in</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Build protocol bridges when systems refuse to talk to each other</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Test failover sequences under simulated failure conditions</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Automation</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Remove human error from repetitive cue sequences</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Build runbooks that work when the person who wrote them isn't on-site</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                      <span>Design monitoring that alerts before audiences notice problems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 border-b border-gray-200">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-8 items-center opacity-40">
                {[
                  { name: "Ford", logo: "/images/ford-logo-flat.png" },
                  { name: "The Sphere", logo: "/images/sphere-logo.jpg" },
                  { name: "Backstreet Boys", logo: "/images/backstreet-20boys.png" },
                  { name: "Google", logo: "/images/google-favicon-2025.png" },
                  { name: "Samsung", logo: "/images/samsung-orig-wordmark-blue-rgb.png" },
                  { name: "OpenAI", logo: "/images/openai-logo.svg" },
                  { name: "Visa", logo: "/images/visa-logo.webp" },
                  { name: "Daniel Caesar", logo: "/images/daniel-caesar-logo.png" },
                  { name: "Jelly Roll", logo: "/images/jelly-roll-logo.png" },
                  { name: "No Doubt", logo: "/images/no-doubt-logo.png" },
                ].map((client) => (
                  <div key={client.name} className="relative h-12 grayscale">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 10vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-gray-200">
            <div className="container mx-auto px-6 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Approach</h2>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                Ambiguity is standard in live work. Incomplete drawings, late vendor changes, stakeholder
                disagreements—these aren't edge cases. Here's how we handle it without pretending it doesn't exist.
              </p>

              <div className="space-y-12">
                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold mb-4">Acknowledge It's Standard</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Most projects start with partial information. Venue says "power is handled"—doesn't specify phase,
                    grounding, breaker capacity. Show day, we trip circuits. Now we verify: amp draw per phase, ground
                    impedance, backup generator specs. No assumptions, documented confirmations.
                  </p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold mb-4">Risk Assessment Matrix</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Every unclear handoff gets written confirmation. If specs are missing, we list what we're assuming
                    and what happens if we're wrong. The client signs off or provides clarity. Either way, it's
                    documented before deployment.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We turn down work where risks aren't acknowledged. If stakeholders can't agree on failure tolerance,
                    we don't proceed. Clarity over contracts.
                  </p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold mb-4">Staged Commitments</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Build in phases. Test failover at each stage. If vendor gear doesn't integrate as promised, we know
                    before show day. Budget includes contingency for rework—not because we plan to fail, but because
                    reality rarely matches the RFP.
                  </p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h3 className="text-2xl font-bold mb-4">Transferable System, Not Hero Culture</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Any senior TD could execute this framework. Documented runbooks, modular system architecture,
                    training protocols with verification checkpoints. Knowledge transfer isn't a handoff meeting—it's
                    structured onboarding. We don't build dependency on one person.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-b border-gray-200">
            <div className="container mx-auto px-6 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Case Studies</h2>

              <div className="space-y-16">
                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm font-mono text-gray-400">01</span>
                    <h3 className="text-2xl font-bold">
                      Global Brand Launch: Navigated Late Vendor Changes Without Downtime
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Challenge:</strong> Primary LED vendor pulled out 6 weeks before show. Replacement system
                    had different protocol stack, incompatible control software.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Process:</strong> We'd documented protocol requirements in staging, not just vendor names.
                    Built middleware translator in 72 hours, tested failover with backup content servers. Client saw the
                    risk matrix update—accepted staged rollout rather than demand full rehearsal on original timeline.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Outcome:</strong> Show launched on schedule. Post-event debrief became template for future
                    vendor contingency planning across their events team.
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm font-mono text-gray-400">02</span>
                    <h3 className="text-2xl font-bold">
                      Stadium Residency: Eliminated Single Points of Failure in 90-Show Run
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Challenge:</strong> Artist's creative relied on one proprietary media server. No backup that
                    could hot-swap without reconfiguring entire visual system.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Process:</strong> We didn't redesign the creative. Built parallel signal paths at protocol
                    level—backup server could take over mid-show without operator intervention. Tested failure scenarios
                    weekly during first month. Documented runbook for local crew handoff.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Outcome:</strong> Zero unplanned downtime across 90 shows. When primary server did fail
                    (show 47), automatic failover kept video running. Audience never noticed.
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-sm font-mono text-gray-400">03</span>
                    <h3 className="text-2xl font-bold">
                      Corporate Installation: Removed Founder Dependency from Critical System
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Challenge:</strong> Venue control system required specific engineer on-call 24/7. When they
                    left company, system became black box.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Process:</strong> Reverse-engineered control logic. Documented boot sequences, failover
                    procedures, rollback steps. Built training environment mirroring production. Onboarded three new
                    operators with hands-on verification before original engineer departed.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Outcome:</strong> System uptime maintained. Client now has operational redundancy and
                    documented knowledge base. No heroics required.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="border-l-4 border-black pl-6">
                <p className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                  If you're serious about accountability in high-stakes environments, let's talk. We don't chase
                  miracles.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
                >
                  Start a Conversation
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
