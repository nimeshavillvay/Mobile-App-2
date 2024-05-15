import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import { cva } from "@/_lib/cva.config";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/web-ui/components/ui/sheet";
import Link from "next/link";
import useLogoutMutation from "../use-logout-mutation.hook";
import ButtonContent, { buttonClasses } from "./button-content";
import useOSRLogoutMutation from "./use-osr-logout-mutation.hook";

const sectionLinkStyles = cva({
  base: "flex w-full flex-row items-center justify-between gap-2 bg-white px-4 py-3 text-base font-normal text-black",
});
const dividerStyles = cva({
  base: "divide-y divide-wurth-gray-250",
});

type UserMobileNavigationProps = {
  token: string;
};

const UserMobileNavigation = ({ token }: UserMobileNavigationProps) => {
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

  return <UserMobileProfileNavigation token={token} />;
};

export default UserMobileNavigation;

const UserMobileProfileNavigation = ({ token }: { token: string }) => {
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
            <SheetClose asChild className={sectionLinkStyles()}>
              <Link href="/myaccount/shipping-details">Shipping details</Link>
            </SheetClose>
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
            <SheetClose asChild className={sectionLinkStyles()}>
              <Link href="/myaccount/company-profile">Company Profile</Link>
            </SheetClose>
          </li>

          <li>
            <SheetClose asChild className={sectionLinkStyles()}>
              <Link href="/myaccount/manage-users">Manage Users</Link>
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
