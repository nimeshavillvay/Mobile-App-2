import { api } from "@/_lib/api";
import { toast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginAsCustomerMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      return await api
        .post("rest/auth/login-customer", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            user_id: userId,
          },
        })
        .json<{
          status_code: string;
          user_id: number;
          sales_rep_id: string;
        }>();
    },
    onSuccess: () => {
      toast({
        description: "Successfully login as customer",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        description: "Failed to login as customer",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "login-status"],
      });
    },
  });
};

export default useLoginAsCustomerMutation;
