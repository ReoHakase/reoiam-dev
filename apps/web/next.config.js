const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'octodex.github.com' }],
  },
};

module.exports = withContentlayer(nextConfig);
