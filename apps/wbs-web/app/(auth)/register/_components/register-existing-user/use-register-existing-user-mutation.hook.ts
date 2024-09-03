import { revalidateSiteLayout } from "@/_actions/revalidate";
import { api } from "@/_lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRegisterExistingUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      accountNo: string;
      documentId: string;
      firstName: string;
      lastName: string;
      email: string;
      userName: string;
      password: string;
      phoneNumber: string;
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
      queryClient.invalidateQueries();
      revalidateSiteLayout("/register/success");
    },
  });
};

export default useRegisterExistingUserMutation;
