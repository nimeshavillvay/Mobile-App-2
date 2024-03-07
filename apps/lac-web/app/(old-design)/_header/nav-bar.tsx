"use client";

import Separator from "@/old/_components/separator";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import { cn } from "@/old/_utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    private: false,
  },
  {
    label: "Laminate Finder",
    href: "/laminate-finder",
    private: false,
  },
  {
    label: "My Orders",
    href: "/myaccount/orderhistory",
    private: true,
  },
  {
    label: "Purchased Items",
    href: "/myaccount/purchaseditems",
    private: true,
  },
  {
    label: "Favorites",
    href: "/myaccount/myfavorites",
    private: true,
  },
  {
    label: "User Management",
    href: "/myaccount/manage-users",
    private: true,
  },
];

const NavBar = () => {
  const pathname = usePathname();
  const accountListQuery = useAccountList();

  const visibleLinks = NAV_LINKS.filter(
    (link) => !link.private || (!!accountListQuery.data && link.private),
  );

  return (
    <nav className="flex flex-row items-center gap-[9px]">
      {visibleLinks.map((link, index) => (
        <Fragment key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "rounded-sm px-2.5 py-2 font-wurth text-base font-medium leading-none",
              pathname === link.href
                ? "bg-white text-brand-primary"
                : "text-white hover:bg-white hover:text-brand-primary",
            )}
          >
            {link.label}
          </Link>

          {index !== visibleLinks.length - 1 && (
            <Separator
              orientation="vertical"
              className="h-[23px] w-px bg-white"
            />
          )}
        </Fragment>
      ))}
    </nav>
  );
};

export default NavBar;
