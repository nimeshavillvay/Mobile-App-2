import { useSuspenseQuery } from "@tanstack/react-query";
import "client-only";
import { getAccountList } from "~/apis/base/account/get-account-list";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseAccountList = (config: AuthenticatedApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["user", "account-list", config],
    queryFn: () => getAccountList(config),
  });
};

export default useSuspenseAccountList;
