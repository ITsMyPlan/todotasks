const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'app')
    config.resolve.alias['@/store'] = path.resolve(__dirname, 'store')
    config.resolve.alias['@/public'] = path.resolve(__dirname, 'public')
    config.resolve.alias['@/styles'] = path.resolve(__dirname, 'styles')
    config.resolve.alias['@/common'] = path.resolve(__dirname, 'common')
    return config
  },
}

module.exports = nextConfig
