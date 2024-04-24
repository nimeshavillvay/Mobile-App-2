import { api } from "@/_lib/api";
import type { CartItemConfiguration } from "@/_lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quantity,
      productId,
      config,
    }: {
      quantity: number;
      productId: number;
      config: CartItemConfiguration;
    }) => {
      return await api
        .put("rest/cart", {
          json: {
            cartitembatchconfiguration: [
              {
                quantity,
                cartid: productId,
                cartitemconfiguration: config,
              },
            ],
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
