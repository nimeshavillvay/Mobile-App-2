import { xCartSearchApi } from "@/_lib/api";
import { SITEMAP_PAGE_SIZE, VALID_CHANGE_FREQUENCIES } from "@/_lib/constants";
import { type MetadataRoute } from "next";
import { z } from "zod";

const imageSitemapSchema = z.object({
  pagination: z.object({
    totalItems: z.number(),
    currentPage: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  }),
  data: z.array(
    z.object({
      productid: z.string(),
      priority: z.string(),
      changefreq: z.string(),
      image: z.string(),
      type: z.string(),
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
  const imageSiteMap = await getImageSiteMap(searchParams);
  const arr = Array.from(
    { length: imageSiteMap.pagination.totalPages },
    (_, index) => ({ id: index }),
  );
  console.log(">> pagination", imageSiteMap.pagination);
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
  const imageSiteMap = await getImageSiteMap(searchParams);

  return imageSiteMap.data.map((item) => ({
    changeFrequency: validateChangeFrequency(item.changefreq),
    priority: Number(item.priority),
    url: item.image,
    productid: item.productid,
    type: item.type,
  }));
};

export default sitemap;

const getImageSiteMap = async (searchParams: Page) => {
  const response = await xCartSearchApi
    .get("rest/sitemap/image", {
      cache: "no-store",
      throwHttpErrors: false,
      searchParams,
    })
    .json();
  return imageSitemapSchema.parse(response);
};
