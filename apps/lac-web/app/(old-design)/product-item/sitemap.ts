import { BASE_URL, SITEMAP_SIZE } from "@/old/_lib/constants";
import { getSitemapData } from "@/old/_lib/shared-server-apis";
import { splitArrayIntoChunks } from "@/old/_utils/helpers";
import type { MetadataRoute } from "next";

export const generateSitemaps = async () => {
  const sitemapData = await getSitemapData();
  const productLists = splitArrayIntoChunks(
    sitemapData.siteMapProducts,
    SITEMAP_SIZE,
  );

  return productLists.map((_, index) => ({
    id: index,
  }));
};

const sitemap = async ({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> => {
  const sitemapData = await getSitemapData();
  const productLists = splitArrayIntoChunks(
    sitemapData.siteMapProducts,
    SITEMAP_SIZE,
  );
  const productList = productLists[id];

  if (!productList) {
    return [];
  }

  return productList.map((product) => ({
    url: `${BASE_URL}/product-item/${product.groupId}/${product.sku}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));
};

export default sitemap;
