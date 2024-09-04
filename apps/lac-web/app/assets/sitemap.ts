import { xCartSearchApi } from "@/_lib/api";
import { VALID_CHANGE_FREQUENCIES } from "@/_lib/constants";
import { type MetadataRoute } from "next";
import { z } from "zod";

const assetsSitemapSchema = z.array(
  z.object({
    url: z.string(),
    type: z.string(),
    priority: z.string(),
    changefreq: z.string(),
  }),
);

type ChangeFrequency = (typeof VALID_CHANGE_FREQUENCIES)[number];

const validateChangeFrequency = (
  value: string,
): ChangeFrequency | undefined => {
  return VALID_CHANGE_FREQUENCIES.includes(value as ChangeFrequency)
    ? (value as ChangeFrequency)
    : undefined;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const assetsSiteMap = await getAssetsSiteMap();
  return assetsSiteMap.map((item) => ({
    changeFrequency: validateChangeFrequency(item.changefreq),
    priority: Number(item.priority),
    url: item.url,
  }));
};

export default sitemap;

const getAssetsSiteMap = async () => {
  const response = await xCartSearchApi
    .get("rest/sitemap/assets", {
      cache: "no-store",
      throwHttpErrors: false,
    })
    .json();
  return assetsSitemapSchema.parse(response);
};
