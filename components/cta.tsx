"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Loader2, Mail, Phone, MapPin } from "lucide-react"

export function CTA() {
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
    }, 3000)
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-32 border-b border-border bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-accent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-sm font-mono text-emerald-700 mb-3 sm:mb-4 uppercase tracking-widest">
                05 / Contact
              </h2>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">
                Let's build something.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Ready to discuss your next production? Get in touch with our team for project inquiries, partnerships,
                or general questions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 border border-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                  <a
                    href="mailto:info@tc.agency"
                    className="text-white hover:text-emerald-500 transition-colors font-medium text-sm sm:text-base"
                  >
                    info@tc.agency
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 border border-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1">Phone</p>
                  <a
                    href="tel:+13135551234"
                    className="text-white hover:text-emerald-500 transition-colors font-medium text-sm sm:text-base"
                  >
                    +1 (313) 555-1234
                  </a>
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 border border-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1">Locations</p>
                  <p className="text-white font-medium text-sm sm:text-base">Detroit, MI</p>
                  <p className="text-muted-foreground text-sm">Los Angeles, CA</p>
                  <p className="text-muted-foreground text-sm">Las Vegas, NV</p>
                </div>
              </div>
            </motion.div>

            {/* Response Time - hidden on mobile to reduce clutter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 sm:mt-8 p-4 border border-border bg-zinc-900/50 hidden sm:block"
            >
              <p className="text-xs font-mono text-emerald-700 uppercase tracking-wide mb-1">Response Time</p>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours during business days.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-5 sm:p-8"
          >
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide mb-4 sm:mb-6">Send us a message</h3>

            {isSuccess ? (
              <div className="py-8 sm:py-12 flex flex-col items-center text-emerald-500">
                <Check className="w-10 h-10 sm:w-12 sm:h-12 mb-4" />
                <p className="text-base sm:text-lg font-bold uppercase tracking-wide">Message Sent</p>
                <p className="text-sm text-zinc-400 mt-2">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                      Name *
                    </label>
                    <input
                      id="name"
                      required
                      type="text"
                      className="w-full bg-black border border-zinc-800 p-3 text-white text-sm sm:text-base focus:border-emerald-700 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="w-full bg-black border border-zinc-800 p-3 text-white text-sm sm:text-base focus:border-emerald-700 focus:outline-none transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      className="w-full bg-black border border-zinc-800 p-3 text-white text-sm sm:text-base focus:border-emerald-700 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full bg-black border border-zinc-800 p-3 text-white text-sm sm:text-base focus:border-emerald-700 focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="project-type" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    className="w-full bg-black border border-zinc-800 p-3 text-white text-sm sm:text-base focus:border-emerald-700 focus:outline-none transition-colors"
                  >
                    <option value="">Select a project type</option>
                    <option value="tour">Concert / Tour Production</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="broadcast">Broadcast / Live Stream</option>
                    <option value="immersive">Immersive Experience</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-zinc-500 uppercase mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    className="w-full bg-black border border-zinc-800 p-3 text-white text-sm sm:text-base focus:border-emerald-700 focus:outline-none transition-colors resize-none sm:rows-4"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold uppercase py-3 sm:py-4 text-sm sm:text-base hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-zinc-600 text-center">By submitting, you agree to our privacy policy.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
