/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Enable TypeScript strict checks (was ignoring errors)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Enable Vercel's automatic image optimization
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

  // Enable experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

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

  async redirects() {
    return [
      {
        source: '/capabilities',
        destination: '/services',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      // The SSL Shelf marketing page is a static Astro build emitted into
      // public/sslshelf by `npm run build:sslshelf` (see /sslshelf).
      {
        source: '/sslshelf',
        destination: '/sslshelf/index.html',
      },
    ]
  },
}

export default nextConfig
