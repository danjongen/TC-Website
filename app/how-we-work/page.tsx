import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BreadcrumbSchema } from "@/components/structured-data"

export const dynamic = "force-static"
export const revalidate = 86400

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Seven practical operating rules that guide how TC Agency communicates, decides, and delivers high-stakes production work.",
  openGraph: {
    title: "How We Work | TC Agency",
    description:
      "The operating rules behind TC Agency: direct communication, practical judgment, early warnings, and work that keeps getting better.",
    url: "https://www.tc.agency/how-we-work",
    siteName: "TC Agency - Technically Creative",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How TC Agency works",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Work | TC Agency",
    description: "Seven practical rules that define how TC Agency operates.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.tc.agency/how-we-work",
  },
}

const operatingRules = [
  {
    number: "01",
    title: "Common sense beats the rulebook.",
    description:
      "If a rule makes no sense in the room you're standing in, don't follow it off a cliff. Say so. We'll change the rule.",
  },
  {
    number: "02",
    title: "Take the shortest path.",
    description:
      "Talk straight to the person who can solve it, any team, any level. No relaying up and back down. Nobody here needs permission to make the right thing happen.",
  },
  {
    number: "03",
    title: "Say it in plain words.",
    description:
      "Name things so a new hire understands them on day one. If it needs a glossary, it needs a better name.",
  },
  {
    number: "04",
    title: "Meetings have to earn it.",
    description: "Small, short, or not at all. When the urgent thing is handled, the meeting ends with it.",
  },
  {
    number: "05",
    title: "Leaving isn't rude.",
    description:
      "If you're not adding or getting value, step out. Keeping someone in a room they don't belong in is the rude part.",
  },
  {
    number: "06",
    title: "Flag it early.",
    description: "Problems get cheaper the sooner they're spoken. Bad news travels fastest here and costs you nothing.",
  },
  {
    number: "07",
    title: "Tell us what would make this better.",
    description:
      "Better for the work, or better for your day. Over time they're the same thing. If you can see it, send it.",
  },
]

export default function HowWeWorkPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.tc.agency" },
          { name: "How We Work", url: "https://www.tc.agency/how-we-work" },
        ]}
      />

      <Navbar />

      <main id="main-content" className="pt-40 md:pt-48">
        <section className="pb-[14vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 01 / HOW WE WORK ]</p>
              <h1 className="mb-8 max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-white md:text-7xl">
                The standard behind the work.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                The identity isn't only how we look. It's how we operate. Seven rules. They apply to everyone,
                including whoever wrote them.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="operating-rules-heading" className="pb-[16vh]">
          <div className="container mx-auto px-6">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 02 / OPERATING RULES ]</p>
            <h2 id="operating-rules-heading" className="sr-only">
              Seven operating rules
            </h2>

            <div className="grid border-l border-t border-zinc-800 md:grid-cols-2">
              {operatingRules.map((rule) => (
                <article key={rule.number} className="min-h-72 border-b border-r border-zinc-800 p-8 md:p-10">
                  <p className="mb-8 font-mono text-[11px] tracking-[0.2em] text-zinc-500">[ {rule.number} ]</p>
                  <h3 className="mb-5 max-w-lg text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
                    {rule.title}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">{rule.description}</p>
                </article>
              ))}

              <article className="min-h-72 border-b border-r border-zinc-800 p-8 md:p-10">
                <h3 className="mb-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-[#00D26A]">
                  <span className="h-2 w-2 rounded-full bg-[#00D26A]" aria-hidden="true" />
                  CREW NOTE
                </h3>
                <div className="max-w-xl space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
                  <p>
                    Doors open at a fixed time and the room doesn't care about our excuses. That's the job, and it's why
                    the standard is what it is.
                  </p>
                  <p className="text-white">Thanks for holding it. Glad you're on this crew.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="pb-[16vh]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl border-t border-zinc-800 pt-12">
              <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">[ 03 / NEXT CUE ]</p>
              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                Bring us the hard problem.
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
                Tell us what has to work, when it has to work, and what cannot be allowed to fail.
              </p>
              <Link
                href="/contact"
                className="font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-[#00D26A]"
              >
                START A CONVERSATION →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
