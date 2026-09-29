import Link from "next/link"

import type { Faq } from "../_content/faq"

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-zinc-800">
      {faqs.map((faq) => (
        <details key={faq.id} id={`faq-${faq.id}`} className="group scroll-mt-28 border-b border-zinc-800">
          <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold tracking-[-0.02em] transition-colors duration-300 ease-expo hover:text-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D26A] md:text-xl [&::-webkit-details-marker]:hidden">
            <span>{faq.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 font-mono text-sm text-[#00D26A] transition-transform duration-300 ease-expo group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="max-w-3xl pb-7 leading-relaxed text-zinc-300">
            <p>{faq.a}</p>
            {faq.link && (
              <p className="mt-4">
                <Link
                  href={faq.link.href}
                  className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-white underline decoration-zinc-600 underline-offset-4 transition-colors duration-300 ease-expo hover:text-[#00D26A] hover:decoration-[#00D26A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D26A]"
                >
                  {faq.link.label}
                </Link>
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
