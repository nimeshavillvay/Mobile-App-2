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
    <div className="bg-wurth-red-650">
      <NavigationMenu className="container hidden justify-start md:flex">
        <NavigationMenuList>
          <NavigationMenuItem value="categories">
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

            <NavigationMenuContent className="flex flex-col p-4">
              {categories.map((category) => (
                <NavigationMenuLink
                  key={category.id}
                  asChild
                  className="flex flex-row items-center justify-between gap-2 text-nowrap rounded px-2 py-1.5 text-sm hover:bg-wurth-gray-150 active:bg-wurth-gray-150"
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
    </div>
  );
};

export default DesktopNavigationMenu;
