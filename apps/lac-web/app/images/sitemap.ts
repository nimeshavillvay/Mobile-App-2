import {
  getNumberOfPages,
  getSitemapImages,
  paginate,
} from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

export const generateSitemaps = async () => {
  const sitemapImages = await getSitemapImages();
  const numberOfImagePages = getNumberOfPages(sitemapImages);

  return Array.from({ length: numberOfImagePages }).map((_, index) => ({
    id: index,
  }));
};

const sitemap = async ({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> => {
  const sitemapImages = await getSitemapImages();
  const page = paginate(sitemapImages, id + 1);

  return page.map((sitemapImage) => ({
    url: sitemapImage.image,
    changeFrequency: sitemapImage.changefreq,
    priority: Number(sitemapImage.priority),
    images: [sitemapImage.image],
    lastModified: new Date(),
  }));
};

export default sitemap;
