"use client";

import { cn } from "@/_lib/utils";
import ArrowUpRight from "@repo/web-ui/components/icons/arrow-up-right";
import ChevronRight from "@repo/web-ui/components/icons/chevron-right";
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
import { Category } from "./types";

type DesktopNavigationMenuProps = {
  categories: Category[];
};

const DesktopNavigationMenu = ({ categories }: DesktopNavigationMenuProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    () => categories[0]?.id ?? "",
  );
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  return (
    <div className="bg-wurth-red-650">
      <NavigationMenu className="container hidden justify-start md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

            <NavigationMenuContent className="flex flex-row">
              <ul
                className={cn(
                  "p-4",
                  selectedCategory?.subcategory?.length &&
                    "border-r border-r-slate-200",
                )}
              >
                {categories.map((category) => (
                  <li key={category.id}>
                    <NavigationLink
                      id={category.id}
                      slug={category.slug}
                      name={category.name}
                      onMouseOver={() => setSelectedCategoryId(category.id)}
                    />
                  </li>
                ))}
              </ul>

              {!!selectedCategory && !!selectedCategory.subcategory?.length && (
                <ul className="p-4">
                  <li>
                    <NavigationMenuLink
                      asChild
                      className="block rounded px-2 py-1.5 text-sm font-semibold text-wurth-red-650 hover:bg-wurth-gray-150 active:bg-wurth-gray-150"
                    >
                      <Link
                        href={`/category/${selectedCategory.id}/${selectedCategory.slug}`}
                      >
                        Shop all {selectedCategory.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>

                  {selectedCategory.subcategory.map((subCategory) => (
                    <li key={subCategory.id}>
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

          <NavigationMenuItemLink
            href="https://www.wurthmachinery.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Wurth Machinery</span>
            <ArrowUpRight className="size-4 stroke-white" />
          </NavigationMenuItemLink>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigationMenu;

const NavigationLink = ({
  id,
  slug,
  name,
  onMouseOver,
}: {
  id: string;
  slug: string;
  name: string;
  onMouseOver?: ComponentProps<typeof NavigationMenuLink>["onMouseOver"];
}) => {
  return (
    <NavigationMenuLink
      asChild
      className="flex flex-row items-center justify-between gap-2 text-nowrap rounded px-2 py-1.5 text-sm hover:bg-wurth-gray-150 active:bg-wurth-gray-150"
      onMouseOver={onMouseOver}
    >
      <Link href={`/category/${id}/${slug}`}>
        <span>{name}</span>

        <ChevronRight className="size-4" />
      </Link>
    </NavigationMenuLink>
  );
};
