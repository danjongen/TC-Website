"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Loader2, X } from "lucide-react"

export function CTA() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset after showing success message
    setTimeout(() => {
      setIsSuccess(false)
      setIsExpanded(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-32 border-b border-border bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-accent" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-12"
        >
          Let’s build something.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.button
                key="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setIsExpanded(true)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-lg font-bold uppercase tracking-wide hover:bg-gray-200 transition-colors"
              >
                Talk to our team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 relative"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {isSuccess ? (
                  <div className="py-12 flex flex-col items-center text-emerald-500">
                    <Check className="w-12 h-12 mb-4" />
                    <p className="text-lg font-bold uppercase tracking-wide">Message Sent</p>
                    <p className="text-sm text-zinc-400 mt-2">We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        required
                        type="text"
                        className="w-full bg-black border border-zinc-800 p-3 text-white focus:border-emerald-700 focus:outline-none transition-colors"
                        placeholder="ENTER YOUR NAME"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        className="w-full bg-black border border-zinc-800 p-3 text-white focus:border-emerald-700 focus:outline-none transition-colors"
                        placeholder="ENTER YOUR EMAIL"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full bg-black border border-zinc-800 p-3 text-white focus:border-emerald-700 focus:outline-none transition-colors resize-none"
                        placeholder="TELL US ABOUT YOUR PROJECT"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black font-bold uppercase py-3 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    <p className="text-xs text-zinc-600 text-center mt-4">Submissions sent to info@tc.agency</p>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
