import "server-only";

import "server-only";
import type {
  Country,
  PasswordPolicies,
} from "../../(auth)/register/_components/types";
import { api } from "../api";
import { DEFAULT_REVALIDATE } from "../constants";

export const getPasswordPolicies = async (): Promise<PasswordPolicies> => {
  const response = await api
    .get("rest/passwordpolicy", { next: { revalidate: DEFAULT_REVALIDATE } })
    .json<{
      data: { passwordPolicies: { code: string; value: string }[] };
    }>();

  const findPolicyValue = (code: string, defaultValue: string) =>
    response.data.passwordPolicies.find((policy) => policy.code === code)
      ?.value ?? defaultValue;

  return {
    minimumLength: parseInt(findPolicyValue("MIN_CHAR_LEN", "1")) || 1,
    minimumNumbers: parseInt(findPolicyValue("MIN_NUMBER", "1")) || 0,
    minimumAlphabets: parseInt(findPolicyValue("MIN_CHAR_Cha_LEN", "1")) || 0,
  };
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
