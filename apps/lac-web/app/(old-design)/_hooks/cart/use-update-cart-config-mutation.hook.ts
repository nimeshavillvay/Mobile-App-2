import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useVerifyTokenMutation from "../account/use-verify-token-mutation.hook";
import useCookies from "../storage/use-cookies.hook";

const useUpdateCartConfigMutation = () => {
  const queryClient = useQueryClient();
  const verifyTokenMutation = useVerifyTokenMutation();
  const [cookies] = useCookies();

  return useMutation({
    mutationFn: async (params: {
      configuration: { jobName?: string; po?: string };
      step: "cart_meta";
    }) => {
      await verifyTokenMutation.mutateAsync();

      return await api
        .patch("pim/webservice/ecommerce/cart-config", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: params,
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

export default useUpdateCartConfigMutation;
