"use client";

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
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSupervisorAccount,
  MdSwitchAccount,
} from "react-icons/md";
import useSuspenseUsersList from "./use-suspense-users-list.hook";
import UserRow from "./user-row";

const UsersList = ({ token }: { token: string }) => {
  const [showCurrentUsers, setShowCurrentUsers] = useState(false);
  const usersListQuery = useSuspenseUsersList(token);

  const yourProfile =
    usersListQuery?.data?.manage_contact?.your_profile ?? null;
  const currentUsers =
    usersListQuery?.data?.manage_contact?.contact_list ?? null;

  return (
    <>
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
            <TableCell>{yourProfile?.email}</TableCell>
            <TableCell className="text-center">
              {yourProfile?.permission}
            </TableCell>
            <TableCell className="text-center">
              <span className="border-brand-tertiary text-brand-tertiary min-w-24 rounded-sm border px-5 py-px font-bold">
                {yourProfile?.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end">
                <button className="font-wurth bg-brand-secondary flex items-center justify-center rounded-sm pl-4 pr-2 text-base font-extrabold uppercase leading-[24px] text-white">
                  Open&nbsp;
                  <MdKeyboardArrowDown className="text-xl leading-none" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* New And Pending Users Section */}
      <div className="my-5 flex justify-between">
        <h6 className="font-wurth text-brand-gray-500 flex text-base font-medium capitalize">
          <MdSwitchAccount className="self-center text-2xl leading-none" />
          &nbsp;New And Pending Users
        </h6>

        <button className="font-wurth bg-brand-secondary flex items-center justify-center rounded-sm pl-4 pr-2 text-base font-extrabold uppercase leading-[24px] text-white">
          Show&nbsp;
          <MdKeyboardArrowDown className="text-xl leading-none" />
        </button>
      </div>

      <Separator
        orientation="horizontal"
        className="bg-brand-gray-200 h-px flex-1"
      />

      {/* Current Users Section */}
      <div className="my-5 flex justify-between">
        <h6 className="font-wurth text-brand-gray-500 flex text-base font-medium capitalize">
          <MdSupervisorAccount className="self-center text-2xl leading-none" />
          &nbsp;Current Users On This Account
        </h6>

        <button
          className="font-wurth bg-brand-secondary relative flex min-w-[80px] items-center justify-center rounded-sm px-2 text-center text-base font-extrabold uppercase leading-[24px] text-white"
          onClick={() => setShowCurrentUsers(!showCurrentUsers)}
        >
          {showCurrentUsers ? "Hide" : "Show"}&nbsp;
          {showCurrentUsers ? (
            <MdKeyboardArrowUp className="text-xl leading-none" />
          ) : (
            <MdKeyboardArrowDown className="text-xl leading-none" />
          )}
        </button>
      </div>

      {showCurrentUsers && (
        <Table>
          <VisuallyHidden asChild>
            <TableCaption>Current users on this account section.</TableCaption>
          </VisuallyHidden>

          <TableHeader className="bg-brand-gray-200 border-brand-gray-200 border">
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Permission</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-brand-gray-200 text-brand-gray-500 border">
            {currentUsers &&
              currentUsers.map((user, index) => (
                <UserRow key={user?.uuid} user={user} index={index} />
              ))}
          </TableBody>
        </Table>
      )}

      <Separator
        orientation="horizontal"
        className="bg-brand-gray-200 h-px flex-1"
      />
    </>
  );
};

export default UsersList;
