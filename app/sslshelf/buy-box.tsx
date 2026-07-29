"use client"

import Image, { type StaticImageData } from "next/image"
import { useState } from "react"

import heroShow from "./hero-show.png"
import shelfBlack from "./shelf-black.jpg"
import shelfOrange from "./shelf-orange.jpg"
import shelfRed from "./shelf-red.jpg"
import shelfTitanGrey from "./shelf-titan-grey.jpg"

const MATRIX_GREEN = "#00D26A"
const STORE = "https://technically-creative-supply-86j6j.myshopify.com"

type Colour = {
  name: string
  shortName: string
  variantId: string
  swatch: string
  image: StaticImageData
  border?: string
}

const COLOURS: readonly Colour[] = [
  {
    name: "Matcha Green",
    shortName: "Matcha",
    variantId: "52494170325355",
    swatch: "#53643a",
    image: heroShow,
  },
  {
    name: "Black",
    shortName: "Black",
    variantId: "52494170227051",
    swatch: "#17181a",
    image: shelfBlack,
    border: "#52525b",
  },
  {
    name: "Titan Grey",
    shortName: "Titan",
    variantId: "52494170358123",
    swatch: "#7d8285",
    image: shelfTitanGrey,
  },
  {
    name: "Orange",
    shortName: "Orange",
    variantId: "52494170259819",
    swatch: "#e4611f",
    image: shelfOrange,
  },
  {
    name: "Red",
    shortName: "Red",
    variantId: "52494170292587",
    swatch: "#b82e2e",
    image: shelfRed,
  },
]

function checkoutUrl(variantId: string) {
  return `${STORE}/cart/${variantId}:1`
}

export function BuyBox() {
  const [selected, setSelected] = useState<Colour>(COLOURS[0])

  return (
    <article className="grid w-full overflow-hidden border border-zinc-800 bg-zinc-900/40 lg:grid-cols-[1.18fr_0.82fr]">
      <div className="relative min-h-[24rem] overflow-hidden bg-[#05080c] sm:min-h-[34rem] lg:min-h-[48rem]">
        <Image
          key={selected.name}
          src={selected.image}
          alt={`The ${selected.name} TC SSL Shelf mounted on an SSL Live console and holding a timecode unit`}
          fill
          priority
          sizes="(min-width: 1024px) 59vw, 100vw"
          placeholder="blur"
          className="object-cover animate-in fade-in duration-300"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          aria-hidden="true"
        />
        <p className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-300">
          SSL Live console / front of house
        </p>
      </div>

      <div className="flex flex-col p-7 text-left sm:p-10 lg:p-12">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
          <span>Console hardware</span>
          <span className="text-[#00D26A]">Available now</span>
        </div>

        <h1 className="mt-14 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
          TC SSL Shelf
        </h1>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-[#00D26A]">
          Somewhere to put it. Finally.
        </p>
        <p className="mt-7 max-w-[40rem] leading-relaxed text-zinc-300">
          A purpose-built shelf designed from a 3D scan of the SSL Live top
          rail. It clips on in seconds. No tools, drilling or gaffer tape.
        </p>

        <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-zinc-800 py-7 text-sm">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Construction
            </dt>
            <dd className="mt-2 text-zinc-200">3D-printed PLA-CF</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Fits
            </dt>
            <dd className="mt-2 text-zinc-200">SSL Live top rail</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Production
            </dt>
            <dd className="mt-2 text-zinc-200">In stock or made to order</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Dispatch
            </dt>
            <dd className="mt-2 text-zinc-200">Up to two weeks</dd>
          </div>
        </dl>

        <div className="mt-auto pt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Unit price
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                <span className="sr-only">Price: </span>$69
              </p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white">
              {selected.name}
            </p>
          </div>

          <fieldset className="mt-6">
            <legend className="sr-only">Shelf colour</legend>
            <div className="grid grid-cols-5 gap-2">
              {COLOURS.map((colour) => {
                const isSelected = colour.variantId === selected.variantId

                return (
                  <label
                    key={colour.variantId}
                    className={`relative flex min-w-0 cursor-pointer flex-col gap-2 border p-1.5 transition-colors ${
                      isSelected
                        ? "border-zinc-500"
                        : "border-transparent hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shelf-colour"
                      value={colour.name}
                      checked={isSelected}
                      onChange={() => setSelected(colour)}
                      className="sr-only"
                    />
                    <span
                      className="aspect-square w-full"
                      style={{
                        backgroundColor: colour.swatch,
                        boxShadow: colour.border
                          ? `inset 0 0 0 1px ${colour.border}`
                          : undefined,
                      }}
                      aria-hidden="true"
                    />
                    <span className="truncate font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-400">
                      {colour.shortName}
                    </span>
                    {isSelected && (
                      <span
                        className="pointer-events-none absolute inset-0"
                        style={{ boxShadow: `inset 0 0 0 1px ${MATRIX_GREEN}` }}
                        aria-hidden="true"
                      />
                    )}
                  </label>
                )
              })}
            </div>
          </fieldset>

          <a
            href={checkoutUrl(selected.variantId)}
            className="mt-8 flex w-full items-center justify-between bg-[#00D26A] px-6 py-5 font-mono text-sm font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Buy the shelf
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Made to order when stock is low. Allow up to two weeks before
            dispatch. Shipping speed and cost are selected and paid at checkout.
          </p>
        </div>
      </div>
    </article>
  )
}
