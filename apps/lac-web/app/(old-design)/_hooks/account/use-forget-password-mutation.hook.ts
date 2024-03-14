import { useToast } from "@/old/_components/ui/use-toast";
import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const PASSWORD_RESET_ACTIVE_MSG =
  "Password reset email has been successfully sent to user.";
const PASSWORD_RESET_INACTIVE_MSG =
  "This User is currently flagged as inactive in the system. please contact web support at websupport@wurthlac.com, or call 800-422-4389 x1014.";

type Status = "PENDING" | "ACTIVE" | "DEACTIVE" | "INACTIVE" | "DISABLED";

type ForgetPasswordResponse = {
  data: { status: Status };
  message: string | null;
  isSuccess: boolean;
};

const useForgetPasswordMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  const handleToast = (status: Status) => {
    if (status === "ACTIVE") {
      toast({
        description: PASSWORD_RESET_ACTIVE_MSG,
        variant: "success",
      });
    }
    if (status === "INACTIVE") {
      toast({
        description: PASSWORD_RESET_INACTIVE_MSG,
        variant: "success",
      });
    }
  };

  return useMutation({
    mutationFn: ({ email, key }: { email: string; key: string }) => {
      const data = new FormData();
      data.append("email", email);
      data.append("key", key);

      return api
        .post("am/auth/password-reset", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          body: data,
        })
        .json<ForgetPasswordResponse>();
    },
    onMutate: () => {
      toast({ description: "Resetting user password" });
    },
    onSuccess: (data) => {
      if (data?.data?.status) {
        handleToast(data?.data?.status);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "manage-users"],
      });
    },
  });
};

export default useForgetPasswordMutation;
