"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const clients = [
  {
    name: "Ford",
    logo: "/images/ford-logo-flat.png",
  },
  {
    name: "The Sphere",
    logo: "/images/msg-sphere-logo.png",
  },
  {
    name: "Backstreet Boys",
    logo: "/images/backstreet-20boys.png",
  },
  {
    name: "Google",
    logo: "/images/google-favicon-2025.png",
  },
  {
    name: "Samsung",
    logo: "/images/samsung-orig-wordmark-blue-rgb.png",
  },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group relative aspect-[3/2] border border-border bg-zinc-950 flex items-center justify-center p-6 md:p-8 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  fill
                  className="object-contain p-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
