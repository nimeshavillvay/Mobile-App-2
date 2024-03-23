import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddUserDataMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      email,
      firstName,
      jobTitle,
      lastName,
      permission,
    }: {
      email: string;
      firstName: string;
      jobTitle: string;
      lastName: string;
      permission: string;
    }) =>
      api
        .post("am/admin/create_user", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            email: email,
            first_name: firstName,
            job_title: jobTitle,
            last_name: lastName,
            permission: permission,
          },
        })
        .json<unknown>(),
    onSuccess: () => {
      toast({
        description: "New user successfully added.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "New user creation failed.",
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

export default useAddUserDataMutation;
