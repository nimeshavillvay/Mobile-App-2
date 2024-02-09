"use client";

import Breadcrumbs from "@/_components/breadcrumbs";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, type ReactNode } from "react";

const NAV_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Compliance", href: "/compliance" },
];

type CompanyInformationLayoutProps = {
  children: ReactNode;
};

const CompanyInformationLayout = ({
  children,
}: CompanyInformationLayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <Breadcrumbs links={[]} />

      <section className="min-h-[1024px] py-8">
        {/* Navigation bar for company information pages */}
        <nav className="mb-6 flex text-lg font-bold uppercase">
          {NAV_LINKS.map((link) => (
            <Fragment key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 first:pl-0",
                  pathname === link?.href
                    ? "text-brand-primary  underline"
                    : "text-brand-gray-500 hover:text-brand-primary hover:underline",
                )}
              >
                {link.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        {children}
      </section>
    </>
  );
};

export default CompanyInformationLayout;
