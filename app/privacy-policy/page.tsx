import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Global Privacy Policy | TC Agency",
  description: "TC Agency global privacy policy covering GDPR, CCPA, PIPEDA, and international data protection.",
  openGraph: {
    title: "Global Privacy Policy | TC Agency",
    description: "TC Agency global privacy policy covering GDPR, CCPA, PIPEDA, and international data protection.",
    url: "https://tc.agency/privacy-policy",
  },
}

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Global Privacy Policy</h1>
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
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-zinc-400 leading-relaxed">
                Technically Creative LLC, operating as TC Agency, TC, and Tech Creative ("we", "our", "us", "Technically
                Creative"), is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                store, disclose, and safeguard personal information when you visit tc.agency or interact with us. This
                policy applies globally and is designed to meet major privacy regulations including GDPR, UK-GDPR,
                CCPA/CPRA, PIPEDA, and the Australia Privacy Act.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Who We Are (Data Controller)</h2>
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">
                    Technically Creative LLC, operating as TC Agency, TC, and Tech Creative
                  </strong>
                  <br />
                  Detroit, Michigan, USA
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
              <p className="text-zinc-400 leading-relaxed mt-4">
                For EU and UK users, we act as a data controller and may appoint a local representative if required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Information We Collect</h2>
              <h3 className="text-lg font-medium text-white mb-2">Information You Provide</h3>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Company (optional)</li>
                <li>Project details or messages you choose to submit</li>
              </ul>

              <h3 className="text-lg font-medium text-white mb-2">Information Collected Automatically</h3>
              <p className="text-zinc-400 leading-relaxed mb-2">
                With your consent (where legally required), we may collect:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>IP address (anonymized where possible)</li>
                <li>Browser and device details</li>
                <li>Pages visited and session duration</li>
                <li>Referring sources</li>
                <li>Clicks, scroll behavior, and anonymized session interactions</li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-4">We do not intentionally collect sensitive data.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Cookies are only activated after consent via our cookie banner.
              </p>

              <div className="bg-zinc-900 border border-zinc-800 p-4 mb-4">
                <p className="text-sm text-zinc-400 mb-2">
                  <strong className="text-white">Google Analytics 4</strong>
                </p>
                <p className="text-sm text-zinc-500">
                  Purpose: Performance analytics
                  <br />
                  Data: Page views, sessions, traffic sources
                  <br />
                  Retention: 14 months
                  <br />
                  Policy:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-white underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Privacy Policy
                  </a>
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <p className="text-sm text-zinc-400 mb-2">
                  <strong className="text-white">Microsoft Clarity</strong>
                </p>
                <p className="text-sm text-zinc-500">
                  Purpose: Heatmaps and session insights
                  <br />
                  Data: Clicks, scrolls, anonymized session behavior
                  <br />
                  Retention: 30 days
                  <br />
                  Policy:{" "}
                  <a
                    href="https://privacy.microsoft.com/en-us/privacystatement"
                    className="text-white underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Privacy Statement
                  </a>
                </p>
              </div>
              <p className="text-zinc-400 leading-relaxed mt-4">
                Users may change or withdraw consent via browser settings or our cookie preferences link.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. How We Use Your Information</h2>
              <p className="text-zinc-400 leading-relaxed mb-2">We use your information to:</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Respond to inquiries and project requests</li>
                <li>Operate, maintain, and improve our website</li>
                <li>Analyze traffic and usage patterns</li>
                <li>Enhance security and prevent fraud</li>
                <li>Comply with legal, tax, and audit obligations</li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-4">
                We do not sell or share your personal data with advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Legal Basis for Processing (GDPR/UK-GDPR)</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>
                  <strong className="text-white">Consent</strong> (analytics and optional information)
                </li>
                <li>
                  <strong className="text-white">Contract</strong> (responding to project requests)
                </li>
                <li>
                  <strong className="text-white">Legitimate interests</strong> (security and internal operations)
                </li>
                <li>
                  <strong className="text-white">Legal obligations</strong> (record-keeping and fraud prevention)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights</h2>
              <p className="text-zinc-400 leading-relaxed mb-2">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion</li>
                <li>Restrict or object to processing</li>
                <li>Withdraw consent</li>
                <li>Request data portability</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-4">
                California residents have additional rights under CCPA/CPRA. We do not sell or share personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Data Retention</h2>
              <p className="text-zinc-400 leading-relaxed">
                We retain personal data only as long as needed to fulfill its purpose or meet legal obligations.
                Analytics data follows each tool's retention settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Data Security</h2>
              <p className="text-zinc-400 leading-relaxed">
                We use technical and organizational measures to protect personal information. No method of transmission
                or storage is perfectly secure, so absolute security cannot be guaranteed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. International Transfers</h2>
              <p className="text-zinc-400 leading-relaxed">
                Your data may be processed outside your country of residence. Where required, we use mechanisms such as
                Standard Contractual Clauses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Third-Party Services</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our website may link to third-party sites. Their privacy practices are not governed by this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Children's Privacy</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our site is not intended for children under 16. We do not knowingly collect data from minors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">13. Changes to This Policy</h2>
              <p className="text-zinc-400 leading-relaxed">
                We may update this Privacy Policy periodically. Material changes will be highlighted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">14. Contact Us</h2>
              <div className="bg-zinc-900 border border-zinc-800 p-4">
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
