import { BASE_URL } from "@/_lib/constants";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/my-account/", "/shopping-cart/"],
    },
    host: BASE_URL,
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
};

export default robots;
