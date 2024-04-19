import { api } from "@/_lib/api";
import { isErrorResponse } from "@/_lib/utils";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { EMAIL_COOKIE } from "../constants";
import useSignInCookies from "../use-sign-in-cookies.hook";

const useRegisterExistingUserMutation = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [, , deleteCookie] = useSignInCookies();

  return useMutation({
    mutationFn: async (data: {
      accountNo: string;
      documentId: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      const { status_code, type, id } = await api
        .post("rest/register/existing", {
          json: { ...data, role: "10" },
        })
        .json<{
          status_code: "OK";
          type: "ACCOUNT" | "USER";
          id: number;
        }>();

      return {
        statusCode: status_code,
        type,
        id,
      };
    },
    onSuccess: () => {
      deleteCookie(EMAIL_COOKIE);
      router.replace("/");
    },
    onError: async (error) => {
      if (error?.response?.status === 400) {
        const errorResponse = await error.response.json();

        if (isErrorResponse(errorResponse)) {
          toast({
            variant: "destructive",
            title: "Registration failed.",
            description: errorResponse.message,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed.",
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    },
  });
};

export default useRegisterExistingUserMutation;