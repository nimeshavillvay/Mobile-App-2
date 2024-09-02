import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "~/apis/base/account/update-profile";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useUpdateProfileMutation = (config: AuthenticatedApiConfig) => {
  return useMutation({
    mutationFn: (profile: Parameters<typeof updateProfile>[1]) =>
      updateProfile(config, profile),
  });
};

export default useUpdateProfileMutation;
