import { useSuspenseQuery } from "@tanstack/react-query";
import { getPasswordPolicy } from "~/apis/base/account/get-password-policy";
import type { ApiConfig } from "~/lib/types";

const useSuspensePasswordPolicy = (config: ApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["password-policy", config],
    queryFn: () => getPasswordPolicy(config),
    staleTime: Infinity,
  });
};

export default useSuspensePasswordPolicy;
