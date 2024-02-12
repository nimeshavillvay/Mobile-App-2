import { api } from "@/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { checkAvailability } from "@/_lib/shared-apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();

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
      if (availability?.[0].status !== "inStock") {
        throw new Error("Product not in stock");
      }

      return api
        .post("pim/webservice/ecommerce/cart", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          body: JSON.stringify({
            "configurable-items": [{ code: sku, quantity, configuration: {} }],
          }),
        })
        .json<{ error_code: number; message: string; success: boolean }>();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useAddToCartMutation;
