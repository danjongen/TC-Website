import type { Metadata } from "next"

import { PRODUCT_URL } from "./json-ld"

// The generated share card (opengraph-image.tsx) lives on the product
// route. Sub-pages point at it explicitly, because a page that sets its own
// openGraph object does not inherit the parent segment's image.
const shareImage = {
  url: `${PRODUCT_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Layout Points + Datum Label Studio. From Vectorworks datum to physical datum.",
}

export function subPageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string
  description: string
  path: string
  type?: "website" | "article"
}): Metadata {
  const url = `${PRODUCT_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type, url, title: `${title} | Technically Creative`, description, images: [shareImage] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  }
}
