const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    swcMinify: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-ap-northeast-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = withContentlayer(nextConfig);
