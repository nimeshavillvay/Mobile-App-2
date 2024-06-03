"use client";

import ShippingDetailsDialog from "@/_components/shipping-details-dialog";
import useLogoutMutation from "@/_hooks/user/use-logout-mutation.hook";
import useOSRLogoutMutation from "@/_hooks/user/use-osr-logout-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import type { ShippingMethod } from "@/_lib/types";
import { Building } from "@repo/web-ui/components/icons/building";
import { Exit } from "@repo/web-ui/components/icons/exit";
import { Gear } from "@repo/web-ui/components/icons/gear";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { MapPin } from "@repo/web-ui/components/icons/map-pin";
import { Switch } from "@repo/web-ui/components/icons/switch";
import { UserGroup } from "@repo/web-ui/components/icons/user-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/web-ui/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import ButtonContent, { buttonClasses } from "./button-content";
import type { ViewportTypes } from "./types";
import UserMobileNavigation from "./user-mobile-navigation";

const UserProfileButton = ({
  token,
  type,
  shippingMethods,
}: {
  readonly token: string;
  readonly type: ViewportTypes;
  readonly shippingMethods: ShippingMethod[];
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

  if (type === "mobile") {
    return (
      <UserMobileNavigation token={token} shippingMethods={shippingMethods} />
    );
  } else {
    // Desktop
    return checkLoginQuery.data.status_code === "NOT_LOGGED_IN" ? (
      <Link
        href="/sign-in"
        className={buttonClasses({
          variant: "ghost",
          size: "default",
          type: "desktop",
        })}
      >
        <ButtonContent />
      </Link>
    ) : (
      <UserProfileDropdown
        token={token}
        isOSRUser={isOSRUser}
        isOSRLoggedInAsCustomer={isOSRLoggedInAsCustomer}
        customerDetails={customerDetails}
        shippingMethods={shippingMethods}
      />
    );
  }
};

export default UserProfileButton;

const UserProfileDropdown = ({
  token,
  isOSRUser,
  isOSRLoggedInAsCustomer,
  customerDetails,
  shippingMethods,
}: {
  readonly token: string;
  readonly isOSRUser: boolean;
  readonly isOSRLoggedInAsCustomer: boolean;
  readonly customerDetails: string;
  readonly shippingMethods: ShippingMethod[];
}) => {
  const router = useRouter();
  const usersListQuery = useSuspenseUsersList(token);
  const userProfile = usersListQuery.data.manageContact.yourProfile;

  const logoutMutation = useLogoutMutation();
  const osrLogoutMutation = useOSRLogoutMutation();

  const [openShippingDialog, setOpenShippingDialog] = useState(false);
  const displayName = userProfile.firstName
    ? userProfile.firstName.concat(" ").concat(userProfile.lastName)
    : userProfile.lastName
      ? userProfile.lastName
      : "User";

  return (
    <>
      {/* The ShippingDetailsDialog is put outside the DropdownMenu otherwise it would */}
      {/* be unmounted when the DropdownMenu is closed */}
      <ShippingDetailsDialog
        token={token}
        shippingMethods={shippingMethods}
        open={openShippingDialog}
        setOpen={setOpenShippingDialog}
      >
        {/* This is to disable the fallback button in the ShippingDetailsDialog component */}
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        <Fragment />
      </ShippingDetailsDialog>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonClasses({
            variant: "ghost",
            size: "default",
            type: "desktop",
          })}
        >
          <ButtonContent>
            Hi, {userProfile.firstName !== "" ? userProfile.firstName : "User"}
          </ButtonContent>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 p-0">
          <DropdownMenuItem className="mb-1 block bg-wurth-gray-50 p-3">
            <div className="font-medium">{displayName}</div>

            {isOSRLoggedInAsCustomer && (
              <div>Logged in as {customerDetails}</div>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex w-full flex-row items-center gap-2 text-black"
            asChild
          >
            <button onClick={() => setOpenShippingDialog(true)}>
              <MapPin className="ml-0 size-4" />

              <span>Shipping Details</span>
            </button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

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
            <Link href="/myaccount/shopping-lists">
              <DropdownMenuShortcut className="ml-0">
                <HeartOutline className="size-4 stroke-black stroke-2" />
              </DropdownMenuShortcut>

              <span>My Shopping Lists</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="pl-8">Settings</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link href="/myaccount/company-profile">
              <DropdownMenuShortcut className="ml-0">
                <Building className="size-4 stroke-black stroke-2" />
              </DropdownMenuShortcut>

              <span>Company Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link href="/myaccount/manage-users">
              <DropdownMenuShortcut className="ml-0">
                <UserGroup className="size-4 stroke-black stroke-2" />
              </DropdownMenuShortcut>

              <span>Manage Users</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="flex flex-row items-center gap-2 text-black"
          >
            <Link href="/myaccount/personal-navigation">
              <DropdownMenuShortcut className="ml-0">
                <Gear className="size-4 stroke-black stroke-2" />
              </DropdownMenuShortcut>

              <span>User Settings</span>
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
    </>
  );
};
