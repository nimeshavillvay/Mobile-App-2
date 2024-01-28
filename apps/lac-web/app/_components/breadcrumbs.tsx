import VisuallyHidden from "@/_components/visually-hidden";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";

type BreadcrumbsProps = {
  links: { href: string; label: string }[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <nav className="bg-brand-light-gray">
      <ul className="max-w-desktop mx-auto flex flex-row items-center">
        <li className="flex flex-row items-center after:mx-2 after:content-['/']">
          <Link href="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <MdOutlineHome />
          </Link>
        </li>

        {links.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "flex flex-row items-center",
                index !== links.length - 1 && "after:mx-2 after:content-['/']",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
