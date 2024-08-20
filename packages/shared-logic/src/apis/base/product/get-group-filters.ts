import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";
import { groupFilterSchema } from "~/lib/zod-schema/group-filter";

export const getGroupFilters = async (
  { baseUrl, apiKey }: ApiConfig,
  productId: number,
) => {
  const response = await api
    .get(`rest/groupfilters/${productId}`, {
      prefixUrl: baseUrl,
      searchParams: new URLSearchParams({
        productid: productId.toString(),
      }),
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  return await z.array(groupFilterSchema).parseAsync(response);
};
