// JSON-LD Structured Data components for SEO
// Provides rich snippets for search engines

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://tc.agency/#organization",
    name: "TC Agency",
    alternateName: ["Technically Creative", "TC", "tc.agency"],
    url: "https://tc.agency",
    logo: {
      "@type": "ImageObject",
      url: "https://tc.agency/og-image.jpg",
      width: 1200,
      height: 630,
    },
    image: "https://tc.agency/og-image.jpg",
    description:
      "TC Agency (tc.agency) is Technically Creative — production engineering, technical direction, and live event automation for high-stakes shows worldwide.",
    email: "info@tc.agency",
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
    slogan: "Technically Creative",
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
    sameAs: [
      "https://www.linkedin.com/company/tc-agency",
      "https://twitter.com/tc_agency",
      "https://www.instagram.com/tc_agency",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://tc.agency/#localbusiness",
    name: "TC Agency",
    image: "https://tc.agency/og-image.jpg",
    url: "https://tc.agency",
    telephone: "+1-555-TC-AGENCY",
    email: "info@tc.agency",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0522,
      longitude: -118.2437,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$$",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 34.0522,
        longitude: -118.2437,
      },
      geoRadius: "5000",
    },
    serviceArea: {
      "@type": "Place",
      name: "Worldwide",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
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
        url: service.url || "https://tc.agency/capabilities",
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
    name: "TC Agency — Technically Creative",
    description: "Production engineering, technical direction, and live event automation.",
    publisher: {
      "@id": "https://tc.agency/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://tc.agency/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
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
