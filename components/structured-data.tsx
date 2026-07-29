// JSON-LD Structured Data components for SEO
// Provides rich snippets for search engines

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://tc.agency/#organization",
    name: "TC Agency",
    legalName: "Technically Creative LLC",
    alternateName: ["Technically Creative", "TC", "tc.agency", "TC Production Engineering"],
    url: "https://tc.agency",
    logo: {
      "@type": "ImageObject",
      url: "https://tc.agency/og-image.png",
      width: 1200,
      height: 630,
    },
    image: "https://tc.agency/og-image.png",
    description:
      "TC Agency (tc.agency) is Technically Creative - production engineering, technical direction, and live event automation for high-stakes shows worldwide.",
    email: "info@tc.agency",
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Detroit",
      addressRegion: "MI",
      addressCountry: "US",
    },
    slogan: "Systems & Rigor for High-Stakes Events",
    knowsAbout: [
      "Production Engineering",
      "Technical Direction",
      "Live Event Production",
      "System Integration",
      "Workflow Automation",
      "3D Scanning",
      "Unreal Engine",
      "LED Video Walls",
      "Concert Production",
      "Broadcast Engineering",
    ],
    sameAs: ["https://www.linkedin.com/company/technicallycreative"],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://tc.agency/#localbusiness",
    name: "TC Agency - Technically Creative",
    image: "https://tc.agency/og-image.png",
    url: "https://tc.agency",
    email: "info@tc.agency",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Detroit",
      addressRegion: "MI",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.3314,
      longitude: -83.0458,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$$",
    serviceArea: {
      "@type": "Place",
      name: "Worldwide",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ServiceSchema({ services }: { services: { name: string; description: string; url?: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@id": "https://tc.agency/#organization",
        },
        areaServed: "Worldwide",
        url: service.url || "https://tc.agency/services",
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://tc.agency/#website",
    url: "https://tc.agency",
    name: "TC Agency - Technically Creative",
    description: "Production engineering, technical direction, and live event automation for high-stakes events.",
    publisher: {
      "@id": "https://tc.agency/#organization",
    },
    inLanguage: "en-US",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ProjectSchema({
  name,
  description,
  image,
  client,
  datePublished,
}: {
  name: string
  description: string
  image: string
  client: string
  datePublished: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    image,
    creator: {
      "@id": "https://tc.agency/#organization",
    },
    provider: {
      "@id": "https://tc.agency/#organization",
    },
    about: client,
    datePublished,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ServicePageSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@id": "https://tc.agency/#organization",
    },
    areaServed: "Worldwide",
    url,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  url,
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  url: string
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: {
      "@type": "ImageObject",
      url: `https://tc.agency${image}`,
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "Daniel Jongen",
      url: "https://tc.agency/about",
    },
    publisher: {
      "@id": "https://tc.agency/#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
