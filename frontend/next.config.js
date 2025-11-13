/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  webpack: (config, { isServer }) => {
    // Fix for PaaS deployments
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

// For PaaS deployments, ensure we bind to 0.0.0.0
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  nextConfig.serverRuntimeConfig = {
    hostname: '0.0.0.0',
    port: process.env.PORT || 3000,
  };
}

module.exports = nextConfig
