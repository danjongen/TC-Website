"use client"

import { motion } from "framer-motion"

const steps = ["Discovery", "System Design", "Automation", "Show Delivery", "Feedback Loop"]

export function Approach() {
  return (
    <section id="approach" className="py-24 border-b border-border bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-sm font-mono text-emerald-700 mb-4 uppercase tracking-widest">03 / Approach</h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
            We’ve systematized the repeatable—so we can focus on what’s unique.
          </h3>
        </div>

        {/* Process Diagram */}
        <div className="relative mt-20">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-4 h-4 bg-background border-2 border-border rounded-full mb-6 z-10 group-hover:border-emerald-700 group-hover:bg-accent transition-colors" />
                <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
