import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";
import { featuredCategorySchema } from "~/lib/zod-schema/category";

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
