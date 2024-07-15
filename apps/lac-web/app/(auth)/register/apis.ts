import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import "server-only";
import type { Country, Industry } from "./types";

export const getIndustries = async () => {
  return await api
    .get("rest/industries", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Industry[]>();
};

export const getCountries = async () => {
  return await api
    .get("rest/register/countries", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Country[]>();
};
