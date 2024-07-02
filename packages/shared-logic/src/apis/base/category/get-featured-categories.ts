import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";

const featuredCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  shortcode: z.string(),
  item_count: z.string(),
  direct_item_count: z.string(),
  img: z.union([z.string(), z.null()]),
});

export const getFeaturedCategories = async ({ baseUrl, apiKey }: ApiConfig) => {
  const response = await api
    .get("rest/featuredcategories", {
      prefixUrl: baseUrl,
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  return await z.array(featuredCategorySchema).parseAsync(response);
};
