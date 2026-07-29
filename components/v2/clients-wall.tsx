"use client"

import Image from "next/image"

type Client = {
  name: string
  src: string
  featured?: boolean
  monochrome?: boolean
}

const CLIENTS: Client[] = [
  { name: "Ford", src: "/images/ford-logo-flat.png" },
  { name: "The Sphere", src: "/images/msg-sphere-logo.png" },
  { name: "Samsung", src: "/images/samsung-orig-wordmark-blue-rgb.png" },
  { name: "Visa", src: "/images/visa-logo.webp" },
  { name: "Backstreet Boys", src: "/images/backstreet-20boys.png" },
  { name: "No Doubt", src: "/images/no-doubt-logo.png" },
  { name: "Jelly Roll", src: "/images/jelly-roll-logo.png", featured: true },
  { name: "Daniel Caesar", src: "/images/daniel-caesar-logo.png" },
  { name: "Google", src: "/images/google-favicon-2025.png" },
  { name: "OpenAI", src: "/images/openai-logo.svg", monochrome: true },
]

export function ClientsWall() {
  return (
    <section className="bg-black px-6 py-[14vh] md:px-12" aria-label="Clients">
      <div className="mx-auto w-full max-w-[1600px]">
        <p className="mb-14 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 04 / TRUSTED BY ]</p>
        <div className="grid grid-cols-2 items-center gap-x-10 gap-y-14 md:grid-cols-5">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="group flex min-h-24 items-center justify-center"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.featured ? 190 : 150}
                height={client.featured ? 88 : 64}
                className={[
                  "w-auto object-contain opacity-65 grayscale transition-[filter,opacity,transform] duration-500 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none",
                  client.featured
                    ? "max-h-20 scale-[1.6] group-hover:scale-[1.68] md:max-h-24"
                    : "max-h-12 group-hover:scale-[1.04] md:max-h-14",
                  client.monochrome ? "invert" : "",
                ].join(" ")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
