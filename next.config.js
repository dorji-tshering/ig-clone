/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com'
        },
        {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com'
        }
    ]
  }
}

module.exports = nextConfig
