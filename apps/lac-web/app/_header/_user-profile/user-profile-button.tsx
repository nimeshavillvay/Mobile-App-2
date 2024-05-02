"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import { cn } from "@/_lib/utils";
import { Exit } from "@repo/web-ui/components/icons/exit";
import { Profile } from "@repo/web-ui/components/icons/profile";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/web-ui/components/ui/dropdown-menu";
import Link from "next/link";
import useLogoutMutation from "./use-logout-mutation.hook";

const mobileClasses = cn("size-6 md:hidden");
const desktopClasses = cn(
  "hidden shrink-0 md:flex md:h-min md:flex-row md:items-center md:gap-2 md:p-0",
);

const UserProfileButton = ({
  token,
  type,
}: {
  token: string;
  type: "desktop" | "mobile";
}) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  // User isn't logged in
  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return (
      <Button
        variant="ghost"
        size={type === "mobile" ? "icon" : "default"}
        className={type === "mobile" ? mobileClasses : desktopClasses}
        asChild
      >
        <Link href="/sign-in">
          <ButtonContent text="Sign in / Register" />
        </Link>
      </Button>
    );
  }

  return <UserProfileDropdown token={token} type={type} />;
};

export default UserProfileButton;

const UserProfileDropdown = ({
  token,
  type,
}: {
  token: string;
  type: "desktop" | "mobile";
}) => {
  const usersListQuery = useSuspenseUsersList(token);
  const userProfile = usersListQuery.data.manageContact.yourProfile;

  const logoutMutation = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={type === "mobile" ? "icon" : "default"}
          className={type === "mobile" ? mobileClasses : desktopClasses}
        >
          <ButtonContent text={`Hi, ${userProfile.firstName}`} />
        </Button>
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

const ButtonContent = ({ text }: { text: string }) => {
  return (
    <>
      <Profile className="md:size-7" />

      <span className="sr-only md:not-sr-only md:text-base md:font-semibold">
        {text}
      </span>
    </>
  );
};
