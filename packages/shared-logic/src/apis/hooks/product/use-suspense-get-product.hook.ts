import { useSuspenseQuery } from "@tanstack/react-query";
import { getProduct } from "~/apis/base/product/get-product";
import type { ApiConfig } from "~/lib/types";

const useSuspenseGetProduct = (config: ApiConfig, productId: string) => {
  return useSuspenseQuery({
    queryKey: ["product-landing", productId, config],
    queryFn: () => getProduct(config, productId),
  });
};

export default useSuspenseGetProduct;
