import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";

export const passwordPolicyResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  error_code: z.number(),
  data: z.object({
    passwordPolicies: z.array(
      z.object({
        code: z.enum(["MIN_CHAR_LEN", "MIN_NUMBER", "MIN_CHAR_Cha_LEN"]),
        value: z.string(),
        desc: z.string(),
      }),
    ),
  }),
});

export const getPasswordPolicy = async ({ baseUrl, apiKey }: ApiConfig) => {
  const response = await api
    .get("rest/passwordpolicy", {
      prefixUrl: baseUrl,
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  return await passwordPolicyResponseSchema.parseAsync(response);
};
