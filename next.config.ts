import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [];
  },
  async redirects() {
    return [];
  },
  webpack(config) {
    return config;
  },
};

export default config;