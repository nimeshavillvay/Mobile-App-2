"use client";

import Separator from "@/_components/separator";
import useAccountList from "@/_hooks/account/use-account-list.hook";
import useAccountNo from "@/_hooks/account/use-account-no.hook";
import useAccountSelectorDialog from "@/_hooks/account/use-account-selector-dialog.hook";
import useAddressId from "@/_hooks/account/use-address-id.hook";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AccountSelectorDialog from "./account-selector-dialog";
import Login from "./login";
import UserDropdown from "./user-dropdown";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Laminate Finder",
    href: "/laminate-finder",
  },
];

const Header = () => {
  const pathname = usePathname();
  const accountListQuery = useAccountList();
  const [accountNo] = useAccountNo();
  const [addressId] = useAddressId();
  const setOpen = useAccountSelectorDialog((state) => state.setOpen);

  useEffect(() => {
    if (accountListQuery.data && (!accountNo || !addressId)) {
      setOpen(true);
    }
  }, [accountListQuery.data, accountNo, addressId, setOpen]);

  return (
    <header>
      <div className="bg-brand-very-light-gray">
        <div className="max-w-desktop mx-auto flex flex-row items-center justify-between">
          <nav className="flex flex-row items-center gap-2">
            <Link href="/" className="text-brand-primary">
              Wurth Louis and Company
            </Link>

            <Separator
              className="bg-brand-light-gray w-[2px] self-stretch"
              orientation="vertical"
            />

            <a
              href="https://www.wurthmachinery.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary"
            >
              Large Machinery Quote
            </a>

            <Separator
              className="bg-brand-light-gray w-[2px] self-stretch"
              orientation="vertical"
            />

            <a
              href="mailto:websupport@wurthlac.com"
              className="hover:text-brand-primary"
            >
              Feedback
            </a>
          </nav>

          <div className="flex flex-row items-center gap-2">
            {accountListQuery.data ? (
              <>
                <UserDropdown />

                <button className="bg-brand-primary text-white">
                  Quick Order
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="hover:text-brand-primary">
                  Register
                </Link>

                <span>or</span>

                <button className="hover:text-brand-primary">Apply</button>

                <Login />
              </>
            )}

            <button className="hover:text-brand-primary">En</button>
          </div>
        </div>
      </div>

      <div>Search Bar</div>

      <div className="bg-brand-primary">
        {NAV_LINKS.map((link) => (
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
      </div>

      <AccountSelectorDialog />
    </header>
  );
};

export default Header;
