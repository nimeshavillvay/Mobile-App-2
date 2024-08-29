import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

export const deleteUser = async (
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  userId: number,
) => {
  const response = await api
    .delete("rest/my-account/delete-user", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      json: {
        user_id: userId,
      },
      cache: "no-store",
    })
    .json();

  return await z
    .object({
      status_code: z.enum(["OK"]),
      message: z.string(),
    })
    .parseAsync(response);
};
