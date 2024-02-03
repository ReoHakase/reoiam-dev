const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
    swcMinify: true,
  },
  reactStrictMode: true,
};

module.exports = withContentlayer(nextConfig);
