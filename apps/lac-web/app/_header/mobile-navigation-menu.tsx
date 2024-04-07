import { cva } from "@/_lib/cva.config";
import ArrowUpRight from "@repo/web-ui/components/icons/arrow-up-right";
import ChevronRight from "@repo/web-ui/components/icons/chevron-right";
import Menu from "@repo/web-ui/components/icons/menu";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/web-ui/components/ui/sheet";
import Link from "next/link";
import type { Category } from "./types";

const sectionHeadingStyles = cva({
  base: "pt-5 pr-2 pb-2 pl-4 bg-wurth-gray-50 text-wurth-gray-800 text-sm font-semibold",
});
const sectionLinkStyles = cva({
  base: "flex flex-row justify-between items-center gap-2 px-4 py-3 text-base text-black font-normal",
});
const dividerStyles = cva({
  base: "divide-y divide-wurth-gray-250",
});

type MobileNavigationMenuProps = {
  categories: Category[];
};

const MobileNavigationMenu = ({ categories }: MobileNavigationMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 flex-shrink-0 md:hidden"
        >
          <Menu />

          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80">
        <SheetHeader className="text-left">
          <SheetTitle>Explore</SheetTitle>

          <SheetDescription className="sr-only">
            View all categories here.
          </SheetDescription>
        </SheetHeader>

        <div className={dividerStyles()}>
          <section className={dividerStyles()}>
            <h3 className={sectionHeadingStyles()}>All Categories</h3>

            <ul className={dividerStyles()}>
              {categories.map((category) => (
                <li key={category.id}>
                  <SheetClose asChild className={sectionLinkStyles()}>
                    <Link href={`/category/${category.id}/${category.slug}`}>
                      <span>{category.name}</span>

                      <ChevronRight className="size-5" />
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </section>

          <section className={dividerStyles()}>
            <h3 className={sectionHeadingStyles()}>
              <span className="invisible">Other Links</span>
            </h3>

            <ul className={dividerStyles()}>
              <li>
                <a
                  href="https://www.wurthmachinery.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sectionLinkStyles()}
                >
                  <span>Wurth Machinery</span>

                  <ArrowUpRight className="size-5" />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationMenu;
