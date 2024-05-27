"use client";

import useLogoutMutation from "@/_hooks/user/use-logout-mutation.hook";
import useOSRLogoutMutation from "@/_hooks/user/use-osr-logout-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/old/_components/ui/accordion";
import { cn } from "@/old/_utils/helpers";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cva } from "cva";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import FavoritesFilters from "./favorites-filters";
import PurchasesFilters from "./purchases-filters";

const menuItem = cva({
  base: "block border-b border-brand-gray-200 py-2.5 font-bold text-black first:border-t",
  variants: {
    status: {
      active: "text-brand-primary",
      inactive: "hover:text-brand-primary",
    },
  },
});

const LINKS = [
  {
    href: "/myaccount/manage-users",
    name: "Manage Users",
  },
  {
    href: "/myaccount/orderhistory",
    name: "My Orders",
  },
];

const SideMenu = ({ token }: { readonly token: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isOsr =
    checkLoginQuery.data.status_code === "OK" &&
    !!checkLoginQuery.data.sales_rep_id;

  const osrLogoutMutation = useOSRLogoutMutation();
  const logoutMutation = useLogoutMutation();

  return (
    <div>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            menuItem({
              status: link.href === pathname ? "active" : "inactive",
            }),
          )}
        >
          {link.name}
        </Link>
      ))}

      <Accordion
        type="single"
        value={pathname}
        onValueChange={(value) => router.push(value)}
      >
        <AccordionItem
          value="/myaccount/purchaseditems"
          className="first:border-t-0"
        >
          <AccordionTrigger className="font-bold text-black hover:no-underline data-[state=open]:text-brand-primary">
            My Purchased Items
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <Suspense fallback={<Skeleton className="mb-4 h-32" />}>
              <PurchasesFilters token={token} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="/myaccount/shopping-lists">
          <AccordionTrigger className="font-bold text-black hover:no-underline data-[state=open]:text-brand-primary">
            My Shopping Lists
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <Suspense fallback={<Skeleton className="mb-4 h-32" />}>
              <FavoritesFilters token={token} />
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        onClick={() => {
          if (isOsr) {
            osrLogoutMutation.mutate();
          } else {
            logoutMutation.mutate();
          }
        }}
        className={cn(menuItem({ status: "inactive" }), "w-full text-left")}
      >
        Logout
      </button>
    </div>
  );
};

export default SideMenu;
