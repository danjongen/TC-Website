"use client"

import { Suspense } from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { BreadcrumbSchema } from "@/components/structured-data"

export function ContactPageClient() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.tc.agency" },
          { name: "Contact", url: "https://www.tc.agency/contact" },
        ]}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6">
          <div className="max-w-xl">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 05 / CONTACT ]</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-8">Let's talk</h1>
            <p className="text-lg leading-relaxed text-zinc-400">
              Ready to discuss your next project? We bring precision engineering and technical expertise to make your
              vision happen.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-[18vh]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div id="contact-form">
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">SEND US A MESSAGE</p>
              <Suspense
                fallback={
                  <div className="h-96 animate-pulse border border-zinc-800 bg-zinc-900/40" />
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Contact Info */}
            <div>
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">DIRECT CONTACT</p>

              <div className="space-y-10">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 mb-2">EMAIL</p>
                  <a
                    href="mailto:info@tc.agency"
                    className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white hover:text-[#00D26A] transition-colors duration-300"
                  >
                    info@tc.agency
                  </a>
                </div>
                <div className="h-px bg-zinc-900" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 mb-2">LOCATION</p>
                  <p className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white">Detroit, MI</p>
                </div>
              </div>

              <div className="mt-16 max-w-xl">
                <h3 className="text-xl font-semibold text-white mb-3">We're ready to talk</h3>
                <p className="text-lg leading-relaxed text-zinc-400">
                  Large-scale production, technical consulting, or automation. We're here to make it happen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
