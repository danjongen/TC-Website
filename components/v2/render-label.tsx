/** Marks visualisation imagery so a render is never read as a photo of a finished event. */
export function RenderLabel({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block border border-zinc-700 px-2 py-1 font-mono text-[10px] leading-none tracking-[0.25em] text-zinc-300 ${className}`}
    >
      RENDER
    </span>
  )
}
