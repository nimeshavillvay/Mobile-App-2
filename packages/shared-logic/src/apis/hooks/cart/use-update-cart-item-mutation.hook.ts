import { useMutation } from "@tanstack/react-query";
import { updateCartItem } from "~/apis/base/cart/update-cart-item";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useUpdateCartItemMutation = (config: AuthenticatedApiConfig) => {
  return useMutation({
    mutationFn: (products: Parameters<typeof updateCartItem>[1]) =>
      updateCartItem(config, products),
  });
};

export default useUpdateCartItemMutation;
