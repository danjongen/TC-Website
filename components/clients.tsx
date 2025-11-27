"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const clients = [
  {
    name: "Ford",
    logo: "/images/ford-logo-flat.png",
    invert: false,
  },
  {
    name: "The Sphere",
    logo: "/images/msg-sphere-logo.png",
    invert: false,
  },
  {
    name: "Backstreet Boys",
    logo: "/images/backstreet-20boys.png",
    invert: false,
  },
  {
    name: "Google",
    logo: "/images/google-favicon-2025.png",
    invert: false,
  },
  {
    name: "Samsung",
    logo: "/images/samsung-orig-wordmark-blue-rgb.png",
    invert: false,
  },
  {
    name: "OpenAI",
    logo: "/images/openai-logo.svg",
    invert: true,
  },
  {
    name: "Visa",
    logo: "/images/visa-logo.webp",
    invert: false,
  },
  {
    name: "Daniel Caesar",
    logo: "/images/daniel-caesar-logo.png",
    invert: true,
  },
  {
    name: "Jelly Roll",
    logo: "/images/jelly-roll-logo.png",
    invert: false,
  },
  {
    name: "No Doubt",
    logo: "/images/no-doubt-logo.png",
    invert: false,
    isLight: true,
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group relative border border-border bg-zinc-950 flex flex-col items-center justify-center p-6 md:p-8 hover:border-zinc-700 transition-all duration-300"
            >
              {/* Logo container - larger height */}
              <div className="relative w-full h-16 md:h-20 flex items-center justify-center mb-4">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    client.isLight
                      ? "opacity-70 group-hover:opacity-100"
                      : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                  } ${client.invert ? "invert group-hover:invert" : ""}`}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
                />
              </div>
              {/* Client name label underneath */}
              <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-wider">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
