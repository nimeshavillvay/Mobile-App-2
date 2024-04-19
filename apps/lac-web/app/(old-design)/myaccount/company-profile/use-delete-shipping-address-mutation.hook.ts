import { api } from "@/_lib/api";
import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteShippingAddressMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (shipToId: any) =>
      api
        .delete("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            "ship-to": shipToId,
          },
        })
        .json<unknown>(),
    onMutate: () => {
      toast({ description: "Deleting shipping address" });
    },
    onSuccess: () => {
      toast({
        description: "Shipping address deleted",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to delete the shipping address",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shipping-addresses"],
      });
    },
  });
};

export default useDeleteShippingAddressMutation;
