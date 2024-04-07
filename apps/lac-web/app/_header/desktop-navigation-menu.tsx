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
import { Category } from "./types";

type DesktopNavigationMenuProps = {
  categories: Category[];
};

const DesktopNavigationMenu = ({ categories }: DesktopNavigationMenuProps) => {
  return (
    <NavigationMenu className="hidden md:flex max-w-full justify-start">
      <NavigationMenuList>
        <NavigationMenuItem value="categories">
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

          <NavigationMenuContent className="p-4 flex flex-col">
            {categories.map((category) => (
              <NavigationMenuLink
                key={category.id}
                asChild
                className="text-nowrap px-2 py-1.5 flex flex-row items-center justify-between gap-2 text-sm hover:bg-wurth-gray-150 active:bg-wurth-gray-150 rounded"
              >
                <Link href={`/category/${category.id}/${category.slug}`}>
                  <span>{category.name}</span>

                  <ChevronRight className="size-4" />
                </Link>
              </NavigationMenuLink>
            ))}
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
  );
};

export default DesktopNavigationMenu;
