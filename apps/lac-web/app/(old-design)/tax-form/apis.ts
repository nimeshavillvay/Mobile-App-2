import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE, SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import type { TaxFormItems } from "./types";

export const getTaxFormDetails = async () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  return api
    .get("rest/docs/tax-forms", {
      headers: {
        Authorization: `Bearer ${tokenCookie?.value}`,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<TaxFormItems>();
};
