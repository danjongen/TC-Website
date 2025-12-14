import type { Metadata } from "next"
import { ContactPageClient } from "@/app/contact/client"

export const dynamic = "force-static"
export const revalidate = 86400

export const metadata: Metadata = {
  title: "Contact | TC Agency — Production Engineering",
  description:
    "Get in touch with TC Agency for production engineering and technical direction services. Let's discuss your next project.",
  alternates: {
    canonical: "https://www.tc.agency/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
