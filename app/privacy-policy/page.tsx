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
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">Global Privacy Policy</h1>
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
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">1. Introduction</h2>
              <p className="text-zinc-400 leading-relaxed">
                Technically Creative LLC, operating as TC Agency, TC, and Tech Creative ("we", "our", "us", "Technically
                Creative"), is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                store, disclose, and safeguard personal information when you visit tc.agency or interact with us. This
                policy applies globally and is designed to meet major privacy regulations including GDPR, UK-GDPR,
                CCPA/CPRA, PIPEDA, and the Australia Privacy Act.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">2. Who We Are (Data Controller)</h2>
              <div className="my-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">
                    Technically Creative LLC, operating as TC Agency, TC, and Tech Creative
                  </strong>
                  <br />
                  Detroit, Michigan, USA
                  <br />
                  Email:{" "}
                  <a href="mailto:info@tc.agency" className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]">
                    info@tc.agency
                  </a>
                </p>
              </div>
              <p className="text-zinc-400 leading-relaxed mt-4">
                For EU and UK users, we act as a data controller and may appoint a local representative if required.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">3. Information We Collect</h2>
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
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Cookies are only activated after consent via our cookie banner.
              </p>

              <div className="mb-4">
                <p className="text-sm text-zinc-400 mb-2">
                  <strong className="text-white">Google Analytics 4</strong>
                </p>
                <p className="text-sm text-zinc-400">
                  Purpose: Performance analytics
                  <br />
                  Data: Page views, sessions, traffic sources
                  <br />
                  Retention: 14 months
                  <br />
                  Policy:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Privacy Policy
                  </a>
                </p>
              </div>
              <div className="my-4">
                <p className="text-sm text-zinc-400 mb-2">
                  <strong className="text-white">Microsoft Clarity</strong>
                </p>
                <p className="text-sm text-zinc-400">
                  Purpose: Heatmaps and session insights
                  <br />
                  Data: Clicks, scrolls, anonymized session behavior
                  <br />
                  Retention: 30 days
                  <br />
                  Policy:{" "}
                  <a
                    href="https://privacy.microsoft.com/en-us/privacystatement"
                    className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Privacy Statement
                  </a>
                </p>
              </div>
              <h3 className="text-lg font-medium text-white mb-2 mt-6">Cookie Categories</h3>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                <li>
                  <strong className="text-white">Essential Cookies:</strong> Required for site functionality (session
                  management, security). Cannot be disabled.
                </li>
                <li>
                  <strong className="text-white">Analytics Cookies:</strong> Google Analytics 4 and Microsoft Clarity.
                  Used to understand site usage and improve our services. Can be disabled via cookie preferences.
                </li>
                <li>
                  <strong className="text-white">Functional Cookies:</strong> Remember your preferences (e.g., cookie
                  consent choices). Can be disabled.
                </li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We do not use marketing or advertising cookies.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Users may change or withdraw consent via browser settings or our cookie preferences link.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">5. How We Use Your Information</h2>
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
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">6. Legal Basis for Processing (GDPR/UK-GDPR)</h2>
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
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">7. Your Rights</h2>
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

              <h3 className="text-lg font-medium text-white mb-2 mt-6">Supervisory Authorities</h3>
              <p className="text-zinc-400 leading-relaxed mb-2">
                If you wish to lodge a complaint, you may contact:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                <li>
                  <strong className="text-white">UK:</strong> Information Commissioner&apos;s Office (ICO) at{" "}
                  <a
                    href="https://ico.org.uk"
                    className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ico.org.uk
                  </a>
                </li>
                <li>
                  <strong className="text-white">EU:</strong> Your local data protection authority. A list is available
                  at{" "}
                  <a
                    href="https://edpb.europa.eu"
                    className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    edpb.europa.eu
                  </a>
                </li>
                <li>
                  <strong className="text-white">Australia:</strong> Office of the Australian Information Commissioner
                  (OAIC) at{" "}
                  <a
                    href="https://oaic.gov.au"
                    className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    oaic.gov.au
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-medium text-white mb-2 mt-6">California-Specific Rights (CCPA/CPRA)</h3>
              <p className="text-zinc-400 leading-relaxed mb-2">
                California residents have the following additional rights:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                <li>
                  <strong className="text-white">Right to Know:</strong> You may request disclosure of categories and
                  specific pieces of personal information collected.
                </li>
                <li>
                  <strong className="text-white">Right to Delete:</strong> You may request deletion of personal
                  information, subject to legal exceptions.
                </li>
                <li>
                  <strong className="text-white">Right to Opt-Out:</strong> We do not sell personal information. If this
                  changes, we will provide a &quot;Do Not Sell My Personal Information&quot; link.
                </li>
                <li>
                  <strong className="text-white">Right to Non-Discrimination:</strong> We will not discriminate against
                  you for exercising your privacy rights.
                </li>
              </ul>
              <p className="text-zinc-400 leading-relaxed">
                To exercise these rights, contact us at{" "}
                <a href="mailto:info@tc.agency" className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]">
                  info@tc.agency
                </a>
                . We will respond within 45 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">8. Data Retention</h2>
              <p className="text-zinc-400 leading-relaxed">
                We retain personal data only as long as needed to fulfill its purpose or meet legal obligations.
                Analytics data follows each tool's retention settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">9. Data Security</h2>
              <p className="text-zinc-400 leading-relaxed">
                We use technical and organizational measures to protect personal information. No method of transmission
                or storage is perfectly secure, so absolute security cannot be guaranteed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">10. Data Breach Notification</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                In the event of a data breach affecting your personal information, we will notify affected individuals
                within 72 hours of becoming aware of the breach, as required by GDPR Article 33.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-2">Notification will include:</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                <li>Nature of the breach</li>
                <li>Categories of data affected</li>
                <li>Approximate number of individuals affected</li>
                <li>Likely consequences of the breach</li>
                <li>Measures taken to address the breach</li>
              </ul>
              <p className="text-zinc-400 leading-relaxed">
                We will also notify the relevant supervisory authority where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">11. International Transfers</h2>
              <p className="text-zinc-400 leading-relaxed">
                Your data may be processed outside your country of residence. Where required, we use mechanisms such as
                Standard Contractual Clauses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">12. Third-Party Services</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our website may link to third-party sites. Their privacy practices are not governed by this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">13. Children's Privacy</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our site is not intended for children under 16. We do not knowingly collect data from minors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">14. Changes to This Policy</h2>
              <p className="text-zinc-400 leading-relaxed">
                We may update this Privacy Policy periodically. Material changes will be highlighted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">15. Contact Us</h2>
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
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
