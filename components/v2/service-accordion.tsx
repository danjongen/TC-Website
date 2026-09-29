"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"

export type ServiceAccordionItem = {
  title: string
  description?: string
  points?: string[]
}

/**
 * Foldable list for service detail pages. Each item is collapsed by default and
 * expands to reveal its description and supporting points, mirroring the
 * interaction in components/v2/services-stack.tsx (keep them in step): CSS
 * grid-rows accordion, content always mounted (inert while closed, so it stays
 * in the HTML for search engines), the row divider fills green from the left
 * on hover, keyboard focus and open. Green is used only on the active/hover
 * state, per the design system.
 */
export function ServiceAccordion({ items }: { items: ServiceAccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <ul className="border-t border-zinc-900">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        return (
          <li key={i} data-reveal="fade" className="group/row relative border-b border-zinc-900">
            <button
              type="button"
              data-cursor="hover"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-baseline gap-6 py-6 text-left"
            >
              <span
                aria-hidden="true"
                className={`flex-shrink-0 font-mono text-[11px] tracking-[0.2em] transition-colors duration-300 ease-expo ${
                  isOpen ? "text-[#00D26A]" : "text-zinc-400"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex-1 text-xl font-semibold tracking-[-0.03em] transition-[color,translate] duration-300 ease-expo group-hover/row:text-white motion-safe:group-hover/row:translate-x-2 motion-safe:group-has-focus-visible/row:translate-x-2 md:text-2xl ${
                  isOpen ? "text-white" : "text-zinc-400"
                }`}
              >
                {item.title}
              </span>
              <span
                aria-hidden="true"
                className={`flex-shrink-0 self-center transition-[color,rotate] duration-300 ease-expo group-hover/row:text-white motion-reduce:transition-none ${
                  isOpen ? "rotate-45 text-white" : "text-zinc-400"
                }`}
              >
                <Plus className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </button>
            <div
              id={panelId}
              inert={!isOpen}
              aria-hidden={isOpen ? undefined : true}
              className={`grid transition-[grid-template-rows] duration-600 ease-expo motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={`max-w-2xl pb-8 transition-opacity duration-300 ease-expo ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.description && <p className="text-base leading-relaxed text-zinc-400">{item.description}</p>}
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
              </div>
            </div>
            {/* green fill over the row's bottom border (1px, so it sits on the border itself) */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-[#00D26A] transition-transform duration-600 ease-expo group-hover/row:scale-x-100 group-has-focus-visible/row:scale-x-100 motion-reduce:transition-none ${
                isOpen ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </li>
        )
      })}
    </ul>
  )
}
