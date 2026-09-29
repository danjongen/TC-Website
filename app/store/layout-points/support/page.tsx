import type { Metadata } from "next"
import Link from "next/link"

import { CueLabel } from "@/components/motion/cue-label"

import { breadcrumbJsonLd, JsonLd } from "../_components/json-ld"
import { subPageMetadata } from "../_components/meta"
import { FaqList } from "../_components/faq-list"
import { SupportForm } from "../_components/support-form"
import { TrackMount } from "../_components/track"
import { container, eyebrow, sectionHeading, textLink } from "../_components/ui"
import { getFaqs } from "../_content/faq"

const description =
  "Support for Layout Points and Datum Label Studio: quick start, installation, first field package, exact datum placement, printer calibration, troubleshooting, release notes, known issues and contact."

export const metadata: Metadata = subPageMetadata({
  title: "Layout Points Support",
  description,
  path: "/support",
})

const topics = [
  {
    title: "Quick Start",
    href: "/store/layout-points/docs#quick-start",
    detail: "Sample job to measured label in eight steps.",
  },
  {
    title: "Installation",
    href: "/store/layout-points/docs#installation",
    detail: "Both components, no Terminal needed.",
  },
  {
    title: "First Field Package",
    href: "/store/layout-points/docs#export",
    detail: "Export, contents and Package verified.",
  },
  { title: "Exact Datum Placement", href: "/store/layout-points/docs#exact-datum", detail: "Centre, edge or corner." },
  {
    title: "Printer Calibration",
    href: "/store/layout-points/docs#calibration",
    detail: "Four gaps, two rulers, one correction.",
  },
  {
    title: "Troubleshooting",
    href: "/store/layout-points/docs#troubleshooting",
    detail: "Symptoms, causes and fixes.",
  },
  { title: "Release Notes", href: "/store/layout-points/changelog", detail: "Every version with checksums." },
  {
    title: "Known Issues",
    href: "/store/layout-points/changelog#known-issues",
    detail: "What we know is not right yet.",
  },
]

export default function SupportPage() {
  const faqs = getFaqs()

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Support", path: "/store/layout-points/support" }])} />
      <TrackMount event="lp_open_support" />

      <section className={`${container} pb-12 pt-12 md:pb-16 md:pt-16`}>
        <h1
          data-vt="title"
          data-reveal="rise"
          className="w-fit max-w-[14ch] text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl"
        >
          Support.
        </h1>
        <p data-reveal="fade" className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Most answers are in the docs. If yours is not, send the details below and we will reply by email.
        </p>
      </section>

      <section aria-label="Support topics" className="border-t border-zinc-800">
        <div className={`${container} py-12 md:py-16`}>
          <ul className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic, index) => (
              <li key={topic.title} className="bg-black">
                <Link
                  href={topic.href}
                  className="group flex h-full min-h-40 flex-col justify-between p-6 transition-colors duration-300 ease-expo hover:bg-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A]"
                >
                  <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#00D26A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 ease-expo group-hover:text-[#00D26A]">
                      {topic.title}
                    </span>
                    <span className="mt-2 block text-sm text-zinc-400">{topic.detail}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-24 border-t border-zinc-800 bg-zinc-950"
      >
        <div
          className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]`}
        >
          <div>
            <CueLabel index="01" className={eyebrow}>
              CONTACT SUPPORT
            </CueLabel>
            <h2 id="contact-heading" data-reveal="rise" className={`${sectionHeading} max-w-[12ch]`}>
              Tell us what happened.
            </h2>
            <div data-reveal="fade" className="mt-6 max-w-md space-y-4 leading-relaxed text-zinc-400">
              <p>
                The more of the form you fill in, the fewer questions we have to send back. The sample field package is
                the safest thing to attach if you need to show a problem.
              </p>
              <p>
                Found a security issue? Do not use this form. Follow the{" "}
                <Link href="/security" className={textLink}>
                  security page
                </Link>
                .
              </p>
              <p>
                Prefer email? Write to{" "}
                <a href="mailto:info@tc.agency" className={textLink}>
                  info@tc.agency
                </a>
                .
              </p>
            </div>
          </div>
          <div className="border border-zinc-800 bg-black p-6 md:p-9">
            <SupportForm />
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="support-faq-heading" className="scroll-mt-24 border-t border-zinc-800">
        <div
          className={`${container} grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]`}
        >
          <div>
            <CueLabel index="02" className={eyebrow}>
              FAQ
            </CueLabel>
            <h2 id="support-faq-heading" data-reveal="rise" className={`${sectionHeading} max-w-[10ch]`}>
              Common questions.
            </h2>
            <p className="mt-6 text-sm text-zinc-400">
              <Link href="/store/layout-points/changelog" className={textLink}>
                Release notes
              </Link>
            </p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  )
}
