import { BASE_URL } from "@/_lib/constants";
import { getSitemapData } from "@/_lib/shared-server-apis";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapData = await getSitemapData();

  return sitemapData.siteMapCategories.map((category) => ({
    url: `${BASE_URL}/category/${category.catId}/${category.subCatName}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));
};

export default sitemap;
