/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
