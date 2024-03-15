import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignedData, UpdateField } from "./types";

const useUpdateProfileMutation = () => {
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
        .put("am/update_your_contact", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            signed_data: signedData,
            update_fields: updateFields,
          },
        })
        .json<{ status: string }>(),
    onMutate: () => {
      toast({ description: "Updating your profile" });
    },
    onSuccess: () => {
      toast({
        description: "Your profile has been successfully updated.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update your profile",
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

export default useUpdateProfileMutation;
