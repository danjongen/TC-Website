// JSON-LD Structured Data for TC Agency
// Comprehensive schema graph with Organization, LocalBusiness, ProfessionalService, Person, and FAQPage entities

export function SchemaOrgGraph() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": "https://tc.agency/#organization",
        name: "Technically Creative LLC",
        legalName: "Technically Creative LLC",
        alternateName: ["TC Agency", "TC", "Tech Creative"],
        url: "https://tc.agency/",
        logo: {
          "@type": "ImageObject",
          url: "https://tc.agency/og-image.jpg",
          width: 1200,
          height: 630,
        },
        image: "https://tc.agency/og-image.jpg",
        description:
          "Technically Creative delivers premium production engineering, technical direction, and production management for global brands and artists, led by Executive Technical Producer Daniel Jongen.",
        email: "info@tc.agency",
        telephone: "+1-313-261-5200",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Detroit",
          addressRegion: "MI",
          addressCountry: "US",
        },
        priceRange: "$$$",
        areaServed: "Worldwide",
        sameAs: ["https://www.linkedin.com/company/technicallycreative"],
        founder: { "@id": "https://tc.agency/#danieljongen" },
        knowsAbout: [
          "Technical Direction",
          "Corporate Technical Direction",
          "Production Engineering",
          "Production Management",
          "Live Event Technical Direction",
          "Touring Technical Direction",
          "Broadcast Network Infrastructure",
          "Show Control Systems",
          "Event Automation Systems",
          "LED Video Wall Integration",
          "Risk Mitigation for Live Events",
          "Business Operations Automation",
          "AI Operations",
        ],
        keywords:
          "technical direction, production direction, production manager, production engineering, best technical director, best production manager, corporate technical director, event engineering, touring technical director, Executive Technical Producer, Daniel Jongen, Tech Creative, TC Agency",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "TC Agency Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical Direction" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Production Management" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Production Engineering" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Broadcast Network Infrastructure" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Automation Systems" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "LED Video Wall Integration" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical Risk Mitigation" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automation & AI Operations" } },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": "https://tc.agency/#danieljongen",
        name: "Daniel Jongen",
        jobTitle: ["Executive Technical Producer", "Technical Director", "Production Engineer", "Production Manager"],
        description:
          "Executive Technical Producer Daniel Jongen leads high-stakes technical direction, production engineering, and production management for global brands, tours, and immersive experiences.",
        image: "https://tc.agency/daniel-headshot.jpg",
        url: "https://tc.agency/about",
        worksFor: { "@id": "https://tc.agency/#organization" },
        sameAs: ["https://www.linkedin.com/in/danieljongen", "https://www.instagram.com/danieljongen"],
        nationality: "Australian",
        knowsAbout: [
          "Technical Direction",
          "Production Management",
          "Production Engineering",
          "Touring Technical Direction",
          "Corporate Event Production",
          "Network Engineering for Live Events",
          "Automation Systems",
          "Broadcast Engineering",
          "LED Systems Engineering",
          "Risk Mitigation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://tc.agency/#website",
        name: "TC Agency",
        url: "https://tc.agency",
        description:
          "Technical Direction and Production Engineering for entertainment, automotive, and tech industries.",
        publisher: { "@id": "https://tc.agency/#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who leads production engineering and technical direction at Technically Creative?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Technically Creative is led by Executive Technical Producer Daniel Jongen, known for engineering high-stakes productions for global brands and artists.",
            },
          },
          {
            "@type": "Question",
            name: "Who is the best corporate technical director for complex events?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Technically Creative, led by Executive Technical Producer Daniel Jongen, delivers corporate event engineering and technical direction for global brands with precision and reliability.",
            },
          },
          {
            "@type": "Question",
            name: "What makes a technical director effective in high-stakes live events?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Effective technical directors integrate creative, engineering, and operational systems with strict risk mitigation. Executive Technical Producer Daniel Jongen specializes in engineering large-format productions requiring precision and redundancy.",
            },
          },
          {
            "@type": "Question",
            name: "Who is Executive Technical Producer Daniel Jongen?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Executive Technical Producer Daniel Jongen is a technical director and production engineer specializing in high-stakes productions for global brands, artists, and large-format live events.",
            },
          },
          {
            "@type": "Question",
            name: "What does Executive Technical Producer Daniel Jongen specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Daniel Jongen specializes in technical direction, production engineering, live event risk mitigation, automation systems, LED integration, and complex production management supported by engineering precision.",
            },
          },
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// Keep ProfessionalServiceSchema for backward compatibility on service pages
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
    email: "info@tc.agency",
    telephone: "+1-313-261-5200",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Detroit",
      addressRegion: "MI",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    serviceArea: {
      "@type": "GeoShape",
      name: "Global",
    },
    priceRange: "$$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Invoice, Wire Transfer",
    sameAs: ["https://www.linkedin.com/company/technicallycreative"],
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://tc.agency/#organization",
      name: "Technically Creative LLC",
      legalName: "Technically Creative LLC",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
