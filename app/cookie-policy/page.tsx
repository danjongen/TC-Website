import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | TC Agency",
  description: "Learn how TC Agency uses cookies and tracking technologies on tc.agency.",
  openGraph: {
    title: "Cookie Policy | TC Agency",
    description: "Learn how TC Agency uses cookies and tracking technologies on tc.agency.",
    url: "https://tc.agency/cookie-policy",
  },
}

export default function CookiePolicy() {
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
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">Cookie Policy</h1>
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
              <p>
                <a href="tel:+13132615200" className="text-white underline-offset-4 transition-colors duration-300 hover:text-[#00D26A] hover:underline">
                  +1 313 261 5200
                </a>
              </p>
            </div>
          </header>

          <div className="max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">1. Introduction</h2>
              <p className="text-zinc-400 leading-relaxed">
                This Cookie Policy explains how Technically Creative LLC, operating as TC Agency ("we", "our", "us"),
                uses cookies and similar technologies on tc.agency. It should be read alongside our{" "}
                <Link href="/privacy-policy" className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">2. What Are Cookies?</h2>
              <p className="text-zinc-400 leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help websites function
                properly, remember preferences, and collect analytics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">3. How We Use Cookies</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                We only load cookies after you provide consent via our cookie banner.
              </p>

              <h3 className="text-lg font-medium text-white mb-2">Essential Cookies</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                These are necessary for basic site functionality, such as storing your cookie consent preference. They
                do not require consent.
              </p>

              <h3 className="text-lg font-medium text-white mb-2">Analytics Cookies</h3>
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
                  Provider: Google LLC
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
                  Provider: Microsoft Corporation
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">4. Managing Cookies</h2>
              <p className="text-zinc-400 leading-relaxed mb-2">You can manage cookies in several ways:</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Use our cookie banner to accept or decline analytics cookies</li>
                <li>Adjust your browser settings to block or delete cookies</li>
                <li>Use browser extensions to control tracking</li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-4">
                Note: Disabling cookies may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">5. Third-Party Cookies</h2>
              <p className="text-zinc-400 leading-relaxed">
                Our analytics providers (Google, Microsoft) may set their own cookies. Their use is governed by their
                respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">6. Updates to This Policy</h2>
              <p className="text-zinc-400 leading-relaxed">
                We may update this Cookie Policy periodically. Changes will be reflected on this page with a new "Last
                updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">7. Contact Us</h2>
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
                  <br />
                  Phone:{" "}
                  <a href="tel:+13132615200" className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]">
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
