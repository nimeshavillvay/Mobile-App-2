import ErrorBoundary from "@/_components/error-boundary";
import Separator from "@/_components/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import VisuallyHidden from "@/_components/visually-hidden";
import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MdAccountBox } from "react-icons/md";
import UsersList from "./users-list";

export const metadata: Metadata = {
  title: "User Management",
};

const UserManagementPage = () => {
  const accountTokenCookie = cookies().get(ACCOUNT_TOKEN_COOKIE);

  if (!accountTokenCookie?.value) {
    return null;
  }

  return (
    <>
      <div>
        <h2 className="text-brand-primary relative text-lg font-medium">
          Manage Users
        </h2>

        <Separator
          orientation="horizontal"
          className="bg-brand-primary h-px flex-1"
        />

        <div className="my-5">
          <h6 className="text-brand-gray-500 flex text-base font-medium">
            <MdAccountBox className="self-center text-2xl leading-none" />
            &nbsp;Update Your Profile
          </h6>
        </div>

        <Table>
          <VisuallyHidden asChild>
            <TableCaption>Update your profile section.</TableCaption>
          </VisuallyHidden>

          <TableHeader className="bg-brand-gray-200 border-brand-gray-200 border">
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Permission</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-brand-gray-200 border">
            <TableRow>
              <TableCell>rifka@villvay.com</TableCell>
              <TableCell className="text-center">ADMIN</TableCell>
              <TableCell className="text-center">
                <span className="border-brand-tertiary text-brand-tertiary min-w-24 rounded-sm border px-5 py-px font-bold">
                  ACTIVE
                </span>
              </TableCell>
              <TableCell className="text-right">
                <button className="bg-brand-secondary rounded px-2 font-normal uppercase leading-[22px] text-white">
                  OPEN
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <ErrorBoundary fallback={<div>Error: fetching users list</div>}>
          <UsersList token={accountTokenCookie.value} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default UserManagementPage;
