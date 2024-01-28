"use client";

import useLogout from "@/_hooks/account/use-logout.hook";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import Filters from "./filters";

const SideMenu = () => {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <Accordion.Root type="single" value={pathname}>
      <AccordionLink href="/myaccount/manage-users" label="Manage Users" />

      <AccordionLink
        href="/myaccount/personal-navigation"
        label="Personal Navigation"
      />

      <AccordionLink href="/myaccount/orderhistory" label="My Orders" />

      <AccordionLink
        href="/myaccount/purchaseditems"
        label="My Purchased Items"
      >
        <Filters section="purchased-items" />
      </AccordionLink>

      <AccordionLink href="/myaccount/myfavorites" label="My Favorites">
        <Filters section="favorites" />
      </AccordionLink>

      <button onClick={logout}>Logout</button>
    </Accordion.Root>
  );
};

export default SideMenu;

const AccordionLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children?: ReactNode;
}) => {
  return (
    <Accordion.Item value={href}>
      <Accordion.Header>
        <Accordion.Trigger asChild>
          <Link
            href={href}
            className="data-[state=open]:text-brand-primary block"
          >
            {label}
          </Link>
        </Accordion.Trigger>
      </Accordion.Header>

      {!!children && <Accordion.Content>{children}</Accordion.Content>}
    </Accordion.Item>
  );
};
