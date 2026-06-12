import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SchemaOrgGraph } from "@/components/schema-org"
import { CustomCursor } from "@/components/v2/custom-cursor"
import { CloudHero } from "@/components/v2/cloud-hero"
import { StatsLine } from "@/components/v2/stats-marquee"
import { Manifesto } from "@/components/v2/manifesto"
import { ProjectsGallery } from "@/components/v2/projects-gallery"
import { ServicesStack } from "@/components/v2/services-stack"
import { ClientsWall } from "@/components/v2/clients-wall"
import { FooterCTA } from "@/components/v2/footer-cta"

export const dynamic = "force-static"
export const revalidate = 3600

export default function Home() {
  return (
    <>
      <SchemaOrgGraph />
      <div className="min-h-screen bg-black text-white">
        <CustomCursor />
        <Navbar />
        <main>
          <CloudHero />
          <StatsLine />
          <Manifesto />
          <ProjectsGallery />
          <ServicesStack />
          <ClientsWall />
          <FooterCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
