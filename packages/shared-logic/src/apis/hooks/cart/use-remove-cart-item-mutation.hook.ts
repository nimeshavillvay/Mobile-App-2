import { useMutation } from "@tanstack/react-query";
import { removeCartItem } from "~/apis/base/cart/remove-cart-item";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useRemoveCartItemMutation = (config: AuthenticatedApiConfig) => {
  return useMutation({
    mutationFn: (cardIds: number[]) => removeCartItem(config, cardIds),
  });
};

export default useRemoveCartItemMutation;
