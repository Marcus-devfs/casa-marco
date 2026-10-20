import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // O site público é o HTML estático em public/index.html (cardápio e
  // reservas vêm do painel em /api/public/*).
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/index.html' }],
      afterFiles: [],
      fallback: [],
    }
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
}

export default nextConfig
