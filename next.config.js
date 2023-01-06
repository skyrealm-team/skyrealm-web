/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  optimizeFonts: true,
  publicRuntimeConfig: {
    env: process.env,
  },
};

module.exports = nextConfig;
