import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import type { Permission } from "~/lib/zod-schema/misc";

export const updateProfile = async (
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  {
    userId,
    firstName,
    lastName,
    jobTitle,
    email,
    password,
    permission,
    status,
  }: {
    userId: number;
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    email?: string;
    password?: string;
    permission?: Permission;
    status?: string;
  },
) => {
  const response = await api
    .post("rest/my-account/update_profile", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      json: {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        email,
        password,
        permission,
        status,
      },
      cache: "no-store",
    })
    .json();

  return z
    .object({
      status_code: z.enum(["OK"]),
      message: z.string(),
    })
    .parseAsync(response);
};
