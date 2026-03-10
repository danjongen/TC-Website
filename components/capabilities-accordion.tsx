"use client"

import { useState } from "react"

interface Service {
  num: string
  title: string
  desc: string
  href: string | null
  details: string[]
  specs: Record<string, string>
}

interface CapabilitiesAccordionProps {
  services: Service[]
}

export function CapabilitiesAccordion({ services }: CapabilitiesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {services.map((service, index) => (
        <div key={service.num} className="border border-border bg-zinc-950 overflow-hidden">
          {/* ... existing accordion code ... */}
        </div>
      ))}
    </div>
  )
}
