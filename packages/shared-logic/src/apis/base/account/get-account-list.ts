import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { accountListSchema } from "~/lib/zod-schema/account";

export const getAccountList = async ({
  baseUrl,
  apiKey,
  token,
}: AuthenticatedApiConfig) => {
  const response = await api
    .get("rest/auth/account-list", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  return await accountListSchema.parseAsync(response);
};
