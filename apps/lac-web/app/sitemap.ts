import {
  getFullUrl,
  getSitemapAssets,
  getSitemapImages,
  getSitemapProducts,
} from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [sitemapProducts, sitemapAssets, sitemapImages] = await Promise.all([
    getSitemapProducts(1),
    getSitemapAssets(1),
    getSitemapImages(1),
  ]);

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: getFullUrl("/base/sitemap.xml"),
      lastModified: new Date(),
    },
    {
      url: getFullUrl("/category/sitemap.xml"),
      lastModified: new Date(),
    },
  ];

  Array.from({ length: sitemapProducts.pagination.totalPages }).forEach(
    (_, index) => {
      sitemap.push({
        url: getFullUrl(`/product/sitemap/${index}.xml`),
        lastModified: new Date(),
      });
    },
  );

  Array.from({ length: sitemapAssets.pagination.totalPages }).forEach(
    (_, index) => {
      sitemap.push({
        url: getFullUrl(`/assets/sitemap/${index}.xml`),
        lastModified: new Date(),
      });
    },
  );

  Array.from({ length: sitemapImages.pagination.totalPages }).forEach(
    (_, index) => {
      sitemap.push({
        url: getFullUrl(`/images/sitemap/${index}.xml`),
        lastModified: new Date(),
      });
    },
  );

  return sitemap;
};

export default sitemap;
