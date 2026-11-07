import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/brand/favicon.ico' },
      { source: '/icon.svg', destination: '/brand/favicon.svg' },
    ];
  },
};

export default nextConfig;
