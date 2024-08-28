import { z } from "zod";
import { api } from "~/lib/api";
import type { ApiConfig } from "~/lib/types";

const jobRolesSchema = z.object({
  roles: z.array(
    z.object({
      code: z.string(),
      description: z.string(),
    }),
  ),
});

export const getRoles = async (
  { baseUrl, apiKey }: ApiConfig,
  categoryId = 0,
) => {
  const response = await api
    .get("rest/get-roles", {
      prefixUrl: baseUrl,
      headers: {
        "X-AUTH-TOKEN": apiKey,
      },
      searchParams: {
        categoryid: categoryId,
      },
      cache: "no-store",
    })
    .json();

  console.log("> response: ", response);

  return await jobRolesSchema.parseAsync(response);
};
