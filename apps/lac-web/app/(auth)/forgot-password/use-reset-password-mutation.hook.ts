import { api } from "@/_lib/api";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation } from "@tanstack/react-query";

const useResetPasswordMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (email: string) =>
      api
        .post("rest/register/password-reset", {
          json: {
            email,
          },
        })
        .json<{
          data: {
            status: string;
          };
          message: null;
          isSuccess: boolean;
        }>(),
    onSuccess: () => {
      toast({
        title: "Check your inbox",
        description: "An email to reset your password has been sent",
      });
    },
  });
};

export default useResetPasswordMutation;
