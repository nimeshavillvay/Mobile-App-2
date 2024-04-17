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
import type { PasswordPolicy, Role } from "@/old/_lib/types";
import { useState } from "react";
import {
  MdAccountBox,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdPersonAdd,
  MdSupervisorAccount,
} from "react-icons/md";
import AddUserDataDialog from "./add-user-data-dialog";
import AddUserEmailDialog from "./add-user-email-dialog";
import ProfileUpdateForm from "./profile-update-form";
import useSuspenseUsersList from "./use-suspense-users-list.hook";
import UserRow from "./user-row";

const UsersList = ({
  token,
  jobRoles,
  passwordPolicies = [],
}: {
  token: string;
  jobRoles: Role[];
  passwordPolicies: PasswordPolicy[];
}) => {
  const [showYourProfile, setShowYourProfile] = useState(false);
  const [showCurrentUsers, setShowCurrentUsers] = useState(false);
  const [openAddUserEmailDialog, setOpenAddUserEmailDialog] = useState(false);
  const [openAddUserDataDialog, setOpenAddUserDataDialog] = useState(false);
  const [addUserDataDialogEmail, setAddUserDataDialogEmail] = useState("");

  const usersListQuery = useSuspenseUsersList(token);

  const yourProfile = usersListQuery?.data?.manageContact?.yourProfile ?? null;
  const currentUsers = usersListQuery?.data?.manageContact?.contactList ?? null;

  return (
    <>
      <Button
        type="submit"
        className="absolute right-0 top-[-20px] px-6"
        onClick={() => setOpenAddUserEmailDialog(true)}
      >
        <MdPersonAdd className="text-xl leading-none" />
        Add user
      </Button>

      <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
        Manage Users
      </h2>

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-primary"
      />

      <h6 className="my-5 flex font-wurth text-base font-medium text-brand-gray-500">
        <MdAccountBox className="self-center text-2xl leading-none" />
        &nbsp;Update Your Profile
      </h6>

      {/* Update Your Profile Section */}
      <Collapsible open={showYourProfile} onOpenChange={setShowYourProfile}>
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
                  <CollapsibleTrigger asChild>
                    <Button className="flex h-6 min-w-20 flex-row items-center justify-center gap-0.5 bg-brand-secondary px-2 font-wurth text-base leading-6 text-white">
                      {showYourProfile ? (
                        <>
                          Close
                          <MdKeyboardArrowUp className="text-xl leading-none" />
                        </>
                      ) : (
                        <>
                          Open
                          <MdKeyboardArrowDown className="text-xl leading-none" />
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </TableCell>
            </TableRow>

            <CollapsibleContent asChild>
              <TableRow>
                <TableCell colSpan={4}>
                  <ProfileUpdateForm
                    jobRoles={jobRoles}
                    user={yourProfile}
                    passwordPolicies={passwordPolicies}
                  />
                </TableCell>
              </TableRow>
            </CollapsibleContent>
          </TableBody>
        </Table>
      </Collapsible>

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
                    key={user?.id}
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

      <AddUserEmailDialog
        open={openAddUserEmailDialog}
        setOpen={setOpenAddUserEmailDialog}
        setOpenAddUserDataDialog={setOpenAddUserDataDialog}
        setEmail={setAddUserDataDialogEmail}
        currentUsers={currentUsers}
      />
      <AddUserDataDialog
        jobRoles={jobRoles}
        open={openAddUserDataDialog}
        email={addUserDataDialogEmail}
        setOpen={setOpenAddUserDataDialog}
      />
    </>
  );
};

export default UsersList;
