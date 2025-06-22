/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://localhost:3000', 'http://192.168.0.5:3000'],
  },
}

module.exports = nextConfig;
