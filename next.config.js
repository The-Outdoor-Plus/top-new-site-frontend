/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Change this from 'export' to 'standalone'
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;
