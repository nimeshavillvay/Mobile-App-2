import { useSuspenseQuery } from "@tanstack/react-query";
import { getRoles } from "~/apis/base/account/get-roles";
import type { ApiConfig } from "~/lib/types";

const useJobRoles = (config: ApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["job-roles", config],
    queryFn: () => getRoles(config),
    staleTime: Infinity,
  });
};

export default useJobRoles;
