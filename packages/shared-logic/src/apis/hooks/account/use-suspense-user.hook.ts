import { useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "~/apis/base/account/get-user";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseUser = (config: AuthenticatedApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["user", "details", config],
    queryFn: () => getUser(config),
  });
};

export default useSuspenseUser;
