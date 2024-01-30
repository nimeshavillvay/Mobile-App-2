"use client";

import type { Category } from "@/_lib/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

type CategoriesDropdownProps = {
  categories: Category[];
};

const CategoriesDropdown = ({ categories }: CategoriesDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="bg-black px-2 py-1 text-white">
          Shop By Category
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="flex flex-col bg-white">
          {categories.map((category) => (
            <DropdownMenu.Sub key={category.id}>
              <DropdownMenu.SubTrigger
                className="data-[state=open]:text-brand-primary hover:text-brand-primary p-[10px]"
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
                        className="data-[state=open]:text-brand-primary hover:text-brand-primary p-[10px]"
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
                            className="hover:text-brand-primary p-[10px]"
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
                      className="hover:text-brand-primary p-[10px]"
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
