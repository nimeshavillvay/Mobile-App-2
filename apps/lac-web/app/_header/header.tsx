import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { ShoppingCart } from "@repo/web-ui/components/icons/shopping-cart";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import UserProfile, { UserProfileSkeleton } from "./_user-profile";
import DesktopNavigationMenu from "./desktop-navigation-menu";
import MobileNavigationMenu from "./mobile-navigation-menu";
import SearchBar from "./search-bar";
import type { Category, TransformedCategory } from "./types";

const Header = async () => {
  const categories = await api
    .get("rest/getcategorylist/0", {
      searchParams: {
        membershipid: 1,
        level: 3,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Category[]>();

  const transformCategory = (category: Category): TransformedCategory => {
    const {
      id,
      name,
      slug,
      shortcode,
      item_count,
      direct_item_count,
      img,
      subcategory,
    } = category;

    const transformSubcategory = (data: Category): TransformedCategory => ({
      id: Number(data.id),
      name: data.name,
      slug: data.slug,
      shortCode: data.shortcode,
      itemCount: Number(data.item_count),
      directItemCount: Number(data.direct_item_count),
      image: data.img,
      subCategory: data.subcategory
        ? data.subcategory.map(transformSubcategory)
        : [],
    });

    return {
      id: Number(id),
      name,
      slug,
      shortCode: shortcode,
      itemCount: Number(item_count),
      directItemCount: Number(direct_item_count),
      image: img,
      subCategory: subcategory ? subcategory.map(transformSubcategory) : [],
    };
  };

  const transformedCategory = categories.map(transformCategory);

  return (
    <header className="flex flex-col gap-4 border-b border-b-wurth-gray-250 py-5 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.05),0px_1px_2px_-1px_rgba(0,0,0,0.05)] md:border-0 md:pb-0">
      <div className="container flex w-full flex-row items-center gap-7">
        <MobileNavigationMenu categories={transformedCategory} />

        <Link href="/" className="flex-shrink-0">
          <WurthFullBlack className="h-[24px] w-[114px] md:h-[28px] md:w-[133px]" />

          <span className="sr-only">Home</span>
        </Link>

        <div className="container relative w-[800px]">
          <SearchBar />
        </div>

        <div className="ml-auto flex flex-row items-center gap-4 md:ml-0 md:gap-6">
          {/* Mobile */}
          <Suspense fallback={<UserProfileSkeleton type="mobile" />}>
            <UserProfile type="mobile" />
          </Suspense>

          <Link
            href="/cart"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "size-6 md:hidden",
            )}
          >
            <ShoppingCart />

            <span className="sr-only">Cart</span>
          </Link>

          {/* Desktop */}
          <Suspense fallback={<UserProfileSkeleton type="desktop" />}>
            <UserProfile type="desktop" />
          </Suspense>

          <Link
            href="/cart"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden shrink-0 md:flex md:h-min md:flex-row md:items-center md:gap-2 md:p-0",
            )}
          >
            <ShoppingCart className="size-7" />

            <span className="text-base font-semibold">Cart</span>
          </Link>
        </div>
      </div>

      <div className="container w-full md:hidden">
        <SearchBar />
      </div>

      <DesktopNavigationMenu categories={transformedCategory} />
    </header>
  );
};

export default Header;
