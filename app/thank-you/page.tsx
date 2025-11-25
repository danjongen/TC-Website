import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Thank You | TC Agency — Technically Creative",
  description: "Thank you for contacting TC Agency. We'll be in touch within 24 hours.",
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 min-h-[70vh] flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Message received.</h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Thank you for reaching out. Our team reviews every inquiry personally.
            </p>

            <div className="bg-zinc-900/50 border border-border p-6 mb-8 text-left">
              <p className="text-sm font-mono text-emerald-500 uppercase tracking-widest mb-3">Expected Response</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Initial Response</p>
                  <p className="font-medium">Within 24 hours</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Discovery Call</p>
                  <p className="font-medium">Within 48-72 hours</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-8">
              For urgent production inquiries, call directly:{" "}
              <a href="tel:+13135551234" className="text-white hover:text-emerald-500 transition-colors">
                +1 (313) 555-1234
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
              >
                Back to Home <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-white font-bold hover:bg-white/5 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
