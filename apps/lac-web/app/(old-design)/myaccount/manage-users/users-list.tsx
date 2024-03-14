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
import type { Role } from "@/old/_lib/types";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSupervisorAccount,
  MdSwitchAccount,
} from "react-icons/md";
import PendingUserRow from "./pending-user-row";
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
  const [showPendingUsers, setShowPendingUsers] = useState(false);
  const usersListQuery = useSuspenseUsersList(token);

  const pendingUsers = usersListQuery?.data?.approve_contacts ?? null;
  const yourProfile =
    usersListQuery?.data?.manage_contact?.your_profile ?? null;
  const currentUsers =
    usersListQuery?.data?.manage_contact?.contact_list ?? null;

  return (
    <>
      <Table>
        <TableCaption className="sr-only">
          Update your profile section.
        </TableCaption>

        <TableHeader className="border border-brand-gray-200 bg-brand-gray-200">
          <TableRow>
            <TableHead>Email</TableHead>

            <TableHead className="text-center">Permission</TableHead>

            <TableHead className="text-center">Status</TableHead>

            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="border border-brand-gray-200">
          <TableRow>
            <TableCell>{yourProfile?.email}</TableCell>

            <TableCell className="text-center">
              {yourProfile?.permission}
            </TableCell>

            <TableCell className="text-center">
              <span className="min-w-24 rounded-sm border border-brand-tertiary px-5 py-px font-bold text-brand-tertiary">
                {yourProfile?.status}
              </span>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end">
                <Button className="flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 bg-brand-secondary px-2 font-wurth text-base leading-6 text-white">
                  Open&nbsp;
                  <MdKeyboardArrowDown className="text-xl leading-none" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* New And Pending Users Section */}
      <Collapsible open={showPendingUsers} onOpenChange={setShowPendingUsers}>
        <div className="my-5 flex justify-between">
          <h6 className="flex font-wurth text-base font-medium capitalize text-brand-gray-500">
            <MdSwitchAccount className="self-center text-2xl leading-none" />
            &nbsp;New And Pending Users
          </h6>

          <CollapsibleTrigger asChild>
            <Button className="flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 bg-brand-secondary px-2 font-wurth text-base leading-6 text-white">
              {showPendingUsers ? (
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
            <TableCaption className="sr-only">
              New and pending users section.
            </TableCaption>

            <TableHeader className="border border-brand-gray-200 bg-brand-gray-200">
              <TableRow>
                <TableHead>Email</TableHead>

                <TableHead className="capitalize">
                  First and Last Name
                </TableHead>

                <TableHead className="capitalize">Job Title</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="border border-brand-gray-200 text-brand-gray-500">
              {pendingUsers.map((user, index) => (
                <PendingUserRow
                  key={user?.email}
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
        className="h-px flex-1 bg-brand-gray-200"
      />

      {/* Current Users Section */}
      <Collapsible open={showCurrentUsers} onOpenChange={setShowCurrentUsers}>
        <div className="my-5 flex justify-between">
          <h6 className="flex font-wurth text-base font-medium capitalize text-brand-gray-500">
            <MdSupervisorAccount className="self-center text-2xl leading-none" />
            &nbsp;Current Users On This Account
          </h6>

          <CollapsibleTrigger asChild>
            <Button className="flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 bg-brand-secondary px-2 font-wurth text-base leading-6 text-white">
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
          {currentUsers && currentUsers?.length > 0 ? (
            <Table>
              <TableCaption className="sr-only">
                Current users on this account section.
              </TableCaption>

              <TableHeader className="border border-brand-gray-200 bg-brand-gray-200">
                <TableRow>
                  <TableHead>Email</TableHead>

                  <TableHead className="text-center">Permission</TableHead>

                  <TableHead className="text-center">Status</TableHead>

                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="border border-brand-gray-200 text-brand-gray-500">
                {currentUsers.map((user, index) => (
                  <UserRow
                    key={user?.uuid}
                    user={user}
                    index={index}
                    jobRoles={jobRoles}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="mt-10 rounded-sm border border-brand-gray-300 p-6 text-center font-wurth text-lg capitalize text-brand-gray-300">
              Current Users Not Available!
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-gray-200"
      />
    </>
  );
};

export default UsersList;
