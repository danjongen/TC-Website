import { use } from "react"
import { ShareView } from "../../components/ShareView"

export const metadata = {
  title: "LED Wall Spec / Shared",
  robots: { index: false, follow: false },
}

export default function SharePage({
  params,
}: {
  params: Promise<{ config: string }>
}) {
  const { config } = use(params)
  return <ShareView token={config} />
}
