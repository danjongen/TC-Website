import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting TC Agency. We'll be in touch within 24 hours.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 01 — CONFIRMED ]</p>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">
              Message received.
            </h1>

            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl mb-16">
              Thank you for reaching out. Our team reviews every inquiry personally.
            </p>

            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 02 — EXPECTED RESPONSE ]</p>
            <div>
              <div className="py-6 grid grid-cols-2 gap-6 items-baseline">
                <p className="font-mono text-xs tracking-[0.2em] text-zinc-400">INITIAL RESPONSE</p>
                <p className="text-lg leading-relaxed text-white">Within 24 hours</p>
              </div>
              <div className="h-px bg-zinc-900" aria-hidden="true" />
              <div className="py-6 grid grid-cols-2 gap-6 items-baseline">
                <p className="font-mono text-xs tracking-[0.2em] text-zinc-400">DISCOVERY CALL</p>
                <p className="text-lg leading-relaxed text-white">Within 48-72 hours</p>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-zinc-400 max-w-xl mt-16 mb-12">
              For urgent production inquiries, call directly:{" "}
              <a
                href="tel:+13132615200"
                className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-[#00D26A]"
              >
                +1 313 261 5200
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              <Link
                href="/"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                BACK TO HOME →
              </Link>
              <Link
                href="/portfolio"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                VIEW OUR WORK →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
