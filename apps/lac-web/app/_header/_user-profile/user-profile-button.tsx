"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import { Exit } from "@repo/web-ui/components/icons/exit";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Switch } from "@repo/web-ui/components/icons/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/web-ui/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLogoutMutation from "../use-logout-mutation.hook";
import ButtonContent, { buttonClasses } from "./button-content";
import type { ViewportTypes } from "./types";
import useOSRLogoutMutation from "./use-osr-logout-mutation.hook";

const UserProfileButton = ({
  token,
  type,
}: {
  token: string;
  type: ViewportTypes;
}) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const loginCheckData = checkLoginQuery.data;
  let isOSRLoggedInAsCustomer = false;
  let isOSRUser = false;
  let customerDetails = "";

  if ("sales_rep_id" in loginCheckData) {
    isOSRUser = true;
    customerDetails = loginCheckData.user.company || loginCheckData.user.billto;
  }

  // TODO: Update this function after the /login-check API is updated to identify the OSR login status
  if (
    loginCheckData.status_code === "OK" &&
    "sales_rep_id" in loginCheckData &&
    "user_id" in loginCheckData
  ) {
    isOSRLoggedInAsCustomer = true;
  }

  // User isn't logged in
  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return (
      <Link
        href="/sign-in"
        className={buttonClasses({
          variant: "ghost",
          size: type === "mobile" ? "icon" : "default",
          type,
        })}
      >
        <ButtonContent />
      </Link>
    );
  }

  return (
    <UserProfileDropdown
      token={token}
      type={type}
      isOSRUser={isOSRUser}
      isOSRLoggedInAsCustomer={isOSRLoggedInAsCustomer}
      customerDetails={customerDetails}
    />
  );
};

export default UserProfileButton;

const UserProfileDropdown = ({
  token,
  type,
  isOSRUser,
  isOSRLoggedInAsCustomer,
  customerDetails,
}: {
  token: string;
  type: ViewportTypes;
  isOSRUser: boolean;
  isOSRLoggedInAsCustomer: boolean;
  customerDetails: string;
}) => {
  const router = useRouter();
  const usersListQuery = useSuspenseUsersList(token);
  const userProfile = usersListQuery.data.manageContact.yourProfile;

  const logoutMutation = useLogoutMutation();
  const osrLogoutMutation = useOSRLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonClasses({
          variant: "ghost",
          size: type === "mobile" ? "icon" : "default",
          type,
        })}
      >
        <ButtonContent>
          Hi, {userProfile.firstName !== "" ? userProfile.firstName : "User"}
        </ButtonContent>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-0">
        <DropdownMenuItem className="block bg-wurth-gray-50 p-3">
          <div className="font-medium">Robert Fox</div>

          {isOSRLoggedInAsCustomer && <div>Logged in as {customerDetails}</div>}
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="flex flex-row items-center gap-2 text-black"
        >
          <Link href="/myaccount/orderhistory">
            <DropdownMenuShortcut className="ml-0 size-4" />

            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="flex flex-row items-center gap-2 text-black"
        >
          <Link href="/myaccount/purchaseditems">
            <DropdownMenuShortcut className="ml-0 size-4" />

            <span>My Purchased Items</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="flex flex-row items-center gap-2 text-black"
        >
          <Link href="/myaccount/myfavorites">
            <DropdownMenuShortcut className="ml-0">
              <HeartOutline className="size-4 stroke-black stroke-2" />
            </DropdownMenuShortcut>

            <span>My Favorites</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isOSRLoggedInAsCustomer && (
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() =>
              logoutMutation.mutate(undefined, {
                onSuccess: () => {
                  router.replace("/osr/dashboard");
                },
              })
            }
          >
            <DropdownMenuShortcut className="ml-0">
              <Switch width={16} className="stroke-2" />
            </DropdownMenuShortcut>
            Switch back
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="flex flex-row items-center gap-2 text-wurth-red-650"
          onClick={() => {
            if (isOSRUser) {
              osrLogoutMutation.mutate();
            } else {
              logoutMutation.mutate();
            }
          }}
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
