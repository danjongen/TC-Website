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
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <header className="mb-16">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">Last updated: November 27, 2025</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">Terms of Service</h1>
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

          {/* Content */}
          <div className="max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-zinc-400 leading-relaxed">
                By accessing and using the TC Agency website (tc.agency), you accept and agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">2. Description of Services</h2>
              <p className="text-zinc-400 leading-relaxed">
                TC Agency provides production engineering, technical direction, and live event automation services. This
                website serves as an informational platform about our services and a means to contact us regarding
                potential projects.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">3. Use of Website</h2>
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
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">4. Intellectual Property</h2>
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
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">5. Project Inquiries</h2>
              <p className="text-zinc-400 leading-relaxed">
                Submitting a project inquiry through our contact form does not create a binding contract or guarantee of
                services. All project engagements are subject to separate agreements and contracts that will be
                negotiated on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">6. Confidentiality</h2>
              <p className="text-zinc-400 leading-relaxed">
                We treat all project inquiries and communications as confidential. However, we recommend not sharing
                sensitive proprietary information through our contact form. Formal confidentiality agreements will be
                established as part of any project engagement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">7. Payment Terms</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>All fees are quoted in USD unless otherwise specified</li>
                <li>Payment is due within 30 days of invoice date unless otherwise agreed in a separate Statement of Work</li>
                <li>Late payments accrue interest at 1.5% per month or the maximum rate permitted by law</li>
                <li>Client is responsible for all costs of collection, including reasonable attorney's fees</li>
                <li>TC Agency reserves the right to suspend services for overdue accounts exceeding 30 days past due</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-zinc-400 leading-relaxed">
                This website is provided "as is" without warranties of any kind, either express or implied. We do not
                warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful
                components. We make no warranties about the accuracy or reliability of the content on this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                To the fullest extent permitted by law, TC Agency shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising out of your access to or use of this website, even
                if we have been advised of the possibility of such damages.
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>In no event shall TC Agency's total cumulative liability exceed the amounts paid by Client in the 12 months preceding the claim</li>
                <li>This limitation applies regardless of the form of action, whether in contract, tort, or otherwise</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">10. Dispute Resolution</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Parties agree to first attempt resolution through good-faith negotiation for 30 days</li>
                <li>If unresolved, disputes shall be submitted to binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules</li>
                <li>Arbitration shall take place in Wayne County, Michigan</li>
                <li>The arbitrator's decision shall be final and binding</li>
                <li>Each party bears its own costs; arbitrator fees split equally</li>
                <li>Nothing in this section prevents either party from seeking injunctive relief in court</li>
                <li>Small claims court actions (under $10,000) are exempt from the arbitration requirement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">11. Third-Party Links</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our website may contain links to third-party websites. These links are provided for convenience only. We
                do not endorse or assume responsibility for the content, privacy policies, or practices of any
                third-party websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">12. Indemnification</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                You agree to indemnify and hold harmless TC Agency and its officers, directors, employees, and agents
                from any claims, damages, losses, liabilities, and expenses arising out of your use of this website or
                violation of these Terms of Service.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                TC Agency shall likewise indemnify and hold harmless Client and its officers, directors, employees, and
                agents from any claims, damages, losses, liabilities, and expenses arising out of TC Agency's gross
                negligence, willful misconduct, or violation of applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">13. Governing Law</h2>
              <p className="text-zinc-400 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of
                Michigan, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">14. Changes to Terms</h2>
              <p className="text-zinc-400 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                upon posting to this page. Your continued use of the website after changes are posted constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">15. Severability</h2>
              <p className="text-zinc-400 leading-relaxed">
                If any provision of these Terms of Service is found to be unenforceable, the remaining provisions will
                continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">16. Contact Information</h2>
              <p className="text-zinc-400 leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4">
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
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
