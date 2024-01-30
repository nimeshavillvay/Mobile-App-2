import Separator from "@/_components/separator";
import { getCategories } from "@/_lib/shared-api";
import Link from "next/link";
import AccountSelectorDialog from "./account-selector-dialog";
import CategoriesDropdown from "./categories-dropdown";
import NavBar from "./nav-bar";
import UserActions from "./user-actions";

const Header = async () => {
  const categories = await getCategories();

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

      <div className="max-w-desktop mx-auto">Search Bar</div>

      <div className="bg-brand-primary">
        <div className="max-w-desktop mx-auto flex flex-row items-center gap-2">
          <CategoriesDropdown categories={categories} />

          <NavBar />
        </div>
      </div>

      <AccountSelectorDialog />
    </header>
  );
};

export default Header;
