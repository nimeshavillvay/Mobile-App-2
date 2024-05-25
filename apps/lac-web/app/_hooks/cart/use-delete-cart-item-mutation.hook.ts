import { api } from "@/_lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCartItemMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ products }: { products: { cartid: number }[] }) => {
      return await api
        .delete("rest/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          json: { products },
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

export default useDeleteCartItemMutation;
