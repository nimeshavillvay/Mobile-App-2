import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "~/apis/base/account/delete-user";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useDeleteUserMutation = (config: AuthenticatedApiConfig) => {
  return useMutation({
    mutationFn: (userId: number) => deleteUser(config, userId),
  });
};

export default useDeleteUserMutation;
