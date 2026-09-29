import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { CueLabel } from "@/components/motion/cue-label"

export const metadata: Metadata = {
  title: "Security & Data Protection Statement | TC Agency",
  description: "Learn how TC Agency protects your data with technical and organizational security measures.",
  openGraph: {
    title: "Security & Data Protection Statement | TC Agency",
    description: "Learn how TC Agency protects your data with technical and organizational security measures.",
    url: "https://tc.agency/security",
  },
}

export default function Security() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="pt-40 md:pt-48 pb-[14vh]">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/"
            className="-mt-1 mb-11 inline-flex items-center gap-2 py-1 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors duration-300 ease-expo hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <header className="mb-16">
            <CueLabel className="mb-6 font-mono text-[11px] tracking-[0.2em] text-zinc-400">LAST UPDATED / NOVEMBER 27, 2025</CueLabel>
            <h1 data-vt="title" data-reveal="rise" className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-white mb-6">Security & Data Protection Statement</h1>
            <div data-reveal="fade" className="text-sm text-zinc-400">
              <p>
                Technically Creative LLC, operating as TC Agency, TC, and Tech Creative ("we", "our", "us", "Technically
                Creative")
              </p>
              <p>Detroit, MI, USA</p>
              <p>
                <a href="mailto:info@tc.agency" className="text-white underline-offset-4 transition-colors duration-300 ease-expo hover:text-[#00D26A] hover:underline">
                  info@tc.agency
                </a>
              </p>
            </div>
          </header>

          <div className="max-w-none space-y-10">
            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Our Commitment to Security</h2>
              <p className="text-zinc-400 leading-relaxed">
                Technically Creative LLC (TC Agency) takes the security of your personal information seriously. We
                implement appropriate technical and organizational measures to protect data against unauthorized access,
                alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Technical Measures</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>HTTPS encryption for all data in transit</li>
                <li>Secure hosting infrastructure via Vercel</li>
                <li>Regular security updates and patches</li>
                <li>Access controls and authentication for internal systems</li>
                <li>Minimal data collection practices</li>
              </ul>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Organizational Measures</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Staff awareness of data protection responsibilities</li>
                <li>Regular review of security practices</li>
                <li>Vendor due diligence for third-party services</li>
              </ul>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Third-Party Services</h2>
              <p className="text-zinc-400 leading-relaxed mb-2">
                We use trusted third-party services that maintain their own security standards:
              </p>
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                <li>
                  <strong className="text-white">Vercel</strong>: Hosting and deployment
                </li>
                <li>
                  <strong className="text-white">Google Analytics</strong>: Performance analytics
                </li>
                <li>
                  <strong className="text-white">Microsoft Clarity</strong>: Session insights
                </li>
                <li>
                  <strong className="text-white">Resend</strong>: Email delivery
                </li>
              </ul>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Incident Response</h2>
              <p className="text-zinc-400 leading-relaxed">
                In the unlikely event of a data breach, we will notify affected individuals and relevant authorities as
                required by applicable law. We maintain procedures to detect, investigate, and respond to potential
                security incidents.
              </p>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">Reporting Security Concerns</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                If you discover a potential security vulnerability or have concerns about data protection, please
                contact us immediately:
              </p>
              <div className="my-4">
                <p className="text-sm text-zinc-400">
                  <strong className="text-white">
                    Technically Creative LLC, operating as TC Agency, TC, and Tech Creative
                  </strong>
                  <br />
                  Detroit, MI, USA
                  <br />
                  Email:{" "}
                  <a href="mailto:info@tc.agency" className="text-white underline underline-offset-4 transition-colors duration-300 ease-expo hover:text-[#00D26A]">
                    info@tc.agency
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 data-reveal="fade" className="text-2xl font-semibold tracking-[-0.03em] text-white mb-4">No Guarantee</h2>
              <p className="text-zinc-400 leading-relaxed">
                While we implement robust security measures, no method of transmission or storage is 100% secure. We
                cannot guarantee absolute security but are committed to protecting your information to the best of our
                ability.
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
