import { useToast } from "@/_components/ui/use-toast";
import { api } from "@/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useAddToFavoritesMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (product: {
      brandId: number;
      brandName: string;
      categoryId: number;
      categoryName: string;
      sku: string;
      subCategoryId: number;
      subCategoryName: string;
    }) =>
      api
        .post("am/my-favourite/add", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: product,
        })
        .json<{ data: unknown; message: string; isSuccess: boolean }>(),
    onMutate: () => {
      toast({
        description: "Adding item to favorites",
      });
    },
    onSuccess: () => {
      toast({
        description: "Added item to favorites",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to add item to favorites",
        variant: "destructive",
      });
    },
    onSettled: (data, error, { sku }) => {
      queryClient.invalidateQueries({
        queryKey: ["user", "favorite", "sku", sku],
        exact: false,
      });
    },
  });
};

export default useAddToFavoritesMutation;
