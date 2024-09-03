import { xCartSearchApi } from "@/_lib/api";
import { type MetadataRoute } from "next";
import { z } from "zod";

const categorySitemapSchema = z.array(
  z.object({
    category: z.string(),
    categoryid: z.string(),
    priority: z.string(),
    changefreq: z.string(),
    image: z.string(),
    slug: z.string(),
  }),
);

const VALID_CHANGE_FREQUENCIES = [
  "never",
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
] as const;

type ChangeFrequency = (typeof VALID_CHANGE_FREQUENCIES)[number];

const validateChangeFrequency = (
  value: string,
): ChangeFrequency | undefined => {
  return VALID_CHANGE_FREQUENCIES.includes(value as ChangeFrequency)
    ? (value as ChangeFrequency)
    : undefined;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const generateUrl = (id: string, slug: string) => {
    return `${process.env.NEXT_PUBLIC_WURTH_LAC_BASE_URL}/category/${id}/${slug}`; // todo: update the base url
  };
  const categorySiteMap = await getCategorySiteMap();
  // console.log(">> category site map", categorySiteMap);
  return categorySiteMap.map((item) => ({
    url: generateUrl(item.categoryid, item.slug),
    // lastModified: "new Date()",
    changeFrequency: validateChangeFrequency(item.changefreq),
    priority: Number(item.priority),
    image: item.image,
    category: item.category,
    categoryId: item.categoryid,
  }));
};

export default sitemap;

const getCategorySiteMap = async () => {
  const response = await xCartSearchApi
    .get("rest/sitemap/category", {
      cache: "no-store",
      throwHttpErrors: false,
    })
    .json();
  return categorySitemapSchema.parse(response);
};
