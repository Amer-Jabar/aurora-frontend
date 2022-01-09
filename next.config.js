module.exports = {
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
        destination: `https://amer-muhammad.herokuapp.com/api/:path*` // Proxy to Backend
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}