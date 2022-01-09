module.exports = {
  images: {
    domains: ['localhost', '127.0.0.1']
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
  async rewrites() {
    return [
      {
        source: '/api/server/:path*',
        destination: `http://${'localhost'}:${4445}/api/:path*` // Proxy to Backend
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}