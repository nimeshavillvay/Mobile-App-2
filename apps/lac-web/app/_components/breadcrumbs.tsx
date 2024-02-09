import VisuallyHidden from "@/_components/visually-hidden";
import { cn } from "@/_utils/helpers";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";

type BreadcrumbsProps = {
  links: { href: string; label: string }[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <nav className="bg-brand-gray-200 full-bleed">
      <ul
        className={cn(
          "max-w-desktop mx-auto flex flex-row items-center py-3 text-[#333333]",
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
