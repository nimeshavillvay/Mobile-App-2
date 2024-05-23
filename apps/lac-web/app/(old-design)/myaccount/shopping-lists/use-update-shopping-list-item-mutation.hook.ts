import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
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
    onMutate: () => {
      toast({ description: "Updating product from shopping list" });
    },
    onSuccess: () => {
      toast({
        description: "Product updated from shopping list",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update product from shopping list",
        variant: "destructive",
      });
    },
    onSettled: (productId, token) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "favourite-skus", token, [productId]],
      });
    },
  });
};

export default useUpdateShoppingListItemMutation;
