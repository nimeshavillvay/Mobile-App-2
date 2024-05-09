/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/web-ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // TODO Remove old domain
      {
        protocol: "http",
        hostname: "webdev.wurthlac.com",
      },
      {
        protocol: "https",
        hostname: "wurthlac.x-shops.com",
      },
    ],
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
