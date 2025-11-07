import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

const clients = [
  { name: 'Backstreet Boys', category: 'Entertainment' },
  { name: 'Gwen Stefani', category: 'Entertainment' },
  { name: 'Jelly Roll', category: 'Entertainment' },
  { name: 'Ford', category: 'Automotive' },
  { name: 'Google', category: 'Technology' },
  { name: 'OpenAI', category: 'Technology' }
]

const featuredCase = {
  client: 'Major Touring Production',
  title: 'End-to-End Technical Direction for Global Tour',
  challenge: 'Coordinate complex technical infrastructure across 50+ venues in 6 continents with zero downtime',
  solution: 'Implemented comprehensive pre-visualization using Unreal Engine, deployed modular LED systems, and established remote monitoring protocols',
  result: '100% show success rate, 30% faster load-in times, and seamless technical execution across all venues',
  stats: [
    { value: '50+', label: 'Venues' },
    { value: '6', label: 'Continents' },
    { value: '100%', label: 'Success Rate' },
    { value: '30%', label: 'Time Saved' }
  ]
}

const CaseStudies = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Client Logos */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-center">
            Trusted by <span className="text-accent">Industry Leaders</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Delivering excellence across entertainment, automotive, and technology
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="bg-white/5 border border-white/10 p-6 hover:border-accent hover:bg-white/10 transition-all duration-300 h-32 flex items-center justify-center">
                  <div>
                    <p className="text-white font-bold text-lg group-hover:text-accent transition-colors">
                      {client.name}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                      {client.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 text-9xl font-black text-accent/10 select-none">
            01
          </div>

          <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-12 md:p-16">
            <span className="inline-block px-4 py-2 bg-accent text-black text-xs font-bold uppercase tracking-wider mb-6">
              Featured Case Study
            </span>

            <h3 className="text-4xl md:text-5xl font-black mb-4">{featuredCase.title}</h3>
            <p className="text-xl text-accent mb-12">{featuredCase.client}</p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <h4 className="text-accent font-bold uppercase tracking-wide text-sm mb-3">
                  Challenge
                </h4>
                <p className="text-gray-300">{featuredCase.challenge}</p>
              </div>
              <div>
                <h4 className="text-accent font-bold uppercase tracking-wide text-sm mb-3">
                  Solution
                </h4>
                <p className="text-gray-300">{featuredCase.solution}</p>
              </div>
              <div>
                <h4 className="text-accent font-bold uppercase tracking-wide text-sm mb-3">
                  Result
                </h4>
                <p className="text-gray-300">{featuredCase.result}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              {featuredCase.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button className="group flex items-center gap-2 px-8 py-4 bg-accent text-black font-bold uppercase tracking-wide hover:bg-white transition-colors">
                View More Case Studies
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudies
