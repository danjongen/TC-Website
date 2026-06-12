import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 pt-40 md:pt-48 pb-[14vh] text-center">
          <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ ERR_404_NOT_FOUND ]</p>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">404</h1>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white mb-6">Page not found</h2>
          <p className="text-lg leading-relaxed text-zinc-400 max-w-xl mx-auto mb-12">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              href="/"
              className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              RETURN HOME →
            </Link>
            <Link
              href="/contact"
              className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              CONTACT US →
            </Link>
          </div>

          <div className="mt-20">
            <div className="h-px bg-zinc-900 mb-8" aria-hidden="true" />
            <p className="text-base text-zinc-400 mb-6">Looking for something specific?</p>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/capabilities"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                SERVICES
              </Link>
              <Link
                href="/approach"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                APPROACH
              </Link>
              <Link
                href="/mission"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                MISSION
              </Link>
              <Link
                href="/portfolio"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
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
