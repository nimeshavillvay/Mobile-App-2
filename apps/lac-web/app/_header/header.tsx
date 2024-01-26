"use client";

import Separator from "@/_components/separator";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <Link href="/register" className="hover:text-brand-primary">
              Register
            </Link>

            <span>or</span>

            <button className="hover:text-brand-primary">Apply</button>

            <button className="bg-brand-primary text-white">Sign in</button>

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
    </header>
  );
};

export default Header;
