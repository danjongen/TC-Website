import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiInstagram, FiTwitter } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, #00D9FF 25%, transparent 25%), linear-gradient(-45deg, #00D9FF 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #00D9FF 75%), linear-gradient(-45deg, transparent 75%, #00D9FF 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }} />
      </div>

      <div className="relative px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content with chaotic layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Oversized Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none">
                Let's <span className="text-accent transform inline-block -rotate-2">Talk</span>
              </h2>

              <div className="space-y-6">
                <motion.a
                  href="mailto:hello@tctech.com"
                  className="group flex items-center gap-4 text-2xl md:text-4xl font-bold hover:text-accent transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <FiMail className="text-accent" />
                  <span>hello@tctech.com</span>
                </motion.a>

                <motion.a
                  href="tel:+1234567890"
                  className="group flex items-center gap-4 text-2xl md:text-4xl font-bold hover:text-accent transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <FiPhone className="text-accent" />
                  <span>+1 (234) 567-890</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links & Newsletter - Offset layout */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5 lg:mt-16"
            >
              <div className="bg-white/5 border border-white/10 p-8 transform lg:rotate-1">
                <h3 className="text-2xl font-bold mb-6 text-accent">Stay Updated</h3>
                <form className="mb-8">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors mb-3"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="w-full bg-accent text-black font-bold py-3 uppercase tracking-wide hover:bg-white transition-colors"
                  >
                    Subscribe
                  </button>
                </form>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Quick Links
                  </h4>
                  <a href="#services" className="block hover:text-accent transition-colors">
                    Services
                  </a>
                  <a href="#case-studies" className="block hover:text-accent transition-colors">
                    Case Studies
                  </a>
                  <a href="#contact" className="block hover:text-accent transition-colors">
                    Contact
                  </a>
                  <a href="/about" className="block hover:text-accent transition-colors">
                    About Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Icons - Rotated and offset */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-xl font-bold mb-6 transform -rotate-1 inline-block">
              Follow <span className="text-accent">Our Journey</span>
            </h3>
            <div className="flex gap-6">
              {[
                { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiTwitter, href: '#', label: 'Twitter' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-16 h-16 border-2 border-white/20 flex items-center justify-center hover:border-accent hover:bg-accent hover:text-black transition-all transform hover:scale-110"
                  style={{ transform: `rotate(${index * 5 - 5}deg)` }}
                  whileHover={{ rotate: 0 }}
                >
                  <social.icon size={28} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              © 2025 TC Technical Direction. All rights reserved.
            </div>

            <div className="flex gap-8 text-sm">
              <a href="/privacy" className="text-gray-500 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-gray-500 hover:text-accent transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Accent stripe */}
      <div className="h-2 bg-gradient-to-r from-accent via-white to-accent" />
    </footer>
  )
}

export default Footer
