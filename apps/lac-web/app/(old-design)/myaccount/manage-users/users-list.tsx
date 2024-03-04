"use client";

import Separator from "@/old/_components/separator";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import VisuallyHidden from "@/old/_components/visually-hidden";
import type { Role } from "@/old/_lib/types";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSupervisorAccount,
  MdSwitchAccount,
} from "react-icons/md";
import useSuspenseUsersList from "./use-suspense-users-list.hook";
import UserRow from "./user-row";

const UsersList = ({
  token,
  jobRoles,
}: {
  token: string;
  jobRoles: Role[];
}) => {
  const [showCurrentUsers, setShowCurrentUsers] = useState(false);
  const usersListQuery = useSuspenseUsersList(token);

  const yourProfile =
    usersListQuery?.data?.manage_contact?.your_profile ?? null;
  const currentUsers =
    usersListQuery?.data?.manage_contact?.contact_list ?? null;

  return (
    <>
      <Table>
        <VisuallyHidden>
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
                <Button className="font-wurth bg-brand-secondary flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 px-2 text-base leading-6 text-white">
                  Open&nbsp;
                  <MdKeyboardArrowDown className="text-xl leading-none" />
                </Button>
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

        <Button className="font-wurth bg-brand-secondary flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 px-2 text-base leading-6 text-white">
          Show
          <MdKeyboardArrowDown className="text-xl leading-none" />
        </Button>
      </div>

      <Separator
        orientation="horizontal"
        className="bg-brand-gray-200 h-px flex-1"
      />

      {/* Current Users Section */}
      <Collapsible open={showCurrentUsers} onOpenChange={setShowCurrentUsers}>
        <div className="my-5 flex justify-between">
          <h6 className="font-wurth text-brand-gray-500 flex text-base font-medium capitalize">
            <MdSupervisorAccount className="self-center text-2xl leading-none" />
            &nbsp;Current Users On This Account
          </h6>

          <CollapsibleTrigger asChild>
            <Button className="font-wurth bg-brand-secondary flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 px-2 text-base leading-6 text-white">
              {showCurrentUsers ? (
                <>
                  Hide
                  <MdKeyboardArrowUp className="text-xl leading-none" />
                </>
              ) : (
                <>
                  Show
                  <MdKeyboardArrowDown className="text-xl leading-none" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <Table>
            <VisuallyHidden>
              <TableCaption>
                Current users on this account section.
              </TableCaption>
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
                  <UserRow
                    key={user?.uuid}
                    user={user}
                    index={index}
                    jobRoles={jobRoles}
                  />
                ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>

      <Separator
        orientation="horizontal"
        className="bg-brand-gray-200 h-px flex-1"
      />
    </>
  );
};

export default UsersList;
