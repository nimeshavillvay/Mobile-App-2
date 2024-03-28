"use client";

import type { Category } from "@/old/_lib/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";

type CategoriesDropdownProps = {
  categories: Category[];
};

const CategoriesDropdown = ({ categories }: CategoriesDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-full flex-row items-center gap-2.5 bg-black px-7 align-middle font-wurth text-lg font-medium leading-6 text-white">
          <MdOutlineMenu className="text-2xl leading-none" />
          <span>Shop By Category</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="flex flex-col bg-white">
          {categories.map((category) => (
            <DropdownMenu.Sub key={category.id}>
              <DropdownMenu.SubTrigger
                className="p-2.5 hover:text-brand-primary data-[state=open]:text-brand-primary"
                asChild
              >
                <DropdownMenu.Item key={category.id} asChild>
                  <Link href={`/old/category/${category.id}/${category.slug}`}>
                    {category.name}
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.SubTrigger>

              <DropdownMenu.SubContent className="flex flex-col bg-white">
                {category.subcategory.map((subCategory) =>
                  subCategory.subsubcategory?.length ? (
                    <DropdownMenu.Sub key={subCategory.subid}>
                      <DropdownMenu.SubTrigger
                        className="p-2.5 hover:text-brand-primary data-[state=open]:text-brand-primary"
                        asChild
                      >
                        <DropdownMenu.Item asChild>
                          <Link
                            href={`/old/category/${subCategory.subid}/${subCategory.slug}`}
                          >
                            {subCategory.name}
                          </Link>
                        </DropdownMenu.Item>
                      </DropdownMenu.SubTrigger>

                      <DropdownMenu.SubContent className="flex flex-col bg-white">
                        {subCategory.subsubcategory.map((subSubCategory) => (
                          <DropdownMenu.Item
                            key={subSubCategory.subsubid}
                            className="p-2.5 hover:text-brand-primary"
                            asChild
                          >
                            <Link
                              href={`/old/category/${subSubCategory.subsubid}/${subSubCategory.slug}`}
                            >
                              {subSubCategory.subsubname}
                            </Link>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  ) : (
                    <DropdownMenu.Item
                      key={subCategory.subid}
                      className="p-2.5 hover:text-brand-primary"
                      asChild
                    >
                      <Link
                        href={`/old/category/${subCategory.subid}/${subCategory.slug}`}
                      >
                        {subCategory.name}
                      </Link>
                    </DropdownMenu.Item>
                  ),
                )}
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default CategoriesDropdown;
