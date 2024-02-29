import { useToast } from "@/old/_components/ui/use-toast";
import { api } from "@/old/_lib/api";
import {
  ACCOUNT_TOKEN_COOKIE,
  AVAILABILITY_STATUSES,
} from "@/old/_lib/constants";
import { checkAvailability } from "@/old/_lib/shared-apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      sku,
      quantity,
    }: {
      sku: string;
      quantity: number;
    }) => {
      const availability = await checkAvailability(
        cookies[ACCOUNT_TOKEN_COOKIE],
        sku,
        quantity,
      );

      // If not in stock
      if (
        !!availability?.[0] &&
        availability?.[0].status !== AVAILABILITY_STATUSES.IN_STOCK
      ) {
        throw new Error("Product not in stock");
      }

      return api
        .post("pim/webservice/ecommerce/cart", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            "configurable-items": [{ code: sku, quantity, configuration: {} }],
          },
        })
        .json<{ error_code: number; message: string; success: boolean }>();
    },
    onMutate: () => {
      toast({
        description: "Adding item to cart",
      });
    },
    onSuccess: () => {
      toast({
        description: "Added item to cart",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useAddToCartMutation;
