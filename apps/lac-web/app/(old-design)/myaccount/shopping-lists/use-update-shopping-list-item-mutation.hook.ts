import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateShoppingListItemMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();
  const token = cookies[SESSION_TOKEN_COOKIE];

  return useMutation({
    mutationFn: ({
      listIds,
      productId,
    }: {
      listIds: number[];
      productId: number;
    }) =>
      api
        .put("rest/my-favourite/list-items/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            productid: productId,
            list_ids: listIds,
          },
        })
        .json(),
    onSuccess: () => {
      toast({
        description: "Product updated from shopping list",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update product from shopping list",
        variant: "destructive",
      });
    },
    onSettled: (data, error, variables) => {
      const productIdsAsString = [variables.productId].join("-");

      queryClient.invalidateQueries({
        queryKey: ["user", `favorite-skus-${productIdsAsString}`],
      });
    },
  });
};

export default useUpdateShoppingListItemMutation;
