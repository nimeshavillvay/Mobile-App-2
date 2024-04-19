import type { Metadata } from "next";
import { getPasswordPolicies } from "../apis";
import SignIn from "./sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const passwordPolicies = await getPasswordPolicies();

  return <SignIn passwordPolicies={passwordPolicies} />;
};

export default SignInPage;
