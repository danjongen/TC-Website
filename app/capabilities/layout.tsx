import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | TC Agency — Technically Creative",
  description:
    "Full-spectrum production engineering services: technical direction, automation, system integration, 3D scanning, Unreal Engine, and custom fabrication.",
  keywords: [
    "production engineering services",
    "technical direction",
    "event automation",
    "system integration",
    "3D scanning services",
    "Unreal Engine production",
    "LED video wall integration",
    "custom fabrication",
    "show control systems",
  ],
  openGraph: {
    title: "Services | TC Agency — Technically Creative",
    description:
      "Full-spectrum production engineering. Every technical discipline under one roof, working as a unified system.",
    url: "https://tc.agency/capabilities",
    siteName: "TC Agency",
    images: [
      {
        url: "/images/dsf3815.jpg",
        width: 1200,
        height: 630,
        alt: "TC Agency production services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | TC Agency",
    description: "Full-spectrum production engineering for high-stakes live events.",
    images: ["/images/dsf3815.jpg"],
  },
  alternates: {
    canonical: "https://tc.agency/capabilities",
  },
}

export default function CapabilitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
