"use client";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type CompanyNavigationProps = {
  links: Array<{ label: string; href: string }>;
};

const CompanyNavigation = ({ links }: CompanyNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex text-lg font-bold uppercase">
      {links.map((link) => (
        <Fragment key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "px-4 py-2 first:pl-0",
              pathname === link?.href
                ? "text-brand-primary underline"
                : "text-brand-gray-500 hover:text-brand-primary hover:underline",
            )}
          >
            {link.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};

export default CompanyNavigation;
