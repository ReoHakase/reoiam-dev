const { withContentlayer } = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    serverComponentsExternalPackages: ['pino'],
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
