import {
  getFullUrl,
  getSitemapCategories,
  isChangeFrequency,
} from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapCategories = await getSitemapCategories();

  return sitemapCategories.map((sitemapCategory) => ({
    url: getFullUrl(
      `/category/${sitemapCategory.categoryid}/${sitemapCategory.slug}`,
    ),
    changeFrequency: isChangeFrequency(sitemapCategory.changefreq)
      ? sitemapCategory.changefreq
      : undefined,
    priority: Number(sitemapCategory.priority),
    images: [sitemapCategory.image],
    lastModified: new Date(),
  }));
};

export default sitemap;
