import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { Work } from "@/components/work"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-emerald-900 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Approach />
      <Work />
      <CTA />
      <Footer />
    </main>
  )
}
