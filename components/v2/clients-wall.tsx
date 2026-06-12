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
    <section className="bg-black px-6 py-[14vh] md:px-12" aria-label="Clients">
      <div className="mx-auto w-full max-w-[1600px]">
        <p className="mb-14 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ 04 — TRUSTED BY ]</p>
        <div className="grid grid-cols-2 items-center gap-x-10 gap-y-14 md:grid-cols-4">
          {CLIENTS.map((client) => (
            <div key={client.name} className="flex items-center justify-center">
              <Image
                src={client.src}
                alt={client.name}
                width={140}
                height={56}
                className="max-h-12 w-auto object-contain opacity-40 grayscale transition-opacity duration-500 hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
