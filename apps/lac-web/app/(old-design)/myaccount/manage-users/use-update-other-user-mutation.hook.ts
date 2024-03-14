import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignedData, UpdateField } from "./types";

const useUpdateOtherUserMutation = () => {
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
        .put("am/admin/update_other_contact", {
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
      toast({ description: "Updating user" });
    },
    onSuccess: () => {
      toast({
        description: "User updated",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update the user",
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

export default useUpdateOtherUserMutation;
