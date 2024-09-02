import { useMutation } from "@tanstack/react-query";
import { addUser } from "~/apis/base/account/add-user";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useAddUserMutation = (config: AuthenticatedApiConfig) => {
  return useMutation({
    mutationFn: (user: Parameters<typeof addUser>[1]) => addUser(config, user),
  });
};

export default useAddUserMutation;
