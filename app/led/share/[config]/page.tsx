import { ShareView } from "../../components/ShareView"
import { resolvePublishedCabinet } from "../../lib/cabinetDb"
import { decodeConfig } from "../../lib/encode"

export const metadata = {
  title: "LED Wall Spec / Shared",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function SharePage({
  params,
}: {
  params: Promise<{ config: string }>
}) {
  const { config } = await params
  const cfg = decodeConfig(config)
  const resolvedCabinet = cfg ? await resolvePublishedCabinet(cfg.cabinet_id) : null
  return <ShareView token={config} resolvedCabinet={resolvedCabinet} />
}
