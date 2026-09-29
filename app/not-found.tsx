import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CueLabel } from "@/components/motion/cue-label"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 pt-40 md:pt-48 pb-[14vh] text-center">
          <CueLabel className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">ERR_404_NOT_FOUND</CueLabel>

          <h1
            data-vt="title"
            data-reveal="rise"
            className="mx-auto w-fit text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6"
          >
            404
          </h1>

          <h2 data-reveal="rise" className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">
            Page not found
          </h2>
          <p data-reveal="fade" className="text-lg leading-relaxed text-zinc-400 max-w-xl mx-auto mb-12">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              data-reveal="fade"
              href="/"
              className="-my-1 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
            >
              RETURN HOME →
            </Link>
            <Link
              data-reveal="fade"
              href="/contact"
              className="-my-1 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
            >
              CONTACT US →
            </Link>
          </div>

          <div className="mt-20">
            <div data-reveal="line" className="h-px origin-left bg-zinc-900 mb-8" aria-hidden="true" />
            <p data-reveal="fade" className="text-base text-zinc-400 mb-6">
              Looking for something specific?
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link
                data-reveal="fade"
                href="/capabilities"
                className="-my-1 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
              >
                SERVICES
              </Link>
              <Link
                data-reveal="fade"
                href="/approach"
                className="-my-1 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
              >
                APPROACH
              </Link>
              <Link
                data-reveal="fade"
                href="/mission"
                className="-my-1 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
              >
                MISSION
              </Link>
              <Link
                data-reveal="fade"
                href="/portfolio"
                className="-my-1 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
              >
                PORTFOLIO
              </Link>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
