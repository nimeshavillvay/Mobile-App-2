import SearchBar from "@/old/_components/search-bar";
import Separator from "@/old/_components/separator";
import VisuallyHidden from "@/old/_components/visually-hidden";
import WurthLogo from "@/old/_components/wurth-logo";
import { api } from "@/old/_lib/api";
import { DEFAULT_REVALIDATE } from "@/old/_lib/constants";
import type { Category } from "@/old/_lib/types";
import Link from "next/link";
import CategoriesDropdown from "./categories-dropdown";
import NavBar from "./nav-bar";
import ShippingDetails from "./shipping-details";
import ShoppingCart from "./shopping-cart";
import UserActions from "./user-actions";

const Header = async () => {
  const categories = await api
    .get("pim/webservice/rest/getcategorylist", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<Category[]>();

  return (
    <header className="old-design-text-base">
      <div className="bg-brand-gray-100">
        <div className="max-w-desktop mx-auto flex h-9 flex-row items-center justify-between text-sm leading-4 text-black">
          <nav className="flex flex-row items-center gap-4">
            <Link href="/" className="text-brand-primary font-bold">
              Wurth Louis and Company
            </Link>

            <Separator
              className="bg-brand-gray-200 h-5 w-px"
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
              className="bg-brand-gray-200 h-5 w-px"
              orientation="vertical"
            />

            <a
              href="mailto:websupport@wurthlac.com"
              className="hover:text-brand-primary"
            >
              Feedback
            </a>
          </nav>

          <UserActions />
        </div>
      </div>

      <div className="max-w-desktop mx-auto my-5 flex flex-row items-center gap-12">
        <Link href="/">
          <VisuallyHidden>Wurth</VisuallyHidden>

          <WurthLogo width={192} height={41} />
        </Link>

        <SearchBar className="border-brand-primary/50 ring-brand-primary/15 flex-1 ring-[3px]" />

        <ShoppingCart />
      </div>

      <div className="bg-brand-primary">
        <div className="max-w-desktop mx-auto flex h-[50px] flex-row items-center gap-[15px]">
          <CategoriesDropdown categories={categories} />

          <NavBar />
        </div>
      </div>

      <ShippingDetails />

      {/* Render links of the main categories for the crawler to index, but hidden from the user */}
      <nav className="hidden">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <a href={`/category/${category.id}/${category.slug}`}>
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;