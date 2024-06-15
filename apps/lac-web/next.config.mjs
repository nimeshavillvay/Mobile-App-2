/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/web-ui"],
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wurthlac-dev.x-shops.com", // Development
      },
      {
        protocol: "https",
        hostname: "wurthlac.x-shops.com", // Production
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  eslint: {
    dirs: ["app"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
