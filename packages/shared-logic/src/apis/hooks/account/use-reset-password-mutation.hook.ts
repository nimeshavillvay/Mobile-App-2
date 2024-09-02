import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "~/apis/base/account/reset-password";
import type { ApiConfig } from "~/lib/types";

const useResetPasswordMutation = (config: ApiConfig) => {
  return useMutation({
    mutationFn: (email: string) => resetPassword(config, email),
  });
};

export default useResetPasswordMutation;
