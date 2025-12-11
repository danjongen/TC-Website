import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you", "/portfolio/preview", "/insights/preview", "/unsubscribe"],
      },
    ],
    sitemap: "https://tc.agency/sitemap.xml",
    host: "https://tc.agency",
  }
}
