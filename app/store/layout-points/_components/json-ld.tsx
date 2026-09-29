import { manifest, currentRelease, isPublicDownloadEnabled, type ComponentId } from "@/lib/layout-points/release"

export const SITE = "https://www.tc.agency"
export const PRODUCT_URL = `${SITE}/store/layout-points`

type Crumb = { name: string; path: string }

export function breadcrumbJsonLd(trail: Crumb[]) {
  const items = [{ name: "Store", path: "/store" }, { name: "Layout Points", path: "/store/layout-points" }, ...trail]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  }
}

const componentCopy: Record<ComponentId, { category: string; description: string }> = {
  "layout-points": {
    category: "DesignApplication",
    description:
      "Vectorworks plug-in that places, numbers, validates and exports layout points as one checksum-verified field package with Leica-format CONTROL and POINTS files.",
  },
  "datum-label-studio": {
    category: "UtilitiesApplication",
    description:
      "Native macOS application that opens a Layout Points field package, prepares datum labels, calibrates the printer and produces exact-size vector PDF or printed output offline.",
  },
}

/**
 * SoftwareApplication data for one component. Version, download URL, size
 * and offers are only included once the release is public: before that the
 * schema describes the product without claiming a downloadable build.
 */
export function softwareJsonLd(id: ComponentId) {
  const component = manifest.components[id]
  const release = currentRelease(id)
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: component.name,
    applicationCategory: componentCopy[id].category,
    operatingSystem: `macOS ${manifest.platform.minimumMacos} or later`,
    description: componentCopy[id].description,
    url: PRODUCT_URL,
    publisher: { "@type": "Organization", name: manifest.publisher, url: SITE },
    isPartOf: { "@type": "SoftwareApplication", name: manifest.product, url: PRODUCT_URL },
  }
  if (release) {
    data.softwareVersion = release.version
    data.datePublished = release.releaseDate
    data.downloadUrl = release.url
    data.fileSize = `${release.sizeBytes}`
    data.releaseNotes = release.releaseNotesUrl
    if (manifest.publication.commercialModel === "free-beta") {
      data.offers = { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" }
    }
  }
  return data
}

/**
 * Product data needs a real offer. Until the owner has chosen free beta or
 * paid and the release is public, there is no offer to describe, so this
 * returns null rather than emitting an incomplete or invented one.
 */
export function productJsonLd() {
  if (!isPublicDownloadEnabled() || manifest.publication.commercialModel !== "free-beta") return null
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: manifest.product,
    description:
      "Place and number layout points in Vectorworks, export one verified field package, then review, calibrate and print datum labels locally on a Mac.",
    url: PRODUCT_URL,
    brand: { "@type": "Brand", name: "Technically Creative" },
    category: "Software",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${PRODUCT_URL}/download`,
    },
  }
}

export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean)
  return (
    <>
      {list.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Values are static, server-built objects. Escape "<" so nothing
          // in them can close the script element.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  )
}
