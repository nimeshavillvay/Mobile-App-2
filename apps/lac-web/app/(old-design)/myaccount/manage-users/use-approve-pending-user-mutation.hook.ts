import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignedData, UpdateField } from "./types";

const useApprovePendingUserMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      signedData,
      updateFields,
    }: {
      signedData: SignedData;
      updateFields: UpdateField[];
    }) =>
      api
        .put("am/approve_contacts", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            signed_data: signedData,
            update_fields: updateFields,
          },
        })
        .json<unknown>(),
    onMutate: () => {
      toast({ description: "Approving user request" });
    },
    onSuccess: () => {
      toast({
        description:
          "User has been approved and added! See under Current Users for details of the added user.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to approve the user request",
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

export default useApprovePendingUserMutation;
