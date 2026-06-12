"use client"

import Image from "next/image"

const CLIENTS = [
  { name: "Ford", src: "/images/ford-logo-flat.png" },
  { name: "The Sphere", src: "/images/msg-sphere-logo.png" },
  { name: "Samsung", src: "/images/samsung-orig-wordmark-blue-rgb.png" },
  { name: "Visa", src: "/images/visa-logo.webp" },
  { name: "Backstreet Boys", src: "/images/backstreet-20boys.png" },
  { name: "No Doubt", src: "/images/no-doubt-logo.png" },
  { name: "Jelly Roll", src: "/images/jelly-roll-logo.png" },
  { name: "Daniel Caesar", src: "/images/daniel-caesar-logo.png" },
]

export function ClientsWall() {
  return (
    <section className="border-t border-zinc-900 bg-black px-6 py-32" aria-label="Clients">
      <div className="container mx-auto">
        <p className="mb-4 font-mono text-xs tracking-[0.35em] text-[#00D26A]">[ 04 — TRUSTED BY ]</p>
        <h2 className="mb-16 text-5xl font-black tracking-tighter text-white md:text-7xl">
          NAMES YOU KNOW. SHOWS YOU REMEMBER.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="group flex h-36 items-center justify-center border border-zinc-900 transition-colors hover:border-[#00D26A]/40 hover:bg-zinc-950"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={140}
                height={56}
                className="max-h-14 w-auto object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
