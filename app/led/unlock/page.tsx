import { Glyph } from "../components/Glyph"
import { unlock } from "./actions"

export const metadata = {
  title: "LED Tool / Locked",
  robots: { index: false, follow: false },
}

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>
}) {
  const sp = await searchParams
  const from = sp.from || "/led"
  const error = sp.error === "1"
  const configured = Boolean(process.env.LED_TOOL_PASSWORD)

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] panel p-6">
        <div className="flex items-center gap-2 mb-6">
          <Glyph size={16} />
          <span className="mono text-[11px] tracking-[0.08em] uppercase">
            TECHNICALLY CREATIVE / DETROIT
          </span>
        </div>
        <div className="mb-5">
          <div className="label mb-1">26-TCX-01-LEDTOOL</div>
          <h1 className="mono text-[20px] font-bold uppercase tracking-tight">
            LED WALL / SPEC GENERATOR
          </h1>
          <p className="mono text-[10px] uppercase text-[var(--led-ink-faint)] mt-2">
            INTERNAL TOOL / ENTER PASSWORD TO CONTINUE
          </p>
        </div>
        <form action={unlock} className="space-y-4">
          <input type="hidden" name="from" value={from} />
          <div>
            <div className="label mb-1.5">PASSWORD</div>
            <input
              type="password"
              name="password"
              autoFocus
              required
              autoComplete="off"
            />
          </div>
          {error ? (
            <div
              className="mono text-[10px] uppercase border px-2 py-1.5"
              style={{
                borderColor: "rgba(255, 95, 95, 0.4)",
                color: "#ff5f5f",
                background: "rgba(255, 95, 95, 0.05)",
              }}
            >
              INCORRECT / TRY AGAIN
            </div>
          ) : null}
          {!configured ? (
            <div
              className="mono text-[10px] uppercase border px-2 py-1.5"
              style={{
                borderColor: "rgba(255, 176, 0, 0.4)",
                color: "#ffb000",
                background: "rgba(255, 176, 0, 0.05)",
              }}
            >
              NOT CONFIGURED / LED_TOOL_PASSWORD ENV VAR IS NOT SET ON THIS
              DEPLOYMENT - NO PASSWORD WILL WORK UNTIL IT IS
            </div>
          ) : null}
          <button type="submit" className="cta cta-primary w-full">
            UNLOCK /
          </button>
        </form>
      </div>
    </div>
  )
}
