// JSON-LD Structured Data for ProfessionalService schema
// Disambiguates TC Agency as a Production Engineering firm, not a generic agency

export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://tc.agency/#professionalservice",
    name: "TC Production Engineering",
    legalName: "Technically Creative LLC",
    alternateName: ["TC Agency", "Technically Creative", "TC", "tc.agency"],
    url: "https://tc.agency",
    logo: {
      "@type": "ImageObject",
      url: "https://tc.agency/og-image.jpg",
      width: 1200,
      height: 630,
    },
    image: "https://tc.agency/og-image.jpg",
    description:
      "TC is a production engineering firm specializing in automation, network infrastructure, and risk mitigation for non-repeatable, high-stakes projects.",
    slogan: "Systems & Rigor for High-Stakes Events",

    // Explicit service offerings to disambiguate from generic agencies
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Event Automation Systems",
          description:
            "Custom automation solutions for live event production, including show control, cue systems, and synchronized media playback.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Broadcast Network Infrastructure",
          description:
            "Design and deployment of redundant network systems for broadcast, streaming, and live production environments.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical Risk Mitigation",
          description: "Systematic risk assessment and failover planning for non-repeatable, high-stakes live events.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "LED Video Wall Systems",
          description:
            "Large-format LED display engineering, content management, and real-time visual systems integration.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Production System Integration",
          description:
            "End-to-end technical integration of lighting, video, audio, and automation systems for complex productions.",
        },
      },
    ],

    // Areas of expertise for semantic disambiguation
    knowsAbout: [
      "Event Automation Systems",
      "Broadcast Network Infrastructure",
      "Technical Risk Mitigation",
      "Live Event Production Engineering",
      "Show Control Systems",
      "LED Video Wall Integration",
      "Production System Architecture",
      "Redundant Network Design",
      "Real-Time Media Systems",
      "Touring Production Infrastructure",
    ],

    // Contact and location
    email: "info@tc.agency",
    telephone: "+1-313-261-5200",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Detroit",
      addressRegion: "MI",
      addressCountry: "US",
    },

    // Service area
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceArea: {
      "@type": "GeoShape",
      name: "Global",
    },

    // Business details
    priceRange: "$$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Invoice, Wire Transfer",

    sameAs: ["https://www.linkedin.com/company/technicallycreative"],

    // Parent organization reference
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://tc.agency/#organization",
      name: "Technically Creative LLC",
      legalName: "Technically Creative LLC",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// Graph-based schema combining all entity types for comprehensive SEO
export function SchemaOrgGraph() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization entity
      {
        "@type": "Organization",
        "@id": "https://tc.agency/#organization",
        name: "Technically Creative LLC",
        legalName: "Technically Creative LLC",
        alternateName: ["TC Agency", "TC", "Technically Creative"],
        url: "https://tc.agency",
        logo: {
          "@type": "ImageObject",
          "@id": "https://tc.agency/#logo",
          url: "https://tc.agency/og-image.jpg",
          width: 1200,
          height: 630,
          caption: "TC Production Engineering",
        },
        email: "info@tc.agency",
        telephone: "+1-313-261-5200",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Detroit",
          addressRegion: "MI",
          addressCountry: "US",
        },
        sameAs: ["https://www.linkedin.com/company/technicallycreative"],
      },
      // Website entity
      {
        "@type": "WebSite",
        "@id": "https://tc.agency/#website",
        url: "https://tc.agency",
        name: "TC Production Engineering",
        description: "Systems & Rigor for High-Stakes Events",
        publisher: {
          "@id": "https://tc.agency/#organization",
        },
        inLanguage: "en-US",
      },
      // WebPage entity for homepage
      {
        "@type": "WebPage",
        "@id": "https://tc.agency/#webpage",
        url: "https://tc.agency",
        name: "TC Production Engineering | Systems & Rigor for High-Stakes Events",
        description:
          "TC is a production engineering firm specializing in automation, network infrastructure, and risk mitigation for non-repeatable, high-stakes projects.",
        isPartOf: {
          "@id": "https://tc.agency/#website",
        },
        about: {
          "@id": "https://tc.agency/#professionalservice",
        },
        inLanguage: "en-US",
      },
      // ProfessionalService entity
      {
        "@type": "ProfessionalService",
        "@id": "https://tc.agency/#professionalservice",
        name: "TC Production Engineering",
        description:
          "TC is a production engineering firm specializing in automation, network infrastructure, and risk mitigation for non-repeatable, high-stakes projects.",
        url: "https://tc.agency",
        logo: {
          "@id": "https://tc.agency/#logo",
        },
        image: "https://tc.agency/og-image.jpg",
        telephone: "+1-313-261-5200",
        email: "info@tc.agency",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Detroit",
          addressRegion: "MI",
          addressCountry: "US",
        },
        priceRange: "$$$",
        areaServed: "Worldwide",
        knowsAbout: [
          "Event Automation Systems",
          "Broadcast Network Infrastructure",
          "Technical Risk Mitigation",
          "Live Event Production Engineering",
          "Show Control Systems",
          "LED Video Wall Integration",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Event Automation Systems",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Broadcast Network Infrastructure",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technical Risk Mitigation",
            },
          },
        ],
        parentOrganization: {
          "@id": "https://tc.agency/#organization",
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
