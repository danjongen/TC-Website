import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

import { storeProducts } from "./products"

const description =
  "Purpose-built tools for live production, created from problems encountered in the field."

export const metadata: Metadata = {
  title: "Store",
  description,
  alternates: { canonical: "https://tc.agency/store" },
  openGraph: {
    type: "website",
    url: "https://tc.agency/store",
    title: "Store | Technically Creative",
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
    title: "Store | Technically Creative",
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
    url: `https://tc.agency${product.href}`,
  })),
}

export default function StorePage() {
  const productCount = storeProducts.length.toString().padStart(2, "0")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="mx-auto w-full max-w-[1600px] px-6 pb-20 pt-40 md:px-12 md:pb-28 md:pt-48">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            [ STORE — FIELD TOOLS ]
          </p>
          <h1 className="mt-8 max-w-[13ch] text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            Small tools. Real problems solved.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Purpose-built hardware for live production. Each product starts
            with a problem encountered in the field and ends as a tool simple
            enough to disappear into the job.
          </p>
        </section>

        <section
          className="mx-auto w-full max-w-[1600px] border-t border-zinc-800 px-6 py-20 md:px-12 md:py-28"
          aria-labelledby="products-heading"
        >
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                [ 01 — PRODUCTS ]
              </p>
              <h2
                id="products-heading"
                className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
              >
                Built for the field
              </h2>
            </div>
            <p className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              {productCount} {storeProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          <div className="grid gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-2">
            {storeProducts.map((product) => (
              <Link
                key={product.slug}
                href={product.href}
                className="group flex flex-col bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A] focus-visible:ring-inset"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-[0.2em] text-[#00D26A]">
                    {product.availability}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                        {product.category}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
                        {product.name}
                      </h3>
                    </div>
                    <p className="font-mono text-xl font-bold text-white">
                      {product.price}
                    </p>
                  </div>
                  <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">
                    {product.description}
                  </p>
                  <span className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-[#00D26A]">
                    View product →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-800">
          <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-6 py-20 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-28">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                [ 02 — WHAT SHOULD EXIST? ]
              </p>
              <h2 className="mt-5 max-w-[17ch] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                If your crew keeps improvising the same fix, tell us.
              </h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">
                The next useful product usually starts as a recurring field
                problem. Show us the awkward workflow, missing part or thing
                that should already exist.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center bg-[#00D26A] px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              Tell us what is missing →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
