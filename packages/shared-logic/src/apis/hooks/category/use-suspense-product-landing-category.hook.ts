import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductLandingCategory } from "~/apis/base/category/get-product-landing-category";
import type { ApiConfig } from "~/lib/types";

const useSuspenseProductLandingCategory = (config: ApiConfig, id: string) => {
  return useSuspenseQuery({
    queryKey: ["category", id, config],
    queryFn: () => getProductLandingCategory(config, id),
  });
};

export default useSuspenseProductLandingCategory;
