import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SchemaOrgGraph } from "@/components/schema-org"
import { ShowHud } from "@/components/motion/show-hud"
import { CloudHero } from "@/components/v2/cloud-hero"
import { Embers } from "@/components/v2/embers"
import { StatsLine } from "@/components/v2/stats-marquee"
import { Manifesto } from "@/components/v2/manifesto"
import { ProjectsGallery } from "@/components/v2/projects-gallery"
import { ServicesStack } from "@/components/v2/services-stack"
import { ClientsWall } from "@/components/v2/clients-wall"
import { FooterCTA } from "@/components/v2/footer-cta"

/** An eased (ease-in-out) ramp to black, in the style of a film scrim. */
const CURTAIN_EDGE =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.013) 8.1%, rgba(0,0,0,0.049) 15.5%, rgba(0,0,0,0.104) 22.5%, rgba(0,0,0,0.175) 29%, rgba(0,0,0,0.259) 35.3%, rgba(0,0,0,0.352) 41.2%, rgba(0,0,0,0.45) 47.1%, rgba(0,0,0,0.55) 52.9%, rgba(0,0,0,0.648) 58.8%, rgba(0,0,0,0.741) 64.7%, rgba(0,0,0,0.825) 71%, rgba(0,0,0,0.896) 77.5%, rgba(0,0,0,0.951) 84.5%, rgba(0,0,0,0.987) 91.9%, #000 100%)"

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
              events through its transparent edge; the solid body takes them.
              The edge eases to black (a linear ramp reads as a hard band) and
              the embers drift over it and on into the body, so the cloud
              fades into the page instead of stopping at a line. */}
          <div className="pointer-events-none relative z-10 -mt-[100svh]">
            <div aria-hidden="true" className="h-[40vh]" style={{ background: CURTAIN_EDGE }} />
            <div className="pointer-events-auto isolate bg-black">
              {/* isolate: the embers paint over this black but under the sections */}
              <Embers />
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
