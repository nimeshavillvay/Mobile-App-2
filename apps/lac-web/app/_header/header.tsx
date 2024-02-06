import Separator from "@/_components/separator";
import VisuallyHidden from "@/_components/visually-hidden";
import WurthLogo from "@/_components/wurth-logo";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import type { Category } from "@/_lib/types";
import Link from "next/link";
import CategoriesDropdown from "./categories-dropdown";
import NavBar from "./nav-bar";
import Search from "./search";
import ShoppingCart from "./shopping-cart";
import UserActions from "./user-actions";

const Header = async () => {
  const categories = await api
    .get("pim/webservice/rest/getcategorylist", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<Category[]>();

  return (
    <header>
      <div className="bg-brand-very-light-gray">
        <div className="max-w-desktop mx-auto flex h-9 flex-row items-center justify-between text-sm leading-4 text-black">
          <nav className="flex flex-row items-center gap-4">
            <Link href="/" className="text-brand-primary font-bold">
              Wurth Louis and Company
            </Link>

            <Separator
              className="bg-brand-light-gray h-5 w-px"
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
              className="bg-brand-light-gray h-5 w-px"
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

      <div className="max-w-desktop mx-auto flex flex-row items-center gap-12 py-5">
        <Link href="/">
          <VisuallyHidden>Wurth</VisuallyHidden>

          <WurthLogo width={192} height={41} />
        </Link>

        <Search />

        <ShoppingCart />
      </div>

      <div className="bg-brand-primary">
        <div className="max-w-desktop mx-auto flex h-[50px] flex-row items-center gap-[15px]">
          <CategoriesDropdown categories={categories} />

          <NavBar />
        </div>
      </div>

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
