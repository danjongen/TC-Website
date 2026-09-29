import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { CueLabel } from "@/components/motion/cue-label"

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
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/"
            className="-mt-1 mb-11 inline-flex items-center gap-2 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <header className="mb-16">
            <CueLabel className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">LAST UPDATED / NOVEMBER 27, 2025</CueLabel>
            <h1 data-vt="title" data-reveal="rise" className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">
              Do Not Sell or Share My Personal Information
            </h1>
            <div data-reveal="fade" className="text-sm text-zinc-400">
              <p>
                Technically Creative LLC, operating as TC Agency, TC, and Tech Creative ("we", "our", "us", "Technically
                Creative")
              </p>
              <p>Detroit, MI, USA</p>
              <p>
                <a href="mailto:info@tc.agency" className="text-white underline-offset-4 transition-colors duration-300 ease-expo hover:text-[#00D26A] hover:underline">
                  info@tc.agency
                </a>
              </p>
            </div>
          </header>

          <div className="max-w-none space-y-10">
            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Our Commitment</h2>
              <p className="text-zinc-400 leading-relaxed">
                Technically Creative LLC (TC Agency) does not sell your personal information. We do not share your
                personal information for cross-context behavioral advertising. This applies to all visitors, regardless
                of location.
              </p>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Your Rights Under CCPA/CPRA</h2>
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
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Analytics and Tracking</h2>
              <p className="text-zinc-400 leading-relaxed">
                We use analytics tools (Google Analytics 4, Microsoft Clarity) for website performance purposes only.
                These tools are loaded only after you provide consent via our cookie banner. Analytics data is not sold
                or shared with third parties for advertising purposes.
              </p>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Contact Us</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">To exercise your privacy rights or ask questions:</p>
              <div className="my-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">
                    Technically Creative LLC, operating as TC Agency, TC, and Tech Creative
                  </strong>
                  <br />
                  Detroit, MI, USA
                  <br />
                  Email:{" "}
                  <a href="mailto:info@tc.agency" className="text-white underline underline-offset-4 transition-colors duration-300 ease-expo hover:text-[#00D26A]">
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
