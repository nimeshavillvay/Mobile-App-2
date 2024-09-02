import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";

const checkEmailSchema = z.union([
  z.object({
    status_code: z.literal("OK"),
  }),
  z.object({
    status_code: z.literal("FAILED"),
    message: z.literal("Email address already exists in the database."),
  }),
  z.object({
    status_code: z.literal("USER_ACTIVE"),
    message: z.literal("Email exists and is valid."),
  }),
]);

export const checkEmail = async (
  { baseUrl, apiKey }: ApiConfig,
  email: string,
) => {
  const response = await api
    .post("rest/register/check-email", {
      prefixUrl: baseUrl,
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      json: {
        email,
      },
      cache: "no-store",
      throwHttpErrors: false,
    })
    .json();

  return await checkEmailSchema.parseAsync(response);
};
