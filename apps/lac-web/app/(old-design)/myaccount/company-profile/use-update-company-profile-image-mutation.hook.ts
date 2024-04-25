import { api } from "@/_lib/api";
import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCompanyProfileImageMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (profileImageFormData: FormData) =>
      api.post("rest/osrdetails", {
        headers: {
          authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
        },
        body: profileImageFormData,
      }),
    onMutate: () => {
      toast({ description: "Updating billing address" });
    },
    onSuccess: () => {
      toast({
        description: "Billing address updated",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update the billing address",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "company-profile"],
      });
    },
  });
};

export default useUpdateCompanyProfileImageMutation;
