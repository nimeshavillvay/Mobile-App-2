import { unstable_cache as cache } from "next/cache";
import "server-only";
import { getFeaturedCategories as getFeaturedCategoriesBase } from "~/apis/base/category/get-featured-categories";
import { DEFAULT_REVALIDATE } from "~/lib/constants";
import type { ApiConfig } from "~/lib/types";

const getFeaturedCategories = cache(
  async (params: ApiConfig) => {
    return await getFeaturedCategoriesBase(params);
  },
  ["featured-categories"],
  {
    revalidate: DEFAULT_REVALIDATE,
  },
);

export default getFeaturedCategories;
