import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

import { BuyBox } from "./buy-box"
import heroShow from "./hero-show.png"
import shelfBlack from "./shelf-black.jpg"
import shelfOrange from "./shelf-orange.jpg"
import shelfRed from "./shelf-red.jpg"
import shelfTitanGrey from "./shelf-titan-grey.jpg"

const canonicalUrl = "https://tc.agency/sslshelf"
const heroAlt =
  "The TC SSL Shelf clipped onto the top rail of an SSL Live L550 console at front of house, holding a timecode unit."
const description =
  "Buy the TC SSL Shelf, a 3D-printed PLA-CF console shelf made for the top rail of SSL Live consoles. Five colours, $89, with customer-selected shipping."

export const metadata: Metadata = {
  title: { absolute: "SSL Console Shelf for SSL Live | TC SSL Shelf" },
  description,
  keywords: [
    "SSL console shelf",
    "SSL Live shelf",
    "SSL Live console accessories",
    "audio console shelf",
    "front of house console shelf",
    "TC SSL Shelf",
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "TC SSL Shelf — Console Shelf for SSL Live",
    description,
    images: [
      {
        url: heroShow.src,
        width: heroShow.width,
        height: heroShow.height,
        alt: heroAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TC SSL Shelf — Console Shelf for SSL Live",
    description,
    images: [heroShow.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "TC SSL Shelf",
  alternateName: "SSL Console Shelf for SSL Live",
  description,
  sku: "TC-SSL-SHELF",
  url: canonicalUrl,
  image: [
    heroShow,
    shelfBlack,
    shelfTitanGrey,
    shelfOrange,
    shelfRed,
  ].map((image) => new URL(image.src, canonicalUrl).toString()),
  brand: {
    "@type": "Brand",
    name: "Technically Creative",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Technically Creative LLC",
    url: "https://tc.agency",
  },
  material: "3D-printed PLA-CF",
  color: ["Matcha Green", "Black", "Titan Grey", "Orange", "Red"],
  itemCondition: "https://schema.org/NewCondition",
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Compatibility",
      value: "SSL Live console top rail",
    },
    {
      "@type": "PropertyValue",
      name: "Production lead time",
      value: "Up to two weeks before dispatch when made to order",
    },
  ],
  offers: {
    "@type": "Offer",
    url: canonicalUrl,
    priceCurrency: "USD",
    price: "89.00",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: "Technically Creative LLC",
    },
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Store",
      item: "https://tc.agency/store",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "TC SSL Shelf",
      item: canonicalUrl,
    },
  ],
}

export default function SslShelfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <section className="mx-auto w-full max-w-[1600px] px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500"
          >
            <Link href="/store" className="transition-colors hover:text-white">
              Store
            </Link>
            <span className="mx-3" aria-hidden="true">
              /
            </span>
            <span className="text-zinc-300">TC SSL Shelf</span>
          </nav>
          <BuyBox />
        </section>

        <section className="border-t border-zinc-800">
          <div className="mx-auto grid w-full max-w-[1600px] gap-8 px-6 py-16 md:grid-cols-[0.7fr_1.3fr] md:px-12 md:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#00D26A]">
              [ Designed for the field ]
            </p>
            <p className="max-w-[48rem] text-xl leading-relaxed text-zinc-300 md:text-2xl">
              Built around the real top rail of an SSL Live console, with a
              low-profile clip-on fit that keeps useful FOH essentials close
              without permanently modifying the desk.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
