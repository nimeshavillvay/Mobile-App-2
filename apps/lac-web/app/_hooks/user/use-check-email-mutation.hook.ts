import { api } from "@/_lib/api";
import { useMutation } from "@tanstack/react-query";

const useCheckEmailMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await api
        .post("rest/register/check-email", {
          json: { email },
        })
        .json<{ status_code: "OK" }>();

      return {
        statusCode: response.status_code,
      };
    },
  });
};

export default useCheckEmailMutation;
