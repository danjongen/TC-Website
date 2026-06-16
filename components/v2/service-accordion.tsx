"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const EXPO = [0.16, 1, 0.3, 1] as const

export type ServiceAccordionItem = {
  title: string
  description?: string
  points?: string[]
}

/**
 * Foldable list for service detail pages. Each item is collapsed by default and
 * expands to reveal its description and supporting points, mirroring the
 * interaction in components/v2/services-stack.tsx. Green is used only on the
 * active/hover state, per the design system.
 */
export function ServiceAccordion({ items }: { items: ServiceAccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <ul className="border-t border-zinc-900">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={i} className="border-b border-zinc-900">
            <button
              data-cursor="hover"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-6 py-6 text-left"
            >
              <span
                className="flex-1 text-xl font-semibold tracking-[-0.03em] text-zinc-400 transition-colors duration-300 group-hover:text-white md:text-2xl"
                style={isOpen ? { color: "#fff" } : undefined}
              >
                {item.title}
              </span>
              <span
                className="flex-shrink-0 text-zinc-500 transition-colors duration-300 group-hover:text-[#00D26A]"
                style={isOpen ? { color: "#00D26A" } : undefined}
                aria-hidden="true"
              >
                {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EXPO }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl pb-8">
                    {item.description && (
                      <p className="text-base leading-relaxed text-zinc-400">{item.description}</p>
                    )}
                    {item.points && item.points.length > 0 && (
                      <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                        {item.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-zinc-400">
                            <span
                              className="mt-[0.45rem] h-1 w-1 flex-shrink-0 rounded-full bg-[#00D26A]"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
