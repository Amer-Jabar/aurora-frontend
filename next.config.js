module.exports = {
  images: {
    domains: ['localhost']
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}