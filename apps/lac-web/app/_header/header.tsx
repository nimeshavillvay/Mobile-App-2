import Separator from "@/_components/separator";
import { api } from "@/_lib/api";
import type { Category } from "@/_lib/types";
import Link from "next/link";
import CategoriesDropdown from "./categories-dropdown";
import NavBar from "./nav-bar";
import Search from "./search";
import ShoppingCart from "./shopping-cart";
import UserActions from "./user-actions";

const Header = async () => {
  const categories = await api
    .get("pim/webservice/rest/getcategorylist", { next: { revalidate: 3600 } })
    .json<Category[]>();

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

          <UserActions />
        </div>
      </div>

      <div className="max-w-desktop mx-auto flex flex-row items-center gap-4">
        <Link href="/" aria-label="Home page">
          Wurth logo
        </Link>

        <Search />

        <ShoppingCart />
      </div>

      <div className="bg-brand-primary">
        <div className="max-w-desktop mx-auto flex flex-row items-center gap-2">
          <CategoriesDropdown categories={categories} />

          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
