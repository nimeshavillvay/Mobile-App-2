"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
// import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import { Exit } from "@repo/web-ui/components/icons/exit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/web-ui/components/ui/dropdown-menu";
import SignInLink from "./signin-link";
import type { ViewportTypes } from "./types";
import useLogoutMutation from "./use-logout-mutation.hook";

const UserProfileButton = ({
  token,
  type,
}: {
  token: string;
  type: ViewportTypes;
}) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  // User isn't logged in
  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return <SignInLink type={type} />;
  }

  return <UserProfileDropdown token={token} type={type} />;
};

export default UserProfileButton;

const UserProfileDropdown = ({
  // token,
  type,
}: {
  token: string;
  type: ViewportTypes;
}) => {
  // TODO: Replace with real data
  const userProfile = { firstName: "User" };
  // const usersListQuery = useSuspenseUsersList(token);
  // const userProfile = usersListQuery.data.manageContact.yourProfile;

  const logoutMutation = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SignInLink type={type} text={`Hi, ${userProfile.firstName}`} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex flex-row items-center gap-2 text-wurth-red-650"
          onClick={() => logoutMutation.mutate()}
        >
          <DropdownMenuShortcut className="ml-0">
            <Exit className="size-4 stroke-wurth-red-650 stroke-2" />
          </DropdownMenuShortcut>

          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
