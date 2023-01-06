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
    env: {
      BACKEND_API: {
        development: "https://dev.skyrealm.ai/gql/schema",
        production: "https://www.skyrealm.ai/gql/schema",
      }[process.env.NODE_ENV ?? "development"],
    },
  },
};

module.exports = nextConfig;
