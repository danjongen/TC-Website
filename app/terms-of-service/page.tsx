import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | TC Agency",
  description: "TC Agency terms of service and conditions of use.",
  openGraph: {
    title: "Terms of Service | TC Agency",
    description: "TC Agency terms of service and conditions of use.",
    url: "https://tc.agency/terms-of-service",
  },
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <header className="mb-12 border-b border-zinc-800 pb-8">
            <p className="text-xs font-mono text-zinc-500 mb-2">Last updated: November 27, 2025</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <div className="text-sm text-zinc-400">
              <p>
                Technically Creative LLC, operating as TC Agency, TC, and Tech Creative ("we", "our", "us", "Technically
                Creative")
              </p>
              <p>Detroit, MI, USA</p>
              <p>
                <a href="mailto:info@tc.agency" className="text-white hover:underline">
                  info@tc.agency
                </a>
              </p>
              <p>
                <a href="tel:+13132615200" className="text-white hover:underline">
                  +1 313 261 5200
                </a>
              </p>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-zinc-400 leading-relaxed">
                By accessing and using the TC Agency website (tc.agency), you accept and agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Services</h2>
              <p className="text-zinc-400 leading-relaxed">
                TC Agency provides production engineering, technical direction, and live event automation services. This
                website serves as an informational platform about our services and a means to contact us regarding
                potential projects.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Use of Website</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                You agree to use this website only for lawful purposes. You shall not:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Transmit any malicious code, viruses, or harmful data</li>
                <li>Collect or harvest any information from the website without permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p className="text-zinc-400 leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, images, videos, and
                software, is the property of TC Agency or its content suppliers and is protected by copyright,
                trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create
                derivative works without our prior written consent.
              </p>
              {/* Third-Party Trademarks subsection */}
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Third-Party Trademarks</h3>
              <p className="text-zinc-400 leading-relaxed">
                Client names, logos, product marks, event names, and other trademarks displayed on this website are the
                property of their respective owners. Their inclusion does not imply endorsement, and TC Agency does not
                claim ownership of any third-party trademarks. They are used solely for identification, portfolio
                representation, or descriptive purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Project Inquiries</h2>
              <p className="text-zinc-400 leading-relaxed">
                Submitting a project inquiry through our contact form does not create a binding contract or guarantee of
                services. All project engagements are subject to separate agreements and contracts that will be
                negotiated on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Confidentiality</h2>
              <p className="text-zinc-400 leading-relaxed">
                We treat all project inquiries and communications as confidential. However, we recommend not sharing
                sensitive proprietary information through our contact form. Formal confidentiality agreements will be
                established as part of any project engagement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-zinc-400 leading-relaxed">
                This website is provided "as is" without warranties of any kind, either express or implied. We do not
                warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful
                components. We make no warranties about the accuracy or reliability of the content on this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-zinc-400 leading-relaxed">
                To the fullest extent permitted by law, TC Agency shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising out of your access to or use of this website, even
                if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Third-Party Links</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our website may contain links to third-party websites. These links are provided for convenience only. We
                do not endorse or assume responsibility for the content, privacy policies, or practices of any
                third-party websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Indemnification</h2>
              <p className="text-zinc-400 leading-relaxed">
                You agree to indemnify and hold harmless TC Agency and its officers, directors, employees, and agents
                from any claims, damages, losses, liabilities, and expenses arising out of your use of this website or
                violation of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Governing Law</h2>
              <p className="text-zinc-400 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of
                Michigan, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Changes to Terms</h2>
              <p className="text-zinc-400 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                upon posting to this page. Your continued use of the website after changes are posted constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">13. Severability</h2>
              <p className="text-zinc-400 leading-relaxed">
                If any provision of these Terms of Service is found to be unenforceable, the remaining provisions will
                continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">14. Contact Information</h2>
              <p className="text-zinc-400 leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 p-4 mt-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">
                    Technically Creative LLC, operating as TC Agency, TC, and Tech Creative
                  </strong>
                  <br />
                  Detroit, MI, USA
                  <br />
                  Email:{" "}
                  <a href="mailto:info@tc.agency" className="text-white underline">
                    info@tc.agency
                  </a>
                  <br />
                  Phone:{" "}
                  <a href="tel:+13132615200" className="text-white underline">
                    +1 313 261 5200
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
