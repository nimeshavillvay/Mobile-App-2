import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";
import { categoryListSchema } from "~/lib/zod-schema/category";

export const getCategoryList = async (
  { baseUrl, apiKey }: ApiConfig,
  level: string,
) => {
  const response = await api
    .get("rest/getcategorylist/0", {
      prefixUrl: baseUrl,
      searchParams: new URLSearchParams({
        level,
      }),
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  return await z.array(categoryListSchema).parseAsync(response);
};
