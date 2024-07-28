import { api } from "~/lib/api";
import type { SearchApiConfig } from "~/lib/types";
import { searchSchema } from "~/lib/zod-schema/search";

export const getBarcodeSearch = async (
  { baseUrl }: SearchApiConfig,
  query: string,
) => {
  const response = await api
    .get("barcode", {
      prefixUrl: baseUrl,
      searchParams: {
        query,
      },
    })
    .json();

  return await searchSchema.parseAsync(response);
};
