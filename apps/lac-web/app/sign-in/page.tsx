import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import type { Metadata } from "next";
import SignIn from "./sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const passwordPolicy = await api
    .get("rest/passwordpolicy", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<{
      success: boolean;
      message: string;
      error_code: number;
      data: {
        passwordPolicies: {
          code: string;
          value: string;
          desc: string;
        }[];
      };
    }>();

  const minimumLength =
    passwordPolicy.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_CHAR_LEN",
    )?.value ?? "1";
  const minimumNumbers =
    passwordPolicy.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_NUMBER",
    )?.value ?? "1";
  const minimumAlphabets =
    passwordPolicy.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_CHAR_Cha_LEN",
    )?.value ?? "1";

  return (
    <SignIn
      passwordPolicies={{
        minimumLength: !isNaN(parseInt(minimumLength))
          ? parseInt(minimumLength)
          : 1,
        minimumNumbers: !isNaN(parseInt(minimumNumbers))
          ? parseInt(minimumNumbers)
          : 0,
        minimumAlphabets: !isNaN(parseInt(minimumAlphabets))
          ? parseInt(minimumNumbers)
          : 0,
      }}
    />
  );
};

export default SignInPage;
