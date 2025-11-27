import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Contact | TC Agency — Technically Creative",
  description:
    "Get in touch with TC Agency for production engineering and technical direction. Email info@tc.agency. Offices in Detroit, Los Angeles, and Las Vegas.",
  keywords: [
    "contact TC Agency",
    "production engineering quote",
    "technical direction services",
    "live event production contact",
    "hire technical director",
  ],
  openGraph: {
    title: "Contact Us | TC Agency — Technically Creative",
    description:
      "Ready to discuss your next production? Contact TC Agency for engineering-grade technical direction and production management.",
    url: "https://tc.agency/contact",
    siteName: "TC Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact TC Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TC Agency",
    description: "Let's build something. Get in touch for your next production.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/contact",
  },
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@tc.agency",
    href: "mailto:info@tc.agency",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 313 261 5200",
    href: "tel:+13132615200",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Detroit, MI",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "< 24 hours",
    href: null,
  },
]

const offices = [
  { city: "Detroit", role: "Headquarters", timezone: "EST" },
  { city: "Los Angeles", role: "West Coast Operations", timezone: "PST" },
  { city: "Las Vegas", role: "Venue Support", timezone: "PST" },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://tc.agency" },
          { name: "Contact", url: "https://tc.agency/contact" },
        ]}
      />

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

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Direct Contact</h2>

              <div className="grid grid-cols-2 gap-6 mb-12">
                {contactInfo.map((item) => (
                  <div key={item.label} className="bg-zinc-900/50 border border-border p-4">
                    <item.icon className="w-5 h-5 text-emerald-500 mb-3" />
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="font-medium hover:text-emerald-500 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-4">Office Locations</h3>
              <div className="space-y-3">
                {offices.map((office) => (
                  <div key={office.city} className="flex justify-between items-center py-3 border-b border-border">
                    <div>
                      <p className="font-medium">{office.city}</p>
                      <p className="text-sm text-muted-foreground">{office.role}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{office.timezone}</span>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="mt-12 p-6 bg-zinc-900/30 border border-border">
                <p className="text-sm font-mono text-emerald-500 uppercase tracking-widest mb-4">Why Work With Us</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">—</span>
                    <span>100+ stadium-scale productions delivered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">—</span>
                    <span>99.99% system uptime across all shows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">—</span>
                    <span>24/7 technical support during productions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">—</span>
                    <span>Trusted by Fortune 500 brands and global artists</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Start a Conversation</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
