"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";
import useLogout from "@/_hooks/account/use-logout.hook";
import { cn } from "@/_utils/helpers";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Filters from "./filters";

const menuItem = cva(
  "border-brand-gray-200 block border-b py-2.5 font-bold text-black first:border-t hover:underline",
  {
    variants: {
      status: {
        active: "text-brand-primary",
        inactive: "hover:text-brand-primary",
      },
    },
  },
);

const LINKS = [
  {
    href: "/myaccount/manage-users",
    name: "Manage Users",
  },
  {
    href: "/myaccount/personal-navigation",
    name: "Personal Navigation",
  },
  {
    href: "/myaccount/orderhistory",
    name: "My Orders",
  },
];

const SideMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useLogout();

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
          <AccordionTrigger className="data-[state=open]:text-brand-primary text-black">
            My Purchased Items
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <Filters section="purchased-items" />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="/myaccount/myfavorites">
          <AccordionTrigger className="data-[state=open]:text-brand-primary text-black">
            My Favorites
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <Filters section="favorites" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        onClick={logout}
        className={cn(menuItem({ status: "inactive" }), "w-full text-left")}
      >
        Logout
      </button>
    </div>
  );
};

export default SideMenu;
