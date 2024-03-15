import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignedData } from "./types";

const useDeletePendingUserMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: SignedData) =>
      api
        .delete("am/delete_approve_contacts", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: data,
        })
        .json<unknown>(),
    onMutate: () => {
      toast({ description: "Deleting user from this account" });
    },
    onSuccess: () => {
      toast({
        description: "User deleted from this account",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to delete the user from this account",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "manage-users"],
      });
    },
  });
};

export default useDeletePendingUserMutation;
