import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveShoppingListItemMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      listId,
      productId,
    }: {
      listId: string;
      productId: string;
    }) =>
      api
        .delete("rest/my-favourite/list-items/" + listId, {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            productid: productId,
          },
        })
        .json(),
    onMutate: () => {
      toast({ description: "Removing product from shopping list" });
    },
    onSuccess: () => {
      toast({
        description: "Product removed from shopping list",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to remove product from shopping list",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shopping-list-items"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shopping-list"],
      });
    },
  });
};

export default useRemoveShoppingListItemMutation;
