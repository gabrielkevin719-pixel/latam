/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/profile-picture.php',
        destination: '/api/profile-picture',
      },
    ]
  },
}

module.exports = nextConfig
