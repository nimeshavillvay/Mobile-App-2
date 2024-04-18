import { getPasswordPolicies } from "@/(auth)/apis";
import { getJobRoles } from "@/_lib/apis/server";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UsersList from "./users-list";

export const metadata: Metadata = {
  title: "User Management",
};

const UserManagementPage = async () => {
  const accountTokenCookie = cookies().get(ACCOUNT_TOKEN_COOKIE);

  if (!accountTokenCookie?.value) {
    return redirect("/");
  }

  const jobRoles = await getJobRoles();
  const passwordPolicies = await getPasswordPolicies();

  return (
    <UsersList
      token={accountTokenCookie?.value}
      jobRoles={jobRoles?.roles}
      passwordPolicies={passwordPolicies}
    />
  );
};

export default UserManagementPage;
