import ShippingDetailsDialog from "@/_components/shipping-details-dialog";
import useLogoutMutation from "@/_hooks/user/use-logout-mutation.hook";
import useOSRLogoutMutation from "@/_hooks/user/use-osr-logout-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import { cva } from "@/_lib/cva.config";
import type { ShippingMethod } from "@/_lib/types";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/web-ui/components/ui/sheet";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import ButtonContent, { buttonClasses } from "./button-content";

const sectionLinkStyles = cva({
  base: "flex w-full flex-row items-center justify-between gap-2 bg-white px-4 py-3 text-base font-normal text-black",
});
const dividerStyles = cva({
  base: "divide-y divide-wurth-gray-250",
});

type UserMobileNavigationProps = {
  readonly token: string;
  readonly shippingMethods: ShippingMethod[];
};

const UserMobileNavigation = ({
  token,
  shippingMethods,
}: UserMobileNavigationProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  if (checkLoginQuery.data.status_code === "NOT_LOGGED_IN") {
    return (
      <Sheet>
        <SheetTrigger
          className={buttonClasses({
            variant: "ghost",
            size: "icon",
            type: "mobile",
          })}
        >
          <ButtonContent />
        </SheetTrigger>

        <SheetContent side="right" className="w-80 bg-wurth-gray-50">
          <SheetHeader className="text-left">
            <SheetTitle>Hi, Welcome!</SheetTitle>

            <SheetDescription className="sr-only">
              Log in to your account.
            </SheetDescription>
          </SheetHeader>

          <ul className={dividerStyles()}>
            <li>
              <SheetClose asChild className={sectionLinkStyles()}>
                <Link href="/sign-in">Log in to your account</Link>
              </SheetClose>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <UserMobileProfileNavigation
      token={token}
      shippingMethods={shippingMethods}
    />
  );
};

export default UserMobileNavigation;

const UserMobileProfileNavigation = ({
  token,
  shippingMethods,
}: UserMobileNavigationProps) => {
  const usersListQuery = useSuspenseUsersList(token);
  const userProfile = usersListQuery.data.manageContact.yourProfile;

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isOsr =
    checkLoginQuery.data.status_code === "OK" &&
    !!checkLoginQuery.data.sales_rep_id;

  const osrLogoutMutation = useOSRLogoutMutation();
  const logoutMutation = useLogoutMutation();

  return (
    <Sheet>
      <SheetTrigger
        className={buttonClasses({
          variant: "ghost",
          size: "icon",
          type: "mobile",
        })}
      >
        <ButtonContent>
          Hi, {userProfile.firstName !== "" ? userProfile.firstName : "User"}
        </ButtonContent>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 bg-wurth-gray-50">
        <SheetHeader className="text-left">
          <SheetTitle>
            Hi, {userProfile.firstName !== "" ? userProfile.firstName : "User"}!
          </SheetTitle>

          <SheetDescription className="sr-only">
            Log in to your account.
          </SheetDescription>
        </SheetHeader>

        <ul className={dividerStyles()}>
          <li>
            <Suspense
              fallback={
                <div className="w-full px-4 py-3">
                  <Skeleton className="h-5 w-40" />
                </div>
              }
            >
              <SheetClose asChild className={sectionLinkStyles()}>
                <ShippingDetailsDialog
                  token={token}
                  shippingMethods={shippingMethods}
                >
                  <Button
                    variant="ghost"
                    className="flex h-full w-full flex-row items-center justify-between gap-2 bg-white px-4 py-3 text-base font-normal text-black"
                  >
                    Shipping Details
                  </Button>
                </ShippingDetailsDialog>
              </SheetClose>
            </Suspense>
          </li>

          <li>
            <SheetClose asChild className={sectionLinkStyles()}>
              <Link href="/myaccount/orderhistory">My Orders</Link>
            </SheetClose>
          </li>

          <li>
            <SheetClose asChild className={sectionLinkStyles()}>
              <Link href="/myaccount/purchaseditems">My Purchased Items</Link>
            </SheetClose>
          </li>

          <li>
            <SheetClose asChild className={sectionLinkStyles()}>
              <Link href="/myaccount/shopping-lists">My Shopping Lists</Link>
            </SheetClose>
          </li>

          <li>
            <SheetClose
              className={sectionLinkStyles()}
              onClick={() => {
                if (isOsr) {
                  osrLogoutMutation.mutate();
                } else {
                  logoutMutation.mutate();
                }
              }}
            >
              Logout
            </SheetClose>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
