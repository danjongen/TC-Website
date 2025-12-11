import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Executive Technical Producer Daniel Jongen",
  description:
    "Executive Technical Producer Daniel Jongen leads Technically Creative (TC Agency), overseeing technical direction, production engineering, and high-stakes show execution for global brands, artists, tours, and large-format productions.",
  openGraph: {
    title: "About | Executive Technical Producer Daniel Jongen — TC Agency",
    description:
      "Executive Technical Producer Daniel Jongen leads Technically Creative (TC Agency), overseeing technical direction, production engineering, and high-stakes show execution for global brands, artists, tours, and large-format productions.",
    url: "https://tc.agency/about",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Executive Technical Producer Daniel Jongen — TC Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Executive Technical Producer Daniel Jongen — TC Agency",
    description:
      "Executive Technical Producer Daniel Jongen leads Technically Creative (TC Agency), overseeing technical direction, production engineering, and high-stakes show execution.",
  },
  alternates: {
    canonical: "https://tc.agency/about",
  },
}

export default function AboutPage() {
  const expertise = [
    "Technical Direction",
    "Production Engineering",
    "Production Management",
    "Automation Systems",
    "LED Systems",
    "Broadcast Infrastructure",
    "Show Control",
    "Risk Mitigation",
  ]

  const credentials = [
    { label: "Years Experience", value: "15+" },
    { label: "Global Productions", value: "200+" },
    { label: "Countries", value: "30+" },
    { label: "Fortune 500 Clients", value: "50+" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main id="main-content" className="pt-20">
        {/* Hero Section with Headshot */}
        <section className="py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Headshot placeholder */}
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 border border-border bg-zinc-950 overflow-hidden">
                <Image
                  src="/daniel-headshot.jpg"
                  alt="Executive Technical Producer Daniel Jongen — Technical Direction and Production Engineering leader at TC Agency"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                    Executive Technical Producer
                  </p>
                  <p className="text-xl font-bold text-white">Daniel Jongen</p>
                </div>
              </div>

              {/* Bio Content */}
              <div>
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-gray-400 text-xs font-mono text-gray-200 uppercase tracking-widest">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  About TC Agency
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                  Executive Technical Producer Daniel Jongen
                </h1>

                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    Executive Technical Producer Daniel Jongen leads Technically Creative (TC Agency), overseeing
                    technical direction, production engineering, and high-stakes show execution for global brands,
                    artists, tours, and large-format productions.
                  </p>
                  <p>
                    His work spans automation, LED systems, broadcast infrastructure, show control, and risk mitigation
                    for environments where failure is not an option.
                  </p>
                </div>

                {/* Credentials Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
                  {credentials.map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-3xl font-bold text-emerald-500">{item.value}</p>
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="font-mono text-sm text-gray-400 mb-4 uppercase tracking-wider">Areas of Expertise</p>
              <h2 className="text-3xl font-bold mb-8">Technical Direction & Production Engineering</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 border border-border bg-zinc-950 hover:bg-zinc-900 transition-colors"
                  >
                    <span className="font-mono text-xs text-gray-500">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <p className="font-mono text-sm text-gray-400 mb-4 uppercase tracking-wider">Philosophy</p>
              <h2 className="text-3xl font-bold mb-8">Systems-First Approach</h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  In high-stakes live production, there are no second chances. Every system must be engineered with
                  redundancy, every workflow must be documented, and every team member must know their role.
                </p>
                <p>
                  TC Agency approaches every project with the same rigor whether it is a stadium tour, a corporate
                  keynote, or an immersive brand activation. We engineer systems that work the first time, every time.
                </p>
                <p>
                  Our methodology combines decades of field experience with modern engineering practices: network
                  redundancy, automated failovers, comprehensive documentation, and continuous risk assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Let's discuss how TC Agency can bring technical direction and production engineering expertise to your
              next project.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-colors duration-150"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
