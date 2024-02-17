import { MetadataRoute } from "next";
import { BASE_URL } from "./_lib/constants";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/myaccount/", "/shopping-cart/"],
    },
    host: BASE_URL,
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
};

export default robots;
