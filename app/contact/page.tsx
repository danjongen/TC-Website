import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { BreadcrumbSchema } from "@/components/structured-data"

export const dynamic = "force-static"
export const revalidate = 86400

export const metadata: Metadata = {
  title: "Contact | TC Agency",
  description:
    "Get in touch with TC Agency for production engineering and technical direction. We handle live production risks so you don't have to regret them later.",
  alternates: {
    canonical: "https://tc.agency/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Contact", url: "https://tc.agency/contact" },
        ]}
      />

      <Navbar />

      <section className="py-24 md:py-32 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Let's Talk</h1>
            <p className="text-gray-600 leading-relaxed">
              If you're serious about accountability in high-stakes environments, we should talk. Tell us about your
              project and we'll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold mb-6">Direct Contact</h2>

              <div className="space-y-4 mb-12">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a href="mailto:info@tc.agency" className="font-medium hover:underline">
                    info@tc.agency
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a href="tel:+13132615200" className="font-medium hover:underline">
                    +1 313 261 5200
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-medium">Detroit, MI</p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border border-gray-200">
                <h3 className="font-bold mb-3">Before You Reach Out</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We work best with operators who value preparation over panic. If you're looking for someone to promise
                  perfection without naming risks, we're not the right fit. If you want honest assessment and explicit
                  risk communication—let's talk.
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
