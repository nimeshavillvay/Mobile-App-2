import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";
import { bannersResponseSchema } from "~/lib/zod-schema/banner";

export const getBanners = async (
  { baseUrl, apiKey }: ApiConfig,
  categoryId = 0,
) => {
  const response = await api
    .get("rest/banners", {
      prefixUrl: baseUrl,
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      searchParams: {
        categoryid: categoryId,
      },
      cache: "no-store",
    })
    .json();

  return await bannersResponseSchema.parseAsync(response);
};
