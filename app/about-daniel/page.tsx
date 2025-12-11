import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Executive Technical Producer Daniel Jongen",
  description:
    "Executive Technical Producer Daniel Jongen leads Technically Creative (TC Agency), overseeing technical direction, production engineering, and high-stakes show execution for global brands, artists, tours, and large-format productions.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tc.agency/about-daniel",
  },
}

export default function AboutDanielPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Executive Technical Producer Daniel Jongen</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Executive Technical Producer Daniel Jongen leads Technically Creative (TC Agency), overseeing technical
          direction, production engineering, and high-stakes show execution for global brands, artists, tours, and
          large-format productions.
        </p>
      </div>
    </main>
  )
}
