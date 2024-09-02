import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";

const resetPasswordSchema = z.object({
  data: z.object({
    status: z.literal("ACTIVE"),
  }),
  message: z.string().nullable(),
  isSuccess: z.boolean(),
});

export const resetPassword = async (
  { baseUrl, apiKey }: ApiConfig,
  email: string,
) => {
  const response = await api
    .post("rest/register/password-reset", {
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

  return await resetPasswordSchema.parseAsync(response);
};
