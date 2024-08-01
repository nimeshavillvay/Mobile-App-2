import { api } from "~/lib/api";
import type { SearchApiConfig } from "~/lib/types";
import { multisearchResultSchema } from "~/lib/zod-schema/multisearch";

export const getMultisearchResults = async (
  { baseUrl }: SearchApiConfig,
  query: string,
) => {
  const response = await api
    .get("multisearch", {
      prefixUrl: baseUrl,
      searchParams: new URLSearchParams({
        query,
      }),
      cache: "no-store",
    })
    .json();

  return await multisearchResultSchema.parseAsync(response);
};
