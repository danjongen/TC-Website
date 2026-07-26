import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

import { storeProducts } from "./products"

const description =
  "Purpose-built hardware and software for live production, including the TC SSL Shelf for SSL Live consoles and Power Symbols for Vectorworks."

export const metadata: Metadata = {
  title: "Store — Live Production Field Tools",
  description,
  alternates: { canonical: "https://www.tc.agency/store" },
  openGraph: {
    type: "website",
    url: "https://www.tc.agency/store",
    title: "Live Production Field Tools | Technically Creative",
    description,
    images: [
      {
        url: storeProducts[0].image.src,
        width: storeProducts[0].image.width,
        height: storeProducts[0].image.height,
        alt: storeProducts[0].imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Production Field Tools | Technically Creative",
    description,
    images: [storeProducts[0].image.src],
  },
}

const catalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Technically Creative Store",
  itemListElement: storeProducts.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `https://www.tc.agency${product.href}`,
  })),
}

export default function StorePage() {
  const product = storeProducts[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-36 md:px-12 md:pb-24 md:pt-44">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00D26A]">
            [ Store — Field Tools ]
          </p>
          <h1 className="mt-7 max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Built for the field.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Purpose-built hardware and software for live production. Small
            tools, real problems solved.
          </p>
        </section>

        <section
          className="mx-auto w-full max-w-[1600px] border-t border-zinc-800 px-6 py-16 md:px-12 md:py-24"
          aria-labelledby="hardware-heading"
        >
          <div className="mb-8 flex items-center justify-between gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              [ 01 — Physical tool ]
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00D26A]">
              Available now
            </p>
          </div>

          <Link
            href={product.href}
            className="group grid overflow-hidden border border-zinc-800 bg-zinc-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] focus-visible:ring-inset md:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-[25rem] overflow-hidden bg-zinc-950 md:min-h-[38rem]">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
              <div>
                <div className="flex items-start justify-between gap-5">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {product.category}
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                    {product.price}
                  </p>
                </div>
                <h2
                  id="hardware-heading"
                  className="mt-16 text-4xl font-semibold tracking-[-0.045em] md:text-5xl"
                >
                  {product.name}
                </h2>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[#00D26A]">
                  Somewhere to put it. Finally.
                </p>
                <p className="mt-7 max-w-xl leading-relaxed text-zinc-300">
                  {product.description}
                </p>
              </div>
              <span className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-[#00D26A]">
                View and buy
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>

        <section
          id="power-symbols"
          className="border-t border-zinc-800"
          aria-labelledby="power-symbols-heading"
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
            <div className="mb-8 flex items-center justify-between gap-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                [ 02 — Software tool ]
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
                Paid beta
              </p>
            </div>

            <article className="grid border border-zinc-800 bg-zinc-900/40 md:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-zinc-800 p-7 md:border-b-0 md:border-r md:p-10 lg:p-12">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Plug-in for Vectorworks
                </p>
                <h2
                  id="power-symbols-heading"
                  className="mt-16 text-5xl font-semibold leading-[0.88] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
                >
                  Power
                  <br />
                  Symbols
                </h2>
                <p className="mt-7 max-w-xl leading-relaxed text-zinc-300">
                  Editable power-distribution symbols and a coordinated power
                  schedule for production drawings—without maintaining the same
                  information twice.
                </p>
              </div>

              <div className="flex flex-col justify-end p-7 md:p-10 lg:p-12">
                <ul className="divide-y divide-zinc-800 border-y border-zinc-800 text-sm text-zinc-300">
                  <li className="py-4">Seven production-ready symbol types</li>
                  <li className="py-4">Editable ratings, references and departments</li>
                  <li className="py-4">One-click Power Distribution Schedule</li>
                  <li className="py-4">3D cable routing + length takeoff roadmap</li>
                </ul>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  Vectorworks 2026 · macOS · Beta 0.2.4
                </p>
                <Link
                  href="/store/power-symbols"
                  className="mt-6 flex items-center justify-between bg-[#00D26A] px-6 py-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Get the beta
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-zinc-800">
          <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-6 py-20 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-28">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                [ 03 — What should exist? ]
              </p>
              <h2 className="mt-5 max-w-[17ch] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                If your crew keeps improvising the same fix, tell us.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center border-b border-white py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#00D26A] hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
            >
              Send the field note →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
