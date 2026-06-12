import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SchemaOrgGraph } from "@/components/schema-org"
import { SmoothScroll } from "@/components/v2/smooth-scroll"
import { Preloader } from "@/components/v2/preloader"
import { HeroV2 } from "@/components/v2/hero-v2"
import { StatsMarquee } from "@/components/v2/stats-marquee"
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
      <SmoothScroll>
        <div className="min-h-screen bg-black text-white">
          <Preloader />
          <Navbar />
          <main>
            <HeroV2 />
            <StatsMarquee />
            <Manifesto />
            <ProjectsGallery />
            <ServicesStack />
            <ClientsWall />
            <FooterCTA />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  )
}
