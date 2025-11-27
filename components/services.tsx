"use client"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    title: "Technical Direction",
    desc: "End-to-end technical leadership. One point of control for all production systems",
    href: null,
  },
  {
    title: "Production Management",
    desc: "Complete production oversight. Timeline, budget, and logistics executed with precision",
    href: null,
  },
  {
    title: "Design & Visualization",
    desc: "From concept to technical blueprint. Accurate visualization before build begins.",
    href: null,
  },
  {
    title: "Workflow Automation",
    desc: "Custom automation that eliminates manual tasks. Faster setup. Fewer errors. Repeatable results.",
    href: "/services/automation",
  },
  {
    title: "System Integration",
    desc: "All your tech talking to each other. One system. One interface. Zero gaps.",
    href: null,
  },
  {
    title: "3D Scanning & Unreal",
    desc: "3D venue scanning and real-time visualization. See your show before you build it.",
    href: "/services/unreal-engine",
  },
  {
    title: "Aerial Surveying",
    desc: "Aerial data capture for venue and site analysis. Topology, as built layouts, and site conditions documented.",
    href: "/services/3d-scanning",
  },
  {
    title: "Custom Fabrication",
    desc: "Custom-engineered hardware for productions that require solutions that don't exist yet",
    href: null,
  },
  {
    title: "Training & Documentation",
    desc: "Documented processes and trained teams. Your production knowledge, systematized and transferable.",
    href: null,
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 border-b border-border bg-background relative">
      <div className="absolute inset-0 bg-data-grid pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest">02 / Services</h2>
          <h3 className="text-3xl font-bold">Core Services</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {services.map((service, index) => {
            const content = (
              <>
                <div
                  className={`absolute top-0 left-0 w-full h-px ${service.href ? "bg-emerald-500" : "bg-white"} opacity-0 group-hover:opacity-100 transition-opacity duration-150`}
                />
                <div className="font-mono text-xs text-gray-400 mb-4">{(index + 1).toString().padStart(2, "0")}</div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-150">
                    {service.title}
                  </h4>
                  {service.href && (
                    <ArrowUpRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{service.desc}</p>
                {service.href && (
                  <div className="mt-4 text-xs font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    View Details →
                  </div>
                )}
              </>
            )

            return (
              <div
                key={index}
                className={`bg-background p-8 transition-colors duration-150 group relative ${
                  service.href ? "hover:bg-white/5 cursor-pointer" : ""
                }`}
              >
                {service.href ? (
                  <Link href={service.href} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
