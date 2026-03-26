"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

interface Service {
  num: string
  title: string
  desc: string
  href: string
  details: string[]
  specs: Record<string, string>
}

interface CapabilitiesAccordionProps {
  services: Service[]
}

export function CapabilitiesAccordion({ services }: CapabilitiesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-px">
      {services.map((service, index) => {
        const isOpen = openIndex === index

        return (
          <div key={service.num} className="border border-border bg-zinc-950 overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center gap-6 p-6 text-left hover:bg-zinc-900/50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-mono text-xs text-emerald-500 shrink-0">{service.num}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{service.desc}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 border-t border-border">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-4">Deliverables</p>
                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full mt-2 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-4">Specs</p>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(service.specs).map(([key, value]) => (
                        <div key={key} className="p-3 border border-border bg-black/30">
                          <p className="text-lg font-bold">{value}</p>
                          <p className="text-xs text-muted-foreground uppercase">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 mt-6 text-sm font-mono text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      Learn more <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
