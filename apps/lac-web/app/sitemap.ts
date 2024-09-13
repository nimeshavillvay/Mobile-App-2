import {
  getFullUrl,
  getNumberOfPages,
  getSitemapAssets,
  getSitemapImages,
  getSitemapProducts,
} from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [sitemapProducts, sitemapAssets, sitemapImages] = await Promise.all([
    getSitemapProducts(),
    getSitemapAssets(),
    getSitemapImages(),
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

  const numberOfProductPages = getNumberOfPages(sitemapProducts);
  Array.from({ length: numberOfProductPages }).forEach((_, index) => {
    sitemap.push({
      url: getFullUrl(`/product/sitemap/${index}.xml`),
      lastModified: new Date(),
    });
  });

  const numberOfAssetPages = getNumberOfPages(sitemapAssets);
  Array.from({ length: numberOfAssetPages }).forEach((_, index) => {
    sitemap.push({
      url: getFullUrl(`/assets/sitemap/${index}.xml`),
      lastModified: new Date(),
    });
  });

  const numberOfImagePages = getNumberOfPages(sitemapImages);
  Array.from({ length: numberOfImagePages }).forEach((_, index) => {
    sitemap.push({
      url: getFullUrl(`/images/sitemap/${index}.xml`),
      lastModified: new Date(),
    });
  });

  return sitemap;
};

export default sitemap;
