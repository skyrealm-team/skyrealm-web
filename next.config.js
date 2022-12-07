/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  rewrites: () => {
    return [
      {
        source: "/dev.skyrealm.ai/:path*",
        destination: `https://dev.skyrealm.ai/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
