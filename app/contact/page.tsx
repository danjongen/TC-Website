import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { CTA } from "@/components/cta"

export const metadata: Metadata = {
  title: "Contact | TC Agency — Technically Creative",
  description:
    "Get in touch with TC Agency. Email info@tc.agency or call +1 (313) 555-1234. Offices in Detroit, Los Angeles, and Las Vegas.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-mono text-emerald-500 mb-4 uppercase tracking-widest">05 / Contact</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Let's build something.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you have a specific project in mind or just want to explore possibilities, we're ready to talk.
            </p>
          </div>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  )
}
