import { getPasswordPolicies } from "@/_lib/apis/server";
import type { Metadata } from "next";
import SignIn from "./sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const passwordPolicies = await getPasswordPolicies();

  return <SignIn passwordPolicies={passwordPolicies} />;
};

export default SignInPage;
