import { xCartSearchApi } from "@/_lib/api";
import { SITEMAP_PAGE_SIZE, VALID_CHANGE_FREQUENCIES } from "@/_lib/constants";
import { type MetadataRoute } from "next";
import { z } from "zod";

const productSitemapSchema = z.object({
  pagination: z.object({
    totalItems: z.number(),
    currentPage: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  }),
  data: z.array(
    z.object({
      productid: z.string(),
      product: z.string(),
      priority: z.string(),
      changefreq: z.string(),
      categoryid: z.string(),
      category: z.string(),
      image: z.string(),
      slug: z.string(),
    }),
  ),
});
type ChangeFrequency = (typeof VALID_CHANGE_FREQUENCIES)[number];

const validateChangeFrequency = (
  value: string,
): ChangeFrequency | undefined => {
  return VALID_CHANGE_FREQUENCIES.includes(value as ChangeFrequency)
    ? (value as ChangeFrequency)
    : undefined;
};

export async function generateSitemaps() {
  const productSiteMap = await getProductSiteMap();
  const totalPages =
    productSiteMap.pagination.totalItems / SITEMAP_PAGE_SIZE + 1;
  return Array.from({ length: totalPages }, (_, index) => ({ id: index }));
}

const sitemap = async ({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> => {
  const generateUrl = (id: string, slug: string) => {
    return `${process.env.NEXT_PUBLIC_WURTH_LAC_BASE_URL}/category/${id}/${slug}`; // todo: update the base url
  };

  const productSiteMap = await getProductSiteMap();
  return productSiteMap.data.map((item) => ({
    url: generateUrl(item.categoryid, item.slug),
    changeFrequency: validateChangeFrequency(item.changefreq),
    priority: Number(item.priority),
    image: item.image,
    category: item.category,
    categoryId: item.categoryid,
  }));
};

export default sitemap;

const getProductSiteMap = async () => {
  const response = await xCartSearchApi
    .get("rest/sitemap/category", {
      cache: "no-store",
      throwHttpErrors: false,
    })
    .json();
  return productSitemapSchema.parse(response);
};
