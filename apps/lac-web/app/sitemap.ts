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
      changeFrequency: "daily",
    },
    {
      url: getFullUrl("/category/sitemap.xml"),
      changeFrequency: "daily",
    },
  ];

  const numberOfProductPages = getNumberOfPages(sitemapProducts);
  Array.from({ length: numberOfProductPages }).forEach((_, index) => {
    sitemap.push({
      url: getFullUrl(`/product/sitemap/${index}.xml`),
      changeFrequency: "daily",
    });
  });

  const numberOfAssetPages = getNumberOfPages(sitemapAssets);
  Array.from({ length: numberOfAssetPages }).forEach((_, index) => {
    sitemap.push({
      url: getFullUrl(`/assets/sitemap/${index}.xml`),
      changeFrequency: "daily",
    });
  });

  const numberOfImagePages = getNumberOfPages(sitemapImages);
  Array.from({ length: numberOfImagePages }).forEach((_, index) => {
    sitemap.push({
      url: getFullUrl(`/images/sitemap/${index}.xml`),
      changeFrequency: "daily",
    });
  });

  return sitemap;
};

export default sitemap;
