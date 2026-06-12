"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

const GREEN = "#00D26A"

const PROJECTS = [
  {
    title: "Into The Millennium",
    client: "Backstreet Boys",
    role: "Automation, Power & Data Systems",
    image: "/images/bsb-live-02.jpg",
    index: "001",
  },
  {
    title: "The Sphere Experience",
    client: "Las Vegas, NV",
    role: "Video Systems Integration",
    image: "/images/bsb-live-04.jpg",
    index: "002",
  },
  {
    title: "Immersive Stage Design",
    client: "Global Festival",
    role: "Technical Direction",
    image: "/images/rainbow-stage.jpg",
    index: "003",
  },
  {
    title: "Organic Structure Rig",
    client: "Major Artist",
    role: "Structural Engineering",
    image: "/images/skeletal-stage.jpg",
    index: "004",
  },
  {
    title: "FOH Control Systems",
    client: "Stadium Series",
    role: "Workflow Automation",
    image: "/images/foh-control.jpg",
    index: "005",
  },
  {
    title: "Vertical Lift System",
    client: "Broadcast Spectacular",
    role: "Automation Design",
    image: "/images/vertical-lift.jpg",
    index: "006",
  },
]

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  // per-card parallax: image drifts inside its frame as the card crosses the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <div ref={ref} className="group relative h-[70vh] w-[85vw] shrink-0 overflow-hidden md:h-[75vh] md:w-[60vw]">
      <motion.div style={{ y: imageY }} className="absolute inset-[-14%]">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.client}`}
          fill
          sizes="(max-width: 768px) 85vw, 60vw"
          className="object-cover transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-110"
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 md:p-12">
        <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-zinc-400">
          {project.index} / 006 — {project.role.toUpperCase()}
        </p>
        <h3 className="text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">{project.title}</h3>
        <p className="mt-2 text-zinc-400">{project.client}</p>
      </div>
    </div>
  )
}

export function ProjectsGallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] })
  // pin the gallery and translate it horizontally as the user scrolls vertically
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative bg-black" aria-label="Featured projects">
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-[20vh] md:px-12">
        <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ 02 — SELECTED WORK ]</p>
        <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-white md:text-7xl">
          Built for the biggest stages on Earth
        </h2>
      </div>

      <div ref={trackRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-[8vw]">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.index} project={p} />
            ))}
            <Link
              href="/portfolio"
              data-cursor="hover"
              className="flex h-[70vh] w-[60vw] shrink-0 items-center justify-center transition-colors duration-300 md:h-[75vh] md:w-[35vw]"
            >
              <span className="font-mono text-base tracking-[0.25em] text-zinc-500 transition-colors duration-300 hover:text-white">FULL PORTFOLIO →</span>
            </Link>
          </motion.div>
          <div className="absolute bottom-10 left-6 right-6 h-px bg-zinc-900 md:left-[8vw] md:right-[8vw]">
            <motion.div className="h-full origin-left" style={{ scaleX: progressScale, background: GREEN }} />
          </div>
        </div>
      </div>
    </section>
  )
}
