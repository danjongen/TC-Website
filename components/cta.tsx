"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Loader2, Mail, Phone, MapPin } from "lucide-react"

const MATRIX_GREEN = "#00D26A"

export function CTA() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 lg:py-32 border-b border-border bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: MATRIX_GREEN }} />

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
              <h2 className="text-xs font-mono text-gray-400 mb-3 sm:mb-4 uppercase tracking-widest">05 / Contact</h2>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                Let's build something.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
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
                <div className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-1">Email</p>
                  <a
                    href="mailto:info@tc.agency"
                    className={`text-white transition-colors font-medium text-sm sm:text-base hover:text-[${MATRIX_GREEN}]`}
                    style={{ ["--hover-color" as string]: MATRIX_GREEN }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                  >
                    info@tc.agency
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                  <a
                    href="tel:+13132615200"
                    className="text-white transition-colors font-medium text-sm sm:text-base"
                    onMouseEnter={(e) => (e.currentTarget.style.color = MATRIX_GREEN)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                  >
                    +1 313 261 5200
                  </a>
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-1">Locations</p>
                  <p className="text-white font-medium text-sm sm:text-base">Detroit, MI</p>
                  <p className="text-gray-400 text-sm">Los Angeles, CA</p>
                  <p className="text-gray-400 text-sm">Las Vegas, NV</p>
                </div>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 sm:mt-8 p-4 border border-border bg-black hidden sm:block"
            >
              <p className="text-xs font-mono text-gray-400 uppercase tracking-wide mb-1">Response Time</p>
              <p className="text-sm text-gray-300">We typically respond within 24 hours during business days.</p>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black border border-border p-5 sm:p-8"
          >
            <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide mb-4 sm:mb-6">Send us a message</h3>

            {isSuccess ? (
              <div className="py-8 sm:py-12 flex flex-col items-center text-white">
                <Check className="w-10 h-10 sm:w-12 sm:h-12 mb-4" />
                <p className="text-base sm:text-lg font-bold uppercase tracking-wide">Message Sent</p>
                <p className="text-sm text-gray-400 mt-2">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-gray-400 uppercase mb-1">
                      Name *
                    </label>
                    <input
                      id="name"
                      required
                      type="text"
                      className="w-full bg-background border border-border p-3 text-white text-sm sm:text-base focus:outline-none transition-colors"
                      style={{ ["--focus-border" as string]: MATRIX_GREEN }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = MATRIX_GREEN)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-mono text-gray-400 uppercase mb-1">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="w-full bg-background border border-border p-3 text-white text-sm sm:text-base focus:outline-none transition-colors"
                      onFocus={(e) => (e.currentTarget.style.borderColor = MATRIX_GREEN)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                      placeholder="Your company"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-gray-400 uppercase mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      className="w-full bg-background border border-border p-3 text-white text-sm sm:text-base focus:outline-none transition-colors"
                      onFocus={(e) => (e.currentTarget.style.borderColor = MATRIX_GREEN)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono text-gray-400 uppercase mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full bg-background border border-border p-3 text-white text-sm sm:text-base focus:outline-none transition-colors"
                      onFocus={(e) => (e.currentTarget.style.borderColor = MATRIX_GREEN)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="project-type" className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    className="w-full bg-background border border-border p-3 text-white text-sm sm:text-base focus:outline-none transition-colors"
                    onFocus={(e) => (e.currentTarget.style.borderColor = MATRIX_GREEN)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
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
                  <label htmlFor="message" className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    className="w-full bg-background border border-border p-3 text-white text-sm sm:text-base focus:outline-none transition-colors resize-none sm:rows-4"
                    onFocus={(e) => (e.currentTarget.style.borderColor = MATRIX_GREEN)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-bold uppercase py-3 sm:py-4 text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-matrix-hover"
                  style={{ backgroundColor: MATRIX_GREEN, color: "#000000" }}
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
                <p className="text-xs text-gray-500 text-center">By submitting, you agree to our privacy policy.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
