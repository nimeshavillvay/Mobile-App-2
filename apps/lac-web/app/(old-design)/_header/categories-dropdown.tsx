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
        <button className="font-wurth flex h-full flex-row items-center gap-2.5 bg-black px-7 align-middle text-lg font-medium leading-6 text-white">
          <MdOutlineMenu className="text-2xl leading-none" />
          <span>Shop By Category</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="flex flex-col bg-white">
          {categories.map((category) => (
            <DropdownMenu.Sub key={category.id}>
              <DropdownMenu.SubTrigger
                className="data-[state=open]:text-brand-primary hover:text-brand-primary p-2.5"
                asChild
              >
                <DropdownMenu.Item key={category.id} asChild>
                  <Link href={`/category/${category.id}/${category.slug}`}>
                    {category.name}
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.SubTrigger>

              <DropdownMenu.SubContent className="flex flex-col bg-white">
                {category.subcategory.map((subCategory) =>
                  subCategory.subsubcategory?.length ? (
                    <DropdownMenu.Sub key={subCategory.subid}>
                      <DropdownMenu.SubTrigger
                        className="data-[state=open]:text-brand-primary hover:text-brand-primary p-2.5"
                        asChild
                      >
                        <DropdownMenu.Item asChild>
                          <Link
                            href={`/category/${subCategory.subid}/${subCategory.slug}`}
                          >
                            {subCategory.name}
                          </Link>
                        </DropdownMenu.Item>
                      </DropdownMenu.SubTrigger>

                      <DropdownMenu.SubContent className="flex flex-col bg-white">
                        {subCategory.subsubcategory.map((subSubCategory) => (
                          <DropdownMenu.Item
                            key={subSubCategory.subsubid}
                            className="hover:text-brand-primary p-2.5"
                            asChild
                          >
                            <Link
                              href={`/category/${subSubCategory.subsubid}/${subSubCategory.slug}`}
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
                      className="hover:text-brand-primary p-2.5"
                      asChild
                    >
                      <Link
                        href={`/category/${subCategory.subid}/${subCategory.slug}`}
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
