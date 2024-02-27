import { BASE_URL, SITEMAP_SIZE } from "@/old/_lib/constants";
import { getSitemapData } from "@/old/_lib/shared-server-apis";
import { splitArrayIntoChunks } from "@/old/_utils/helpers";
import type { MetadataRoute } from "next";

const STATIC_PATHS = [
  "",
  "/catalog-main",
  "/about-us",
  "/careers",
  "/compliance",
  "/faqs",
  "/branch-finder",
  "/terms-of-sale",
  "/government",
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const sitemapData = await getSitemapData();
  const productLists = splitArrayIntoChunks(
    sitemapData.siteMapProducts,
    SITEMAP_SIZE,
  );

  entries.push({
    url: `${BASE_URL}/category/sitemap.xml`,
  });
  productLists.forEach((_, index) => {
    entries.push({
      url: `${BASE_URL}/product-item/sitemap/${index}.xml`,
    });
  });

  return entries;
};

export default sitemap;
