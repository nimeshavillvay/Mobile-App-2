import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCheckoutMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api
        .post("rest/checkout", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          orderids: [string];
        }>(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: () => {
      toast({
        title: "Failed to place order",
        description: "Please try again later",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Successfully placed order",
      });
      router.replace(`/confirmation/${data.orderids[0]}`);
    },
  });
};

export default useCheckoutMutation;
