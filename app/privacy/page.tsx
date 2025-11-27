import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TC Agency privacy policy, cookie policy, and data protection information.",
  openGraph: {
    title: "Privacy Policy | TC Agency",
    description: "TC Agency privacy policy, cookie policy, and data protection information.",
    url: "https://tc.agency/privacy",
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
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-zinc-500 text-sm">Last updated: November 27, 2025</p>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-zinc-400 leading-relaxed">
                TC Agency ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website tc.agency.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-white mb-2">Information You Provide</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">When you use our contact form, we collect:</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Company name (optional)</li>
                <li>Project details you choose to share</li>
              </ul>

              <h3 className="text-lg font-medium text-white mb-2">Information Collected Automatically</h3>
              <p className="text-zinc-400 leading-relaxed">
                With your consent, we use analytics services that may collect:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>IP address (anonymized)</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Click patterns and scrolling behavior</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Cookies and Tracking Technologies</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to analyze website traffic and improve your experience.
                These are only activated after you provide consent via our cookie banner.
              </p>

              <h3 className="text-lg font-medium text-white mb-2">Analytics Cookies</h3>
              <div className="bg-zinc-900 border border-zinc-800 p-4 mb-4">
                <p className="text-sm text-zinc-400 mb-2">
                  <strong className="text-white">Google Analytics 4</strong>
                </p>
                <p className="text-sm text-zinc-500">
                  Purpose: Understand how visitors interact with our website
                  <br />
                  Data collected: Page views, session duration, traffic sources
                  <br />
                  Retention: 14 months
                  <br />
                  Privacy:{" "}
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
                  Purpose: Understand user behavior through heatmaps and session recordings
                  <br />
                  Data collected: Clicks, scrolls, mouse movements (anonymized)
                  <br />
                  Retention: 30 days
                  <br />
                  Privacy:{" "}
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
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. How We Use Your Information</h2>
              <p className="text-zinc-400 leading-relaxed">We use collected information to:</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Respond to your inquiries and project requests</li>
                <li>Improve our website and services</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Ensure website security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>
                  <strong className="text-white">Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong className="text-white">Rectification:</strong> Request correction of inaccurate data
                </li>
                <li>
                  <strong className="text-white">Erasure:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong className="text-white">Opt-out:</strong> Withdraw consent for analytics tracking at any time
                </li>
                <li>
                  <strong className="text-white">Portability:</strong> Request your data in a portable format
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Managing Cookie Preferences</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">You can manage your cookie preferences at any time:</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Clear your browser's local storage to reset consent preferences</li>
                <li>Use your browser's built-in cookie management settings</li>
                <li>Install browser extensions that block tracking scripts</li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-4">
                Note: Declining analytics cookies will not affect your ability to use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Data Security</h2>
              <p className="text-zinc-400 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Third-Party Services</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices
                of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. International Data Transfers</h2>
              <p className="text-zinc-400 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your data in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Children's Privacy</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our website is not intended for children under 16. We do not knowingly collect personal information from
                children under 16.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
              <p className="text-zinc-400 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Contact Us</h2>
              <p className="text-zinc-400 leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 p-4 mt-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">TC Agency</strong>
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
                  <br />
                  Address: Detroit, MI, USA
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
