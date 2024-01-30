"use client";

import useAccountList from "@/_hooks/account/use-account-list.hook";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <nav>
      {NAV_LINKS.filter(
        (link) => !link.private || (!!accountListQuery.data && link.private),
      ).map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            "rounded p-2 font-bold",
            pathname === link.href
              ? "text-brand-primary bg-white"
              : "hover:text-brand-primary text-white hover:bg-white",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
