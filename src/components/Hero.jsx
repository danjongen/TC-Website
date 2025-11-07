import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'

const Hero = ({ onOpenDeck }) => {
  const handleDownloadDeck = () => {
    // Track conversion event
    if (window.gtag) {
      window.gtag('event', 'download_deck', {
        event_category: 'engagement',
        event_label: 'Deck Download'
      })
    }
    // In production, this would download the actual deck
    alert('Deck download would trigger here. Add your deck PDF to /public folder.')
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        {/* Placeholder for video - replace with actual video */}
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* In production, replace with: */}
          {/* <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video> */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="grid grid-cols-8 gap-4 transform rotate-12 scale-150">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-16 h-16 border border-accent/20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            We deliver <span className="text-accent">A++</span> technical direction at{' '}
            <span className="italic">executive level</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Production management, design, and technical excellence for entertainment,
            automotive, and tech industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#services"
              className="group px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wide hover:bg-accent hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Explore our services
              <FiArrowDown className="group-hover:translate-y-1 transition-transform" />
            </a>
            <button
              onClick={handleDownloadDeck}
              className="px-8 py-4 border-2 border-accent text-accent font-bold text-lg uppercase tracking-wide hover:bg-accent hover:text-black transition-all duration-300"
            >
              Download deck
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12"
          >
            <button
              onClick={onOpenDeck}
              className="text-sm uppercase tracking-widest text-gray-400 hover:text-accent transition-colors underline underline-offset-4"
            >
              View Presentation
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-accent"
          >
            <FiArrowDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
