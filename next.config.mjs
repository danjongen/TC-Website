/** @type {import('next').NextConfig} */
const nextConfig = {
  // <CHANGE> Enable React strict mode for better error detection
  reactStrictMode: true,

  // <CHANGE> Enable TypeScript strict checks (was ignoring errors)
  typescript: {
    ignoreBuildErrors: false,
  },

  // <CHANGE> Enable Vercel's automatic image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },

  // <CHANGE> Enable experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Redirects for renamed service pages
  async redirects() {
    return [
      {
        source: '/services/consulting',
        destination: '/services/executive-consulting',
        permanent: true,
      },
      {
        source: '/services/automation',
        destination: '/services/workflow-automation',
        permanent: true,
      },
    ]
  },

  // <CHANGE> Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
