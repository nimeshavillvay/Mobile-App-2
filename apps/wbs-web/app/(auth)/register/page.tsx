import { getCountries, getPasswordPolicies } from "@/_lib/apis/server";
import type { Metadata } from "next";
import { getIndustries } from "./apis";
import Register from "./register";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = async () => {
  const [passwordPolicies, industries, countries] = await Promise.all([
    getPasswordPolicies(),
    getIndustries(),
    getCountries(),
  ]);

  return (
    <Register
      passwordPolicies={passwordPolicies}
      industries={industries}
      countries={countries}
    />
  );
};

export default RegisterPage;
