import { xCartSearchApi } from "@/_lib/api";
import { type MetadataRoute } from "next";
import { z } from "zod";
import { SITEMAP_PAGE_SIZE, VALID_CHANGE_FREQUENCIES } from "./_lib/constants";

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

export const generateSitemaps = async () => {
  const searchParams = {
    page: 1,
    limit: SITEMAP_PAGE_SIZE,
  };
  const productSiteMap = await getProductSiteMap(searchParams);
  const arr = Array.from(
    { length: productSiteMap.pagination.totalPages },
    (_, index) => ({ id: index }),
  );
  console.log(">> pagination", productSiteMap.pagination);
  return arr;
};

type Page = {
  page: number;
  limit: number;
};

const sitemap = async ({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> => {
  console.log(">> id", id);
  const searchParams = {
    page: id,
    limit: 1000,
  };
  const productSiteMap = await getProductSiteMap(searchParams);

  console.log(">> productSiteMap", productSiteMap);
  return productSiteMap.data.map((item) => ({
    url: generateUrl(item.productid, item.slug),
    changeFrequency: validateChangeFrequency(item.changefreq),
    priority: Number(item.priority),
    image: item.image,
    category: item.category,
    categoryId: item.categoryid,
    productid: item.productid,
    product: item.product,
    slug: item.slug,
  }));
};

export default sitemap;

const getProductSiteMap = async (searchParams: Page) => {
  const response = await xCartSearchApi
    .get("rest/sitemap/product", {
      cache: "no-store",
      throwHttpErrors: false,
      searchParams,
    })
    .json();
  return productSitemapSchema.parse(response);
};

const generateUrl = (id: string, slug: string) => {
  return `${process.env.NEXT_PUBLIC_WURTH_LAC_BASE_URL}/product/${id}/${slug}`; // todo: update the base url
};
