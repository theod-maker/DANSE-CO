import type { NextConfig } from 'next'
import path from 'path'

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
]

const config: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  transpilePackages: ['sanity', '@sanity/vision'],
  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }]
  },
  webpack: (webpackConfig, { isServer }) => {
    if (!isServer) {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'react/jsx-runtime': path.resolve('./node_modules/react/jsx-runtime'),
        'react/jsx-dev-runtime': path.resolve('./node_modules/react/jsx-dev-runtime'),
      }
    }
    return webpackConfig
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default config
