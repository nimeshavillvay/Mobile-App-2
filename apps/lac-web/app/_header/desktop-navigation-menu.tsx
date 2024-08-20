"use client";

import type { TransformedCategory } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuItemLink,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/web-ui/components/ui/navigation-menu";
import Link from "next/link";
import { useState, type ComponentProps } from "react";

type DesktopNavigationMenuProps = {
  readonly categories: TransformedCategory[];
};

const DesktopNavigationMenu = ({ categories }: DesktopNavigationMenuProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    () => categories[0]?.id ?? "",
  );
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  return (
    <div className="hidden bg-wurth-red-650 md:block">
      <div className="container">
        <NavigationMenu className="justify-start">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

              <NavigationMenuContent className="flex flex-row">
                {/* Main Categories */}
                <ul
                  className={cn(
                    "p-4",
                    selectedCategory?.subCategory?.length &&
                      "border-r border-r-slate-200",
                  )}
                >
                  {categories.map((category) => (
                    <li key={category.id} className="root-category">
                      <NavigationLink
                        id={category.id}
                        slug={category.slug}
                        name={category.name}
                        onMouseOver={() => setSelectedCategoryId(category.id)}
                        showArrow={!!category.subCategory?.length}
                      />
                    </li>
                  ))}
                </ul>

                {/* Sub Categories */}
                {!!selectedCategory &&
                  !!selectedCategory.subCategory?.length && (
                    <ul className="p-4">
                      <li className="btn-nav">
                        <NavigationLink
                          id={selectedCategory.id}
                          slug={selectedCategory.slug}
                          name={`Shop all ${selectedCategory.name}`}
                          primary
                        />
                      </li>

                      {selectedCategory.subCategory.map((subCategory) => (
                        <li key={subCategory.id} className="btn-nav">
                          <NavigationLink
                            id={subCategory.id}
                            slug={subCategory.slug}
                            name={subCategory.name}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItemLink asChild>
              <Link href="/cart#quick-order-form">Quick Order</Link>
            </NavigationMenuItemLink>

            <NavigationMenuItemLink asChild>
              <Link href="/catalogs-literature">Resources</Link>
            </NavigationMenuItemLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default DesktopNavigationMenu;

const NavigationLink = ({
  id,
  slug,
  name,
  primary = false,
  showArrow = false,
  onMouseOver,
}: {
  readonly id: number;
  readonly slug: string;
  readonly name: string;
  readonly primary?: boolean;
  readonly showArrow?: boolean;
  readonly onMouseOver?: ComponentProps<
    typeof NavigationMenuLink
  >["onMouseOver"];
}) => {
  return (
    <NavigationMenuLink
      asChild
      className={cn(
        "flex flex-row items-center justify-between gap-2 text-nowrap rounded px-2 py-1.5 text-sm hover:bg-wurth-gray-150 active:bg-wurth-gray-150",
        primary && "font-semibold text-wurth-red-650",
      )}
      onMouseOver={onMouseOver}
    >
      <Link href={`/category/${id}/${slug}`} className="btn-display-grid">
        <span>{name}</span>

        {showArrow && <ChevronRight className="size-4" />}
      </Link>
    </NavigationMenuLink>
  );
};
