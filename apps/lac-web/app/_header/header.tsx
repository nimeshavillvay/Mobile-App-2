import { getCategoriesList } from "@/_lib/apis/server";
import { cn } from "@/_lib/utils";
import { Phone } from "@repo/web-ui/components/icons/phone";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import ShippingDetailsDialog from "./_shipping-details-dialog";
import UserProfile, { UserProfileSkeleton } from "./_user-profile";
import WillCallPlant from "./_will-call-plant";
import Cart from "./cart";
import DesktopNavigationMenu from "./desktop-navigation-menu";
import MobileNavigationMenu from "./mobile-navigation-menu";
import OSRDetails from "./osr-details";
import SearchBar from "./search-bar";

const Header = async () => {
  const categories = await getCategoriesList();

  return (
    <header className="flex flex-col gap-4 border-b border-b-wurth-gray-250 pb-5 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05),0px_1px_2px_-1px_rgba(0,0,0,0.05)] md:border-0 md:pb-0 print:hidden">
      <div className="bg-wurth-gray-50">
        <div className="container flex flex-row items-center justify-between pb-3 pt-12 text-sm font-medium md:py-3">
          <div className="flex items-center gap-5">
            <WillCallPlant />

            <ShippingDetailsDialog />

            <Suspense fallback={<Skeleton className="h-5 w-60" />}>
              <OSRDetails />
            </Suspense>
          </div>

          <div className="hidden flex-row items-center gap-6 md:flex">
            <Button
              variant="link"
              className="group h-fit px-0 py-0 font-medium"
              asChild
            >
              <a href="tel:800-444-0043">
                <Phone
                  width={16}
                  height={16}
                  className="group-hover:stroke-red-800"
                />

                <span>(800) 444-0043</span>
              </a>
            </Button>

            <div className="font-normal text-wurth-gray-800">
              Wurth Louis and Company
            </div>
          </div>
        </div>
      </div>

      <div className="container flex w-full min-w-0 flex-row items-center gap-7 pt-1">
        <MobileNavigationMenu categories={categories} />

        <Link href="/" className="flex-shrink-0">
          <WurthFullBlack className="h-[24px] w-[114px] md:h-[28px] md:w-[133px]" />

          <span className="sr-only">Home</span>
        </Link>

        <div className="container relative hidden w-[800px] md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex min-w-0 flex-row items-center gap-4 md:ml-0 md:gap-6">
          {/* Mobile */}
          <Suspense fallback={<UserProfileSkeleton type="mobile" />}>
            <UserProfile type="mobile" />
          </Suspense>

          <Link
            href="/cart"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "size-6 md:hidden",
            )}
          >
            <Suspense fallback={<Skeleton className="h-6 w-6" />}>
              <Cart type="mobile" />
            </Suspense>

            <span className="sr-only">Cart</span>
          </Link>

          {/* Desktop */}
          <Suspense fallback={<UserProfileSkeleton type="desktop" />}>
            <UserProfile type="desktop" />
          </Suspense>

          <Link
            href="/cart"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden shrink-0 md:flex md:h-min md:flex-row md:items-center md:gap-2 md:p-0",
            )}
          >
            <Suspense fallback={<Skeleton className="h-7 w-7" />}>
              <Cart type="desktop" />
            </Suspense>

            <span className="text-base font-semibold">Cart</span>
          </Link>
        </div>
      </div>

      <div className="container w-[450px] md:hidden">
        <SearchBar />
      </div>

      <DesktopNavigationMenu categories={categories} />
    </header>
  );
};

export default Header;
