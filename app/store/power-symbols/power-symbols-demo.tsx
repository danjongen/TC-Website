"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const examples = [
  {
    key: "drop",
    name: "400A power drop",
    src: "/images/store/power-symbols/power-drop-400a.svg",
    reference: "P042",
    fields: [
      ["Department", "Production · P"],
      ["Rating", "400A"],
      ["Fed from", "GENSET 1"],
      ["Destination", "SL UNDERWORLD"],
      ["Voltage / phase", "208V · 3Ø"],
      ["Circuit", "01"],
      ["Connector", "Powerlock"],
      ["Cable", "5 × 120 mm²"],
    ],
  },
  {
    key: "step-down",
    name: "16A step-down",
    src: "/images/store/power-symbols/step-down-16a.svg",
    reference: "P043",
    fields: [
      ["Department", "Audio · A"],
      ["Rating", "16A"],
      ["Fed from", "P042"],
      ["Destination", "PLAYBACK"],
      ["Primary", "230V · 1Ø"],
      ["Secondary", "120V · 1Ø"],
      ["Connector", "CEE 7/7"],
      ["Frequency", "50 Hz"],
    ],
  },
  {
    key: "generator",
    name: "Generator source",
    src: "/images/store/power-symbols/generator.svg",
    reference: "GEN01",
    fields: [
      ["Department", "Production · P"],
      ["Rating", "500 kVA"],
      ["Source", "TOURING GENSET"],
      ["Destination", "MAIN DISTRO"],
      ["Voltage / phase", "400V · 3Ø"],
      ["Frequency", "50 Hz"],
      ["Connector", "Powerlock"],
      ["Status", "Reviewed"],
    ],
  },
] as const

export function PowerSymbolsDemo() {
  const [active, setActive] = useState(0)
  const reducedMotion = useReducedMotion()
  const example = examples[active]

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % examples.length),
      5200,
    )
    return () => window.clearInterval(timer)
  }, [reducedMotion])

  return (
    <div className="overflow-hidden border border-zinc-800 bg-[#F3F0E8] text-black">
      <div className="flex flex-col justify-between gap-5 border-b border-black px-5 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:flex-row sm:items-center md:px-8">
        <span>One symbol · all the operational data</span>
        <span className="text-zinc-500">Vectorworks / editable / scheduled</span>
      </div>

      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-b border-black p-8 lg:min-h-[570px] lg:border-b-0 lg:border-r">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-px bg-zinc-300"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 w-px bg-zinc-300"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-1 w-24 bg-[#00D26A]"
            animate={
              reducedMotion
                ? undefined
                : { x: ["-7rem", "36rem"], opacity: [0, 1, 1, 0] }
            }
            transition={{
              duration: 2.4,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 1.2,
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={example.key}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 1.04, y: -10 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square w-full max-w-[390px]"
            >
              <Image
                src={example.src}
                alt={`${example.name} Vectorworks symbol`}
                fill
                priority={active === 0}
                sizes="(min-width: 1024px) 42vw, 80vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-5 left-5 right-5 flex justify-center gap-2">
            {examples.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.name}`}
                aria-pressed={active === index}
                className={`h-2 transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                  active === index ? "w-12 bg-black" : "w-5 bg-zinc-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-[#ECE8DE]">
          <div className="border-b border-black p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={example.key}
                initial={reducedMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Selected object
                </p>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                    {example.name}
                  </h2>
                  <p className="bg-black px-3 py-2 font-mono text-sm font-bold text-[#00D26A]">
                    {example.reference}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.dl
              key={example.key}
              initial={reducedMotion ? false : "hidden"}
              animate="shown"
              variants={{
                hidden: {},
                shown: { transition: { staggerChildren: 0.045 } },
              }}
              className="grid flex-1 grid-cols-1 content-start sm:grid-cols-2"
            >
              {example.fields.map(([label, value]) => (
                <motion.div
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    shown: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-zinc-400 px-6 py-5 odd:sm:border-r md:px-8"
                >
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    {label}
                  </dt>
                  <dd className="mt-2 font-mono text-base font-bold">{value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </AnimatePresence>

          <div className="relative overflow-hidden bg-black px-6 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white md:px-8">
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-28 bg-[#00D26A]"
              animate={reducedMotion ? undefined : { x: ["-9rem", "46rem"] }}
              transition={{
                duration: 3.2,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
            <span className="relative">
              Edit once in Object Info → update the drawing + schedule
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
