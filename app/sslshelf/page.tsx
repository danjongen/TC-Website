import type { Metadata } from "next"
import Image from "next/image"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { BuyBox } from "./buy-box"
import heroShow from "./hero-show.png"

const heroAlt =
  "The TC SSL Shelf clipped onto the top rail of an SSL Live L550 console at front of house, holding a timecode unit reading 04.04.24.29."

const description =
  "A shelf for your SSL Live. Clips onto the top rail in seconds and holds your timecode, phone and notes at front of house. No tools, no drilling, no gaffer tape. $89."

export const metadata: Metadata = {
  title: "TC SSL Shelf",
  description,
  alternates: { canonical: "https://tc.agency/sslshelf" },
  openGraph: {
    type: "website",
    url: "https://tc.agency/sslshelf",
    title: "TC SSL Shelf — Somewhere to put it. Finally.",
    description,
    images: [
      { url: heroShow.src, width: heroShow.width, height: heroShow.height, alt: heroAlt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TC SSL Shelf",
    description,
    images: [heroShow.src],
  },
}

// Headline options (kept for quick swaps):
//   A (live): Somewhere to put it. Finally.
//   B:        Your console was missing a shelf.
//   C:        The shelf your console shipped without.
const headline = "Somewhere to put it. Finally."

export default function SslShelfPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        {/* HERO: the real show photo is the centerpiece and the proof. It is
            the LCP element, so it loads with priority. The fixed navbar sits
            transparent over the top of it, matching the home page. */}
        <section className="relative min-h-[92svh] w-full" aria-label="TC SSL Shelf">
          <Image
            src={heroShow}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
          {/* Scrim keeps the overlaid text at AA contrast. */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex min-h-[92svh] w-full max-w-[1600px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            <p className="font-mono text-sm tracking-[0.35em] text-[#00D26A]">
              TC SSL SHELF
            </p>
            <h1 className="mt-4 max-w-[16ch] font-mono text-[clamp(2.2rem,6.5vw,4.75rem)] font-bold leading-[1.08] text-balance text-white">
              {headline}
            </h1>
          </div>
        </section>

        {/* THE ONE BENEFIT LINE */}
        <section className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
          <p className="max-w-[46ch] text-xl leading-relaxed text-zinc-300 md:text-2xl">
            Clips onto the SSL Live top rail in seconds. Holds your timecode,
            phone and notes. No tools, no drilling, no gaffer tape.
          </p>
        </section>

        {/* BUY: one clear action, with colour choice. */}
        <section
          className="mx-auto flex w-full max-w-[1600px] flex-col items-center border-t border-zinc-800 px-6 py-20 text-center md:px-12 md:py-28"
          aria-labelledby="buy-heading"
        >
          <h2 id="buy-heading" className="sr-only">
            Buy the TC SSL Shelf
          </h2>
          <BuyBox />
        </section>
      </main>
      <Footer />
    </>
  )
}
