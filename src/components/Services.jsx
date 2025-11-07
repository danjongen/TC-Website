import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FiTrendingUp,
  FiLayout,
  FiTarget,
  FiCamera,
  FiBox,
  FiMonitor,
  FiPackage,
  FiBook
} from 'react-icons/fi'

const services = [
  {
    icon: FiTrendingUp,
    title: 'Technical Direction',
    tagline: 'Executive-level oversight for complex technical projects',
    description: 'Strategic planning and implementation of large-scale technical systems'
  },
  {
    icon: FiTarget,
    title: 'Production Management',
    tagline: 'End-to-end project delivery',
    description: 'Comprehensive management from concept to completion'
  },
  {
    icon: FiLayout,
    title: 'Design',
    tagline: 'Creative solutions meets technical precision',
    description: 'Stage design, scenic elements, and immersive experiences'
  },
  {
    icon: FiCamera,
    title: 'Aerial Surveying',
    tagline: 'Advanced drone capture & cinematography',
    description: 'High-resolution site surveys and aerial footage'
  },
  {
    icon: FiBox,
    title: '3D Scanning & Modeling',
    tagline: 'Digital twin technology',
    description: 'Precision scanning, photogrammetry, and 3D modeling'
  },
  {
    icon: FiMonitor,
    title: 'Unreal Visualizations',
    tagline: 'Real-time 3D experiences',
    description: 'Virtual production, pre-viz, and interactive content'
  },
  {
    icon: FiPackage,
    title: 'Equipment Rentals',
    tagline: 'Premium technical gear',
    description: 'LED walls, projection, control systems, and more'
  },
  {
    icon: FiBook,
    title: 'Training & IP',
    tagline: 'Knowledge transfer & development',
    description: 'Custom training programs and intellectual property'
  }
]

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white/5 border border-white/10 p-8 hover:border-accent hover:bg-white/10 transition-all duration-300"
    >
      <div className="mb-6 text-accent">
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
        {service.title}
      </h3>
      <p className="text-accent text-sm font-semibold mb-3 uppercase tracking-wide">
        {service.tagline}
      </p>
      <p className="text-gray-400 leading-relaxed">{service.description}</p>

      {/* Hover effect corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            What <span className="text-accent">We Do</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Full-spectrum technical services for entertainment, automotive, and tech industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
