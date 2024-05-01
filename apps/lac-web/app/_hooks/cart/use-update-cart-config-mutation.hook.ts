import { api } from "@/_lib/api";
import type { CartConfiguration } from "@/_lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCartConfigMutation = <
  T extends Partial<Required<CartConfiguration>>,
>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: T) => {
      return await api
        .patch("rest/cart-config", {
          json: config,
        })
        .json<{
          configuration: CartConfiguration;
          error: Partial<Record<keyof T, string>>;
        }>();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useUpdateCartConfigMutation;
