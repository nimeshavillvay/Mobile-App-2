import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateShoppingListItemMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

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
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shopping-list-items"],
      });
    },
  });
};

export default useUpdateShoppingListItemMutation;
