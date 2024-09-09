import { getSitemapAssets, isChangeFrequency } from "@/_lib/sitemap-helpers";
import { encode } from "html-entities";
import type { MetadataRoute } from "next";

export const generateSitemaps = async () => {
  const sitemapAssets = await getSitemapAssets(1);

  return Array.from({ length: sitemapAssets.pagination.totalPages }).map(
    (_, index) => ({
      id: index,
    }),
  );
};

const sitemap = async ({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> => {
  const sitemapAssets = await getSitemapAssets(id + 1);

  return sitemapAssets.data.map((sitemapAsset) => ({
    url: encode(`https://${sitemapAsset.url}`),
    changeFrequency: isChangeFrequency(sitemapAsset.changefreq)
      ? sitemapAsset.changefreq
      : undefined,
    priority: Number(sitemapAsset.priority),
    lastModified: new Date(),
  }));
};

export default sitemap;
