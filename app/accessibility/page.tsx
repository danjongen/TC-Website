import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Accessibility Statement | TC Agency",
  description: "TC Agency is committed to digital accessibility. Learn about our WCAG 2.1 AA compliance efforts.",
  openGraph: {
    title: "Accessibility Statement | TC Agency",
    description: "TC Agency is committed to digital accessibility. Learn about our WCAG 2.1 AA compliance efforts.",
    url: "https://tc.agency/accessibility",
  },
}

export default function Accessibility() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <header className="mb-16">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">Last updated: November 27, 2025</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">Accessibility Statement</h1>
            <div className="text-sm text-zinc-400">
              <p>
                Technically Creative LLC, operating as TC Agency, TC, and Tech Creative ("we", "our", "us", "Technically
                Creative")
              </p>
              <p>Detroit, MI, USA</p>
              <p>
                <a href="mailto:info@tc.agency" className="text-white underline-offset-4 transition-colors duration-300 hover:text-[#00D26A] hover:underline">
                  info@tc.agency
                </a>
              </p>
            </div>
          </header>

          <div className="max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Our Commitment</h2>
              <p className="text-zinc-400 leading-relaxed">
                Technically Creative LLC (TC Agency) is committed to ensuring digital accessibility for people with
                disabilities. We continually improve the user experience for everyone and apply relevant accessibility
                standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Standards We Follow</h2>
              <p className="text-zinc-400 leading-relaxed mb-2">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines
                help make web content more accessible to people with disabilities, including:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Visual impairments</li>
                <li>Hearing impairments</li>
                <li>Motor impairments</li>
                <li>Cognitive disabilities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Accessibility Features</h2>
              <p className="text-zinc-400 leading-relaxed mb-2">Our website includes:</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Semantic HTML structure for screen readers</li>
                <li>Keyboard navigation support</li>
                <li>Sufficient color contrast ratios</li>
                <li>Alt text for images</li>
                <li>ARIA labels where appropriate</li>
                <li>Responsive design for various devices and zoom levels</li>
                <li>Focus indicators for interactive elements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Known Limitations</h2>
              <p className="text-zinc-400 leading-relaxed">
                While we strive for full accessibility, some content may not yet be fully accessible. We are actively
                working to identify and fix any issues. If you encounter barriers, please let us know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Feedback</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We welcome your feedback on the accessibility of tc.agency. If you experience any difficulty accessing
                content or have suggestions for improvement, please contact us:
              </p>
              <div className="my-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">
                    Technically Creative LLC, operating as TC Agency, TC, and Tech Creative
                  </strong>
                  <br />
                  Detroit, MI, USA
                  <br />
                  Email:{" "}
                  <a href="mailto:info@tc.agency" className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]">
                    info@tc.agency
                  </a>
                </p>
              </div>
              <p className="text-zinc-400 leading-relaxed mt-4">
                We aim to respond to accessibility feedback within 5 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Enforcement</h2>
              <p className="text-zinc-400 leading-relaxed">
                If you are not satisfied with our response, you may escalate the matter to relevant regulatory bodies in
                your jurisdiction.
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
