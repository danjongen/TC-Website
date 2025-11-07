import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const slides = [
  {
    title: 'Strategic Excellence',
    subtitle: 'Executive-Level Technical Direction',
    content: 'We bring A++ technical leadership to your most ambitious projects, ensuring flawless execution from concept to delivery.',
    icon: '🎯'
  },
  {
    title: 'Production Management',
    subtitle: 'End-to-End Project Oversight',
    content: 'Comprehensive production management for touring shows, corporate events, and large-scale installations. On time, on budget, beyond expectations.',
    icon: '🎬'
  },
  {
    title: 'Design & Innovation',
    subtitle: 'Creative Technical Solutions',
    content: 'Cutting-edge design services that merge aesthetics with technical precision. From stage design to immersive experiences.',
    icon: '✨'
  },
  {
    title: 'Aerial Surveying',
    subtitle: 'Advanced Data Capture',
    content: 'Professional drone surveying and aerial cinematography. Delivering high-resolution data for venues, sites, and events.',
    icon: '🚁'
  },
  {
    title: '3D Scanning & Modeling',
    subtitle: 'Digital Twin Technology',
    content: 'Precision 3D scanning and photogrammetry. Create accurate digital models for pre-visualization and planning.',
    icon: '📐'
  },
  {
    title: 'Unreal Engine Visualizations',
    subtitle: 'Real-Time 3D Experiences',
    content: 'Stunning real-time visualizations, virtual production, and interactive experiences powered by Unreal Engine.',
    icon: '🎮'
  },
  {
    title: 'Equipment Rentals',
    subtitle: 'Premium Gear, Ready to Deploy',
    content: 'High-end technical equipment rentals. LED walls, projection systems, control infrastructure, and more.',
    icon: '🔧'
  },
  {
    title: 'Training & IP',
    subtitle: 'Knowledge Transfer',
    content: 'Custom training programs and intellectual property development. Empower your team with cutting-edge skills.',
    icon: '📚'
  },
  {
    title: 'Proven Track Record',
    subtitle: 'Industry-Leading Clients',
    content: 'Trusted by Backstreet Boys, Gwen Stefani, Jelly Roll, Ford, Google, OpenAI, and more.',
    icon: '⭐'
  },
  {
    title: 'Let's Build Together',
    subtitle: 'Ready for Executive-Level Excellence?',
    content: 'Partner with us for your next project. Contact us to discuss how we can elevate your technical execution.',
    icon: '🤝'
  }
]

const DeckOverlay = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-50 text-white hover:text-accent transition-colors"
            aria-label="Close presentation"
          >
            <FiX size={40} />
          </button>

          {/* Slide content */}
          <div
            className="relative w-full h-full flex items-center justify-center px-12 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto text-center"
              >
                <div className="text-8xl mb-8">{slides[currentSlide].icon}</div>
                <h2 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-2xl md:text-3xl text-accent font-bold mb-8">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {slides[currentSlide].content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={48} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
              aria-label="Next slide"
            >
              <FiChevronRight size={48} />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-accent w-12' : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="absolute bottom-12 right-12 text-gray-400 text-lg font-mono">
            {currentSlide + 1} / {slides.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeckOverlay
