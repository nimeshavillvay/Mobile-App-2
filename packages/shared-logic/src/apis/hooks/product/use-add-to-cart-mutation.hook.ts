import { useMutation } from "@tanstack/react-query";
import { addToCart } from "~/apis/base/product/add-to-cart";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useAddToCartMutation = (config: AuthenticatedApiConfig) => {
  return useMutation({
    mutationFn: (product: Parameters<typeof addToCart>[1]) =>
      addToCart(config, product),
  });
};

export default useAddToCartMutation;
