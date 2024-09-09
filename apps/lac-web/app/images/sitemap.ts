import { getSitemapImages, isChangeFrequency } from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

export const generateSitemaps = async () => {
  const sitemapImages = await getSitemapImages(1);

  return Array.from({ length: sitemapImages.pagination.totalPages }).map(
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
  const sitemapImages = await getSitemapImages(id + 1);

  return sitemapImages.data.map((sitemapImage) => ({
    url: sitemapImage.image,
    changeFrequency: isChangeFrequency(sitemapImage.changefreq)
      ? sitemapImage.changefreq
      : undefined,
    priority: Number(sitemapImage.priority),
    images: [sitemapImage.image],
    lastModified: new Date(),
  }));
};

export default sitemap;
