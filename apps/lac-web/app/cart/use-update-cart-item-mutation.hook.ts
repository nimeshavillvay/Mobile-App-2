import { api } from "@/_lib/api";
import type { CartItemConfiguration } from "@/_lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      products: {
        quantity: number;
        productId: number;
        config: CartItemConfiguration;
      }[],
    ) => {
      return await api
        .put("rest/cart", {
          json: {
            cartitembatchconfiguration: products.map((product) => ({
              quantity: product.quantity,
              cartid: product.productId,
              cartitemconfiguration: product.config,
            })),
          },
        })
        .json<unknown>();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useUpdateCartItemMutation;
