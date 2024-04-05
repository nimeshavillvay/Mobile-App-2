import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { getJobRoles, getPasswordPolicy } from "@/old/_lib/shared-server-apis";
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
  const passwordPolicy = await getPasswordPolicy();

  return (
    <UsersList
      token={accountTokenCookie?.value}
      jobRoles={jobRoles?.roles}
      passwordPolicies={passwordPolicy?.data?.passwordPolicies}
    />
  );
};

export default UserManagementPage;
