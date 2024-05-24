import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { isErrorResponse } from "@/_lib/utils";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useRegisterExistingUserMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

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
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
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
      queryClient.invalidateQueries();
      router.replace("/");
    },
    onError: async (error) => {
      if (error?.response?.status === 400) {
        const errorResponse = await error.response.clone().json();

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
