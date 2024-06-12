/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/web-ui"],
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // TODO Remove old domain
      {
        protocol: "http",
        hostname: "webdev.wurthlac.com",
      },
      // TODO Remove this domain
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "wurthlac.x-shops.com",
      },
      // TODO Remove this domain
      {
        protocol: "https",
        hostname: "www.wurthmachinery.com",
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
