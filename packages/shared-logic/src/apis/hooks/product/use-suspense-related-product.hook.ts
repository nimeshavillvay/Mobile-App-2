import { useSuspenseQuery } from "@tanstack/react-query";
import type { ApiConfig } from "~/lib/types";

import { getRelatedProduct } from "~/apis/base/product/get-related-products";

const useSuspenseRelatedProduct = (config: ApiConfig, productId: string) => {
  return useSuspenseQuery({
    queryKey: ["related-product", productId, config],
    queryFn: () => getRelatedProduct(config, productId),
  });
};

export default useSuspenseRelatedProduct;
