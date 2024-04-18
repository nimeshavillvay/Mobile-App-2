import { api } from "@/_lib/api";
import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddUserDataMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      firstName,
      lastName,
      jobTitle,
      email,
      password,
      permission,
    }: {
      firstName: string;
      lastName: string;
      jobTitle: string;
      email: string;
      password: string;
      permission: string;
    }) =>
      api
        .post("rest/my-account/create-user", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            first_name: firstName,
            last_name: lastName,
            job_title: jobTitle,
            email,
            password,
            permission,
          },
        })
        .json<{ status_code: string; message: string; user_id: number }>(),
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
