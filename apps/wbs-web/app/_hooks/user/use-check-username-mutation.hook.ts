import { api } from "@/_lib/api";
import { useMutation } from "@tanstack/react-query";

const useCheckUsernameMutation = () => {
  return useMutation({
    mutationFn: async (userName: string) => {
      const response = await api
        .post("rest/register/check-username", {
          json: { userName },
        })
        .json<{ status_code: string; message: string }>();

      return {
        statusCode: response.status_code,
        message: response.message,
      };
    },
  });
};

export default useCheckUsernameMutation;
