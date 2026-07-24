import type { StaticImageData } from "next/image"

import sslShelfImage from "@/app/sslshelf/hero-show.png"

export type StoreProduct = {
  slug: string
  name: string
  category: string
  description: string
  price: string
  availability: string
  href: string
  image: StaticImageData
  imageAlt: string
}

// Add new products here to place them in the store catalog. A product can link
// to a custom TC Agency page or directly to another destination when needed.
export const storeProducts: readonly StoreProduct[] = [
  {
    slug: "ssl-shelf",
    name: "TC SSL Shelf",
    category: "Console hardware",
    description:
      "A purpose-built SSL console shelf that clips onto the SSL Live top rail in seconds. No tools, drilling or gaffer tape.",
    price: "$69",
    availability: "Available now",
    href: "/sslshelf",
    image: sslShelfImage,
    imageAlt:
      "The TC SSL Shelf mounted on an SSL Live console at front of house, holding a timecode unit.",
  },
]
