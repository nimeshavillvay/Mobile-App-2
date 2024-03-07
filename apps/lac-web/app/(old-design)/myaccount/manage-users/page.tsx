import Separator from "@/old/_components/separator";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { getJobRoles } from "@/old/_lib/shared-server-apis";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MdAccountBox } from "react-icons/md";
import UsersList from "./users-list";

export const metadata: Metadata = {
  title: "User Management",
};

const UserManagementPage = async () => {
  const accountTokenCookie = cookies().get(ACCOUNT_TOKEN_COOKIE);

  if (!accountTokenCookie?.value) {
    return null;
  }

  const jobRoles = await getJobRoles();

  return (
    <>
      <div>
        <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
          Manage Users
        </h2>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />

        <div className="my-5">
          <h6 className="flex font-wurth text-base font-medium text-brand-gray-500">
            <MdAccountBox className="self-center text-2xl leading-none" />
            &nbsp;Update Your Profile
          </h6>
        </div>

        <UsersList token={accountTokenCookie.value} jobRoles={jobRoles.roles} />
      </div>
    </>
  );
};

export default UserManagementPage;
