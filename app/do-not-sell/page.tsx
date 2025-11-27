import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information | TC Agency",
  description: "TC Agency does not sell or share your personal information. Learn about your CCPA/CPRA rights.",
  openGraph: {
    title: "Do Not Sell or Share My Personal Information | TC Agency",
    description: "TC Agency does not sell or share your personal information. Learn about your CCPA/CPRA rights.",
    url: "https://tc.agency/do-not-sell",
  },
}

export default function DoNotSell() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Do Not Sell or Share My Personal Information
            </h1>
            <p className="text-zinc-500 text-sm">Last updated: November 27, 2025</p>
          </header>

          <div className="prose prose-invert prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Our Commitment</h2>
              <p className="text-zinc-400 leading-relaxed">
                Technically Creative LLC (TC Agency) does not sell your personal information. We do not share your
                personal information for cross-context behavioral advertising. This applies to all visitors, regardless
                of location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Your Rights Under CCPA/CPRA</h2>
              <p className="text-zinc-400 leading-relaxed mb-2">
                If you are a California resident, you have the right to:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Know what personal information we collect</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of the sale or sharing of your personal information</li>
                <li>Non-discrimination for exercising your rights</li>
              </ul>
              <p className="text-zinc-400 leading-relaxed mt-4">
                Since we do not sell or share personal information, there is no need to submit an opt-out request.
                However, if you have questions or wish to exercise other rights, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Analytics and Tracking</h2>
              <p className="text-zinc-400 leading-relaxed">
                We use analytics tools (Google Analytics 4, Microsoft Clarity) for website performance purposes only.
                These tools are loaded only after you provide consent via our cookie banner. Analytics data is not sold
                or shared with third parties for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">To exercise your privacy rights or ask questions:</p>
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">Technically Creative LLC (TC Agency)</strong>
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
