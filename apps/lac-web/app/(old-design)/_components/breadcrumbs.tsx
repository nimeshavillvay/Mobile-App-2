import VisuallyHidden from "@/old/_components/visually-hidden";
import { cn } from "@/old/_utils/helpers";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";

type BreadcrumbsProps = {
  links: { href: string; label: string }[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <nav className="hidden bg-brand-gray-200 xs:block">
      <ul
        className={cn(
          "container flex flex-row items-center py-3 text-[#333333]",
          "[&>li:not(:last-child)]:after:mx-1.5 [&>li:not(:last-child)]:after:content-['/']",
        )}
      >
        <li className="flex flex-row items-center">
          <Link href="/" className="text-xl leading-none text-black">
            <VisuallyHidden>Home</VisuallyHidden>
            <MdOutlineHome />
          </Link>
        </li>

        {links.map((link) => (
          <li
            key={link.href}
            className="flex min-w-0 flex-row items-center last:text-[#828282]"
          >
            <Link href={link.href} className="truncate">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
