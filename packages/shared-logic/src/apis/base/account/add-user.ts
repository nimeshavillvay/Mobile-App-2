import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import type { Permission } from "~/lib/zod-schema/misc";

export const addUser = async (
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  {
    firstName,
    lastName,
    jobTitle,
    email,
    password,
    permission,
    resetPassword,
  }: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    password: string;
    permission: Permission;
    resetPassword: boolean;
  },
) => {
  const response = await api
    .post("rest/my-account/create-user", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      json: {
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        email,
        password,
        permission,
        change_password: resetPassword,
      },
      cache: "no-store",
    })
    .json();

  return z
    .object({
      status_code: z.enum(["OK"]),
      message: z.string(),
      user_id: z.number(),
    })
    .parseAsync(response);
};
