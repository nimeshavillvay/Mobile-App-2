import { useSuspenseQuery } from "@tanstack/react-query";
import { getFeaturedCategories } from "~/apis/base/category/get-featured-categories";
import type { ApiConfig } from "~/lib/types";

const useSuspenseFeaturedCategories = (config: ApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["category", "featured", config],
    queryFn: () => getFeaturedCategories(config),
  });
};

export default useSuspenseFeaturedCategories;
