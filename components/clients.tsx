"use client"

import { motion } from "framer-motion"

const clients = [
  { name: "Ford", logo: "FORD" },
  { name: "The Sphere", logo: "SPHERE" },
  { name: "Backstreet Boys", logo: "BSB" },
  { name: "Visa", logo: "VISA" },
  { name: "Samsung", logo: "SAMSUNG" },
  { name: "OpenAI", logo: "OPENAI" },
]

export function Clients() {
  return (
    <section className="py-16 md:py-24 border-b border-border bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-sm font-mono text-emerald-700 mb-4 uppercase tracking-widest">Trusted By</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Engineering solutions for world-class productions and global brands.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative aspect-[3/2] border border-border bg-zinc-950 flex items-center justify-center p-6 hover:border-emerald-900/50 transition-colors"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-600 group-hover:text-white transition-colors">
                {client.logo}
              </span>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-700 uppercase">
                {client.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
