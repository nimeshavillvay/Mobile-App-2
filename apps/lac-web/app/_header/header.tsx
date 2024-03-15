import Menu from "@repo/web-ui/components/icons/menu";
import Profile from "@repo/web-ui/components/icons/profile";
import ShoppingCart from "@repo/web-ui/components/icons/shopping-cart";
import WurthFullBlack from "@repo/web-ui/components/logos/wurth-full-black";
import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
} from "@repo/web-ui/components/search-box";
import { Button } from "@repo/web-ui/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-col gap-4 border-b border-b-wurth-gray-250 py-5 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05),0px_1px_2px_-1px_rgba(0,0,0,0.05)] @container/header">
      <div className="flex flex-row items-center gap-7 container w-full">
        <Button
          variant="ghost"
          size="icon"
          className="size-6 flex-shrink-0 xs:hidden"
        >
          <Menu />

          <span className="sr-only">Menu</span>
        </Button>

        <Link href="/" className="flex-shrink-0">
          <WurthFullBlack className="h-[24px] w-[114px] xs:h-[28px] xs:w-[133px]" />

          <span className="sr-only">Home</span>
        </Link>

        <SearchBox className="hidden mx-auto xs:flex max-w-[35rem] flex-1 min-w-0">
          <SearchBoxInput placeholder="What are you looking for?" />

          <SearchBoxButton />
        </SearchBox>

        <div className="ml-auto flex flex-row items-center gap-4 xs:ml-0 xs:gap-6">
          {/* Mobile */}
          <Button variant="ghost" size="icon" className="size-6 xs:hidden">
            <Profile />

            <span className="sr-only">User Profile</span>
          </Button>

          <Button variant="ghost" size="icon" className="size-6 xs:hidden">
            <ShoppingCart />

            <span className="sr-only">Shopping Cart</span>
          </Button>

          {/* Desktop */}
          <Button
            variant="ghost"
            className="hidden shrink-0 xs:flex xs:h-min xs:flex-row xs:items-center xs:gap-2 xs:p-0"
          >
            <Profile className="size-7" />

            <span className="sr-only text-base font-semibold @3xl/header:not-sr-only">
              Sign in / Register
            </span>
          </Button>

          <Button
            variant="ghost"
            className="hidden shrink-0 xs:flex xs:h-min xs:flex-row xs:items-center xs:gap-2 xs:p-0"
          >
            <ShoppingCart className="size-7" />

            <span className="sr-only text-base font-semibold @3xl/header:not-sr-only">
              Cart
            </span>
          </Button>
        </div>
      </div>

      <div className="container xs:hidden w-full">
        <SearchBox>
          <SearchBoxInput placeholder="What are you looking for?" />

          <SearchBoxButton />
        </SearchBox>
      </div>
    </header>
  );
};

export default Header;
