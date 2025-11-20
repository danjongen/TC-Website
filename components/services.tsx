"use client"

import { motion } from "framer-motion"

const services = [
  {
    title: "Technical Direction",
    desc: "End-to-end technical leadership. One point of control for all production systems",
  },
  {
    title: "Production Management",
    desc: "Complete production oversight. Timeline, budget, and logistics executed with precision",
  },
  {
    title: "Design & Visualization",
    desc: "From concept to technical blueprint. Accurate visualization before build begins.",
  },
  {
    title: "Workflow Automation",
    desc: "Custom automation that eliminates manual tasks. Faster setup. Fewer errors. Repeatable results.",
  },
  {
    title: "System Integration",
    desc: "All your tech talking to each other. One system. One interface. Zero gaps.",
  },
  {
    title: "3D Scanning & Unreal",
    desc: "3D venue scanning and real-time visualization. See your show before you build it.",
  },
  {
    title: "Aerial Surveying",
    desc: "Aerial data capture for venue and site analysis. Topology, as built layouts, and site conditions documented.",
  },
  {
    title: "Custom Fabrication",
    desc: "Custom-engineered hardware for productions that require solutions that don't exist yet",
  },
  {
    title: "Training & Documentation",
    desc: "Documented processes and trained teams. Your production knowledge, systematized and transferable.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 border-b border-border bg-background relative">
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-emerald-700 mb-4 uppercase tracking-widest">02 / Capabilities</h2>
          <h3 className="text-3xl font-bold">Core Services</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-background p-8 hover:bg-accent/10 transition-colors group relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="font-mono text-xs text-muted-foreground mb-4">
                {(index + 1).toString().padStart(2, "0")}
              </div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{service.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
