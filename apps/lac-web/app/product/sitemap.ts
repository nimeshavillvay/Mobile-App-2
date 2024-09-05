import {
  getFullUrl,
  getSitemapProducts,
  isChangeFrequency,
} from "@/_lib/sitemap-helpers";
import type { MetadataRoute } from "next";

export const generateSitemaps = async () => {
  const sitemapProducts = await getSitemapProducts(1);

  return Array.from({ length: sitemapProducts.pagination.totalPages }).map(
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
  const sitemapProducts = await getSitemapProducts(id + 1);

  return sitemapProducts.data.map((sitemapProduct) => ({
    url: getFullUrl(
      `/product/${sitemapProduct.productid}/${sitemapProduct.slug}`,
    ),
    changeFrequency: isChangeFrequency(sitemapProduct.changefreq)
      ? sitemapProduct.changefreq
      : undefined,
    priority: Number(sitemapProduct.priority),
    images: [sitemapProduct.image],
    lastModified: new Date(),
  }));
};

export default sitemap;
