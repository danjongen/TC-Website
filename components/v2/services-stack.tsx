"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { CueLabel } from "@/components/motion/cue-label"

const SERVICES = [
  {
    index: "01",
    title: "Technical Direction",
    body: "Technical leadership for arena tours, residencies, and broadcast. One accountable lead. Zero surprises on show day.",
    href: "/services/technical-direction",
  },
  {
    index: "02",
    title: "Workflow Automation",
    body: "Show-control pipelines and cueing systems that take human error off the critical path.",
    href: "/services/workflow-automation",
  },
  {
    index: "03",
    title: "Systems Integration",
    body: "Video, lighting, motion, power, and networking engineered as one machine, not a pile of vendors.",
    href: "/services/system-integration",
  },
  {
    index: "04",
    title: "Unreal Engine & Visualization",
    body: "Real-time previs and pixel-accurate content pipelines for screens of any scale, including the biggest one on the planet.",
    href: "/services/unreal-engine",
  },
  {
    index: "05",
    title: "3D & Aerial Surveying",
    body: "LiDAR, photogrammetry, and drone survey. Millimeter truth before a single truck rolls.",
    href: "/services/3d-scanning",
  },
]

/*
 * Same interaction as components/v2/service-accordion.tsx (keep them in step):
 * CSS grid-rows accordion, content always mounted (inert while closed), the
 * row divider fills green from the left on hover, keyboard focus and open.
 */
export function ServicesStack() {
  const [open, setOpen] = useState<string | null>(null)
  const baseId = useId()

  return (
    <section data-cue="03" data-cue-label="CAPABILITIES" className="bg-black px-6 py-[20vh] md:px-12" aria-label="Services">
      <div className="mx-auto w-full max-w-[1600px]">
        <CueLabel index="03" cue className="mb-16 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
          CAPABILITIES
        </CueLabel>

        <ul>
          {SERVICES.map((s) => {
            const isOpen = open === s.index
            const panelId = `${baseId}-panel-${s.index}`
            return (
              <li key={s.index} data-reveal="fade" className="group/row">
                <button
                  type="button"
                  data-cursor="hover"
                  onClick={() => setOpen(isOpen ? null : s.index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-baseline gap-6 py-7 text-left md:gap-12 md:py-9"
                >
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-300 ease-expo ${
                      isOpen ? "text-[#00D26A]" : "text-zinc-400"
                    }`}
                  >
                    {s.index}
                  </span>
                  <span
                    className={`text-3xl font-semibold tracking-[-0.03em] transition-[color,translate] duration-300 ease-expo group-hover/row:text-white motion-safe:group-hover/row:translate-x-2 motion-safe:group-has-focus-visible/row:translate-x-2 md:text-6xl ${
                      isOpen ? "text-white" : "text-zinc-400"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto hidden self-center transition-[color,rotate] duration-300 ease-expo group-hover/row:text-white motion-reduce:transition-none md:block ${
                      isOpen ? "rotate-45 text-white" : "text-zinc-400"
                    }`}
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
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
                      className={`pb-10 pl-12 transition-opacity duration-300 ease-expo md:pl-32 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <p className="max-w-xl text-lg leading-relaxed text-zinc-400">{s.body}</p>
                      <Link
                        href={s.href}
                        data-cursor="hover"
                        className="mt-6 inline-flex min-h-6 items-center font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:text-[#00D26A]"
                      >
                        EXPLORE →
                      </Link>
                    </div>
                  </div>
                </div>
                {/* divider draws in on reveal; the green fill is a child so the two scale animations never share an element */}
                <div data-reveal="line" className="relative h-px w-full origin-left bg-zinc-900">
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 origin-left bg-[#00D26A] transition-transform duration-600 ease-expo group-hover/row:scale-x-100 group-has-focus-visible/row:scale-x-100 motion-reduce:transition-none ${
                      isOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
