"use client";

import { cva } from "@/_lib/cva.config";
import { cn } from "@/_lib/utils";
import { ArrowLeft } from "@repo/web-ui/components/icons/arrow-left";
import { ArrowUpRight } from "@repo/web-ui/components/icons/arrow-up-right";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { Menu } from "@repo/web-ui/components/icons/menu";
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
import { useState } from "react";
import type { Category } from "./types";

const sectionHeadingStyles = cva({
  base: "pb-2 pl-4 pr-2 pt-5 text-sm font-semibold text-wurth-gray-800",
});
const sectionLinkStyles = cva({
  base: "flex flex-row items-center justify-between gap-2 bg-white px-4 py-3 text-base font-normal text-black",
});
const dividerStyles = cva({
  base: "divide-y divide-wurth-gray-250",
});

type MobileNavigationMenuProps = {
  categories: Category[];
};

const MobileNavigationMenu = ({ categories }: MobileNavigationMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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

      <SheetContent side="left" className="w-80 bg-wurth-gray-50">
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
                  {!!category.subcategory && category.subcategory.length > 0 ? (
                    <Sheet>
                      <SheetTrigger
                        asChild
                        className={cn(sectionLinkStyles(), "h-fit w-full")}
                      >
                        <Button variant="ghost">
                          <span>{category.name}</span>

                          <ChevronRight className="size-5" />
                        </Button>
                      </SheetTrigger>

                      <SheetContent
                        side="left"
                        className="w-80 bg-wurth-gray-50"
                      >
                        <SheetHeader className="text-left">
                          <SheetClose className="flex flex-row items-center gap-1">
                            <ArrowLeft className="size-4 stroke-white" />

                            <span className="text-sm font-medium text-white">
                              Back
                            </span>
                          </SheetClose>

                          <SheetTitle>{category.name}</SheetTitle>

                          <SheetDescription className="sr-only">
                            All subcategories of {category.name}.
                          </SheetDescription>
                        </SheetHeader>

                        <ul className={dividerStyles()}>
                          <li>
                            <SheetClose
                              asChild
                              className={cn(
                                sectionLinkStyles(),
                                "font-semibold",
                              )}
                              onClick={() => setOpen(false)}
                            >
                              <Link
                                href={`/category/${category.id}/${category.slug}`}
                              >
                                Shop all
                              </Link>
                            </SheetClose>
                          </li>

                          {category.subcategory.map((subcategory) => (
                            <li
                              key={subcategory.id}
                              className="last:!border-b last:!border-b-wurth-gray-250"
                            >
                              <SheetClose
                                asChild
                                className={sectionLinkStyles()}
                                onClick={() => setOpen(false)}
                              >
                                <Link
                                  href={`/category/${subcategory.id}/${subcategory.slug}`}
                                >
                                  <span>{subcategory.name}</span>

                                  <ChevronRight className="size-5" />
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </SheetContent>
                    </Sheet>
                  ) : (
                    <SheetClose asChild className={sectionLinkStyles()}>
                      <Link href={`/category/${category.id}/${category.slug}`}>
                        <span>{category.name}</span>

                        <ChevronRight className="size-5" />
                      </Link>
                    </SheetClose>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className={dividerStyles()}>
            <h3 className={sectionHeadingStyles()}>
              <span className="invisible">Other Links</span>
            </h3>

            <ul className={dividerStyles()}>
              <li className="border-b border-b-wurth-gray-250">
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
