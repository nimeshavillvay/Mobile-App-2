import { api } from "@/_lib/api";
import type { CartItemConfiguration } from "@/_lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCartItemMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      products: {
        quantity?: number; // The optional feature has been made conditional as it's unnecessary when closing the confirmation dialog popup for add to cart.
        cartItemId: number;
        config: CartItemConfiguration;
      }[],
    ) => {
      return await api
        .put("rest/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          json: {
            cartitembatchconfiguration: products.map((product) => ({
              quantity: product.quantity,
              cartid: product.cartItemId,
              cartitemconfiguration: product.config,
            })),
          },
        })
        .json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useUpdateCartItemMutation;
