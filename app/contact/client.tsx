"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { BreadcrumbSchema } from "@/components/structured-data"

const MATRIX_GREEN = "#00D26A"

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

      <section className="pt-32 pb-16 border-b border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span style={{ color: MATRIX_GREEN }}>Talk</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Ready to discuss your next project? We're here to help bring your vision to life with precision
              engineering and technical expertise.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Direct Contact</h2>

              <div className="space-y-6 mb-12">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Email</p>
                  <a
                    href="mailto:info@tc.agency"
                    className="text-lg font-medium text-white transition-colors"
                    style={{ ["--hover-color" as string]: MATRIX_GREEN }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                  >
                    info@tc.agency
                  </a>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Phone</p>
                  <a
                    href="tel:+13132615200"
                    className="text-lg font-medium text-white transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                  >
                    +1 313 261 5200
                  </a>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Location</p>
                  <p className="text-lg font-medium">Detroit, MI</p>
                </div>
              </div>

              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="font-bold mb-3" style={{ color: MATRIX_GREEN }}>
                  We're ready to talk
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Whether you're planning a large-scale production, need technical consulting, or want to explore
                  automation solutions—we're here to help make it happen.
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
