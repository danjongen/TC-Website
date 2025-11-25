import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Clients } from "@/components/clients"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { Showcase } from "@/components/showcase"
import { Work } from "@/components/work"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tc.agency/#organization",
      name: "TC Agency",
      alternateName: ["Technically Creative", "TC", "tc.agency"],
      url: "https://tc.agency",
      logo: {
        "@type": "ImageObject",
        url: "https://tc.agency/og-image.jpg",
      },
      description:
        "TC Agency (tc.agency) is Technically Creative — production engineering, technical direction, and live event automation for high-stakes shows worldwide.",
      email: "info@tc.agency",
      sameAs: [],
      knowsAbout: [
        "Production Engineering",
        "Technical Direction",
        "Live Event Automation",
        "Concert Production",
        "System Integration",
        "Workflow Automation",
        "3D Scanning",
        "Aerial Surveying",
        "Custom Fabrication",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://tc.agency/#website",
      url: "https://tc.agency",
      name: "TC Agency — Technically Creative",
      description:
        "The official website of TC Agency (Technically Creative) — production engineering and technical direction.",
      publisher: {
        "@id": "https://tc.agency/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://tc.agency/#webpage",
      url: "https://tc.agency",
      name: "TC Agency | Technically Creative — Production Engineering & Technical Direction",
      isPartOf: {
        "@id": "https://tc.agency/#website",
      },
      about: {
        "@id": "https://tc.agency/#organization",
      },
      description:
        "TC Agency (tc.agency) is Technically Creative — the official home for production engineering, technical direction, and live event automation.",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://tc.agency/#service",
      name: "TC Agency Production Services",
      provider: {
        "@id": "https://tc.agency/#organization",
      },
      serviceType: [
        "Technical Direction",
        "Production Management",
        "Design & Visualization",
        "Workflow Automation",
        "System Integration",
        "3D Scanning & Unreal",
        "Aerial Surveying",
        "Custom Fabrication",
        "Training & Documentation",
      ],
      areaServed: "Worldwide",
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-background text-foreground selection:bg-emerald-900 selection:text-white">
        <Navbar />
        <Hero />
        <Clients />
        <About />
        <Services />
        <Approach />
        <Showcase />
        <Work />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
