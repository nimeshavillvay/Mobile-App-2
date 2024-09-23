import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteShippingAddressMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (shipToId: string) =>
      api
        .delete("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            "ship-to": shipToId,
          },
        })
        .json(),
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
