import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPasswordPolicies } from "../apis";
import { EMAIL_COOKIE } from "../constants";
import Register from "./register";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = async () => {
  const cookieStore = cookies();
  const emailCookie = cookieStore.get(EMAIL_COOKIE);

  // If there is not email, redirect to the sign in page
  if (!emailCookie?.value) {
    redirect("/sign-in");
  }

  const passwordPolicies = await getPasswordPolicies();

  return <Register passwordPolicies={passwordPolicies} />;
};

export default RegisterPage;
