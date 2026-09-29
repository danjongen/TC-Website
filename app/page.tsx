import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SchemaOrgGraph } from "@/components/schema-org"
import { ShowHud } from "@/components/motion/show-hud"
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
        <Navbar />
        <ShowHud />
        <main id="main-content">
          <CloudHero />
          {/* The curtain: pulled up one viewport so it rises over the pinned
              hero as soon as scrolling starts. The wrapper passes pointer
              events through its transparent edge; the solid body takes them. */}
          <div className="pointer-events-none relative z-10 -mt-[100svh]">
            <div aria-hidden="true" className="h-[28vh] bg-gradient-to-b from-transparent to-black" />
            <div className="pointer-events-auto bg-black">
              <StatsLine />
              <Manifesto />
              <ProjectsGallery />
              <ServicesStack />
              <ClientsWall />
              <FooterCTA />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
