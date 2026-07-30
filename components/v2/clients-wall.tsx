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
  { name: "The Sphere", src: "/images/sphere-logo.jpg" },
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
              className="group relative flex min-h-24 items-center justify-center"
            >
              <div
                className={[
                  "relative w-full transition-transform duration-500 motion-reduce:transition-none",
                  client.featured
                    ? "h-20 max-w-[190px] scale-[1.35] group-hover:scale-[1.42] md:h-24"
                    : "h-12 max-w-[150px] group-hover:scale-[1.04] md:h-14",
                ].join(" ")}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  fill
                  sizes="(min-width: 768px) 20vw, 50vw"
                  className={[
                    "object-contain object-center opacity-65 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none",
                    client.monochrome ? "invert" : "",
                  ].join(" ")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
