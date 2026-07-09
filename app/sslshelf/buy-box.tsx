"use client"

import { useState } from "react"

const MATRIX_GREEN = "#00D26A"

// Live Shopify variant IDs for the TC SSL Shelf (one per colour). The buy
// button links straight to Shopify's checkout permalink so it bypasses the
// storefront theme entirely and always reaches a working Shop Pay checkout.
const STORE = "https://technically-creative-supply-86j6j.myshopify.com"

type Colour = {
  name: string
  variantId: string
  swatch: string
  // A ring/border colour for dark swatches that would otherwise vanish.
  border?: string
}

const COLOURS: Colour[] = [
  { name: "Matcha Green", variantId: "52494170325355", swatch: "#8a9a4e" },
  { name: "Black", variantId: "52494170227051", swatch: "#17181a", border: "#3f3f46" },
  { name: "Titan Grey", variantId: "52494170358123", swatch: "#8b8e90" },
  { name: "Orange", variantId: "52494170259819", swatch: "#e4611f" },
  { name: "Red", variantId: "52494170292587", swatch: "#c4342b" },
]

function checkoutUrl(variantId: string) {
  return `${STORE}/cart/${variantId}:1`
}

export function BuyBox() {
  const [selected, setSelected] = useState(COLOURS[0])

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <p className="font-mono text-5xl font-bold tracking-tight text-foreground md:text-6xl">
        <span className="sr-only">Price: </span>$89
      </p>

      {/* Colour picker */}
      <div className="mt-10 w-full">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
            Colour
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
            {selected.name}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4" role="radiogroup" aria-label="Shelf colour">
          {COLOURS.map((c) => {
            const isSelected = c.variantId === selected.variantId
            return (
              <button
                key={c.variantId}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={c.name}
                onClick={() => setSelected(c)}
                className="group relative h-10 w-10 rounded-full transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: c.swatch,
                    boxShadow: c.border ? `inset 0 0 0 1px ${c.border}` : undefined,
                  }}
                />
                {isSelected && (
                  <span
                    className="absolute -inset-1.5 rounded-full"
                    style={{ boxShadow: `0 0 0 2px ${MATRIX_GREEN}` }}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <a
        href={checkoutUrl(selected.variantId)}
        className="mt-10 inline-block w-full bg-[#00D26A] px-12 py-5 text-center font-mono text-lg font-bold uppercase tracking-[0.2em] text-black transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        Buy the shelf
      </a>
      <p className="mt-6 font-sans text-sm text-zinc-400">
        Ships ready to clip straight on.
      </p>
    </div>
  )
}
