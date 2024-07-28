import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

export const getSession = async ({
  baseUrl,
  apiKey,
  token,
}: Omit<AuthenticatedApiConfig, "token"> & {
  token?: string;
}) => {
  return await api.get("rest/session", {
    prefixUrl: baseUrl,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "X-AUTH-TOKEN": apiKey,
    },
    cache: "no-store",
  });
};
