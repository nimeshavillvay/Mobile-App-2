import { useCombobox } from "downshift";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";
import { Close } from "~/components/icons/close";
import { MagnifyingGlass } from "~/components/icons/magnifying-glass";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type SearchData = {
  summary: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
  };
  results: {
    id: string;
    categoryName?: string;
    categoryPath?: string;
    parentCategoryList?: string;
    subCategoryList?: string;
    slug: string;
    brandName?: string;
    brandImage?: string;
    lastUpdatedDate?: string | null;
    MFRPartNo?: string;
    sellingBookSequenceNo?: string;
    UPCCode?: string;
    alias?: string;
    materialNumber?: string;
    productTitle?: string;
    Status?: string;
    productStatus?: string;
    createDate?: string;
    keywords?: string;
    minimumOrderQuantity?: string;
    orderQuantityByIncrements?: string;
    attributes?: [];
    itemImage?: string;
    uom?: string;
  }[];
};

export const SearchBox = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center rounded-full border border-wurth-gray-250",
        className,
      )}
      {...delegated}
    />
  );
};

export const SearchBoxInput = ({
  className,
  data,
  value,
  setValue,
  onEnterPressed,
  ...delegated
}: ComponentProps<"input"> & {
  data: {
    products: SearchData;
    categories: SearchData;
    brands: SearchData;
  };
  value: string;
  setValue: (value: string) => void;
  onEnterPressed: () => void;
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnterPressed();
      closeMenu();
    }
  };

  const { products, categories, brands } = data;
  const { isOpen, getMenuProps, getInputProps, getItemProps, closeMenu } =
    useCombobox({
      inputValue: value,
      onInputValueChange: ({ inputValue }) => {
        setValue(inputValue);
      },
      items: [
        ...brands.results,
        ...categories.results,
        ...products.results,
      ].map((item) => item),
      itemToString(
        item: {
          id: string;
          categoryName?: string;
          categoryPath?: string;
          parentCategoryList?: string;
          subCategoryList?: string;
          slug: string;
          brandName?: string;
          productTitle?: string;
          itemImage?: string;
        } | null,
      ): string {
        if (!item) return "";

        if (item.productTitle && item.brandName && item.categoryPath) {
          return item.productTitle;
        } else if (item.brandName && !item.productTitle && !item.categoryPath) {
          return item.brandName;
        } else if (item.categoryName && !item.brandName && !item.productTitle) {
          return item.categoryName;
        }

        return "";
      },
    });

  return (
    <div className="relative w-full rounded-md">
      <input
        className={cn(
          "placeholder-text-wurth-gray-400 w-full min-w-0 flex-1 shrink rounded-l-full border-0 py-2.5 pl-3.5 text-sm",
          className,
        )}
        {...delegated}
        {...getInputProps()}
        onKeyDown={handleKeyDown}
      />
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } shadow-right shadow-bottom shadow-left absolute z-50 mt-4 rounded-b-lg bg-white p-0 pl-4 text-sm shadow-sm`}
        {...getMenuProps()}
      >
        {isOpen && value && (
          <>
            {brands.summary.total > 0 && (
              <>
                <li className="text-black-500 break-all px-3 py-1 font-semibold">
                  Brands for &quot;{value}&quot;
                </li>
                <ul className="flex flex-wrap">
                  {brands.results.map((brand, index) => (
                    <li
                      key={brand.id}
                      {...getItemProps({
                        item: brand,
                        index,
                      })}
                      className="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/3 3xl:w-1/3"
                    >
                      <Link
                        href={`/search?query=${brand.slug}`}
                        key={brand.id}
                        className="m-2 mb-2 mr-2 flex items-center rounded-md border-2 p-2 shadow-sm hover:bg-gray-100"
                      >
                        {brand.brandImage && brand.brandName && (
                          <Image
                            src={brand.brandImage}
                            alt={brand.brandName}
                            className="mr-2 min-h-10 min-w-10 object-contain"
                            width={40}
                            height={40}
                          />
                        )}
                        {!brand.brandImage && (
                          <div className="h-10 w-10 rounded-full"></div>
                        )}
                        <span className="break-all">{brand.brandName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {categories.summary.total > 0 && (
              <ul>
                <li className="text-black-500 break-all px-3 py-1 font-semibold">
                  Categories for &quot;{value}&quot;
                </li>
                {categories.results.map((category, index) => (
                  <li
                    className="p-2 pl-8  hover:bg-gray-100 "
                    key={category.id}
                    {...getItemProps({
                      item: category,
                      index: index + brands.results.length,
                    })}
                  >
                    <Link
                      href={`/category/${category.id}/${category.slug}`}
                      key={category.id}
                    >
                      <span className="text-[#74767B]">&#8627;</span>{" "}
                      <span className="break-words font-semibold text-[#CC0000]">
                        {category.categoryPath}
                      </span>
                    </Link>
                  </li>
                ))}
                <br />
              </ul>
            )}

            {products.summary.total > 0 && (
              <>
                <li className="text-black-500 whitespace-normal break-all px-3 py-1 font-semibold">
                  Products for &quot;{value}&quot;
                </li>
                <ul className="grid grid-cols-1 gap-4 break-words md:grid-cols-1 lg:grid-cols-2">
                  {products.results.slice(0, 10).map((product, index) => (
                    <li
                      key={product.id}
                      {...getItemProps({
                        item: product,
                        index:
                          index +
                          categories.results.length +
                          brands.results.length,
                      })}
                    >
                      <Link
                        className="flex items-start justify-start gap-4 px-3 py-2"
                        href={`/product/${product.id}/${product.slug}`}
                        key={product.id}
                      >
                        <div className="flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                          {product.itemImage && product.productTitle && (
                            <Image
                              src={product.itemImage}
                              alt={product.productTitle}
                              className="object-cover"
                              width={80}
                              height={80}
                            />
                          )}
                          {!product.itemImage && (
                            <div className="h-20 w-20 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-normal hover:underline">
                            <p className="break-all">{product.productTitle}</p>
                          </div>{" "}
                          <div className="break-all text-[#74767B]">
                            Item# {product.materialNumber}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export const SearchBoxButton = ({
  type = "submit",
  className,
  ...delegated
}: Omit<ComponentProps<"button">, "children">) => {
  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      className={cn("mx-0.5 rounded-full px-2", className)}
      {...delegated}
    >
      <MagnifyingGlass className="size-5" />
    </Button>
  );
};

export const SearchClearButton = ({
  type = "button",
  className,
  ...delegated
}: Omit<ComponentProps<"button">, "children">) => {
  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      className={cn("mx-0.5 rounded-full px-2", className)}
      {...delegated}
    >
      <Close className="size-5" />
      <span className="sr-only">Clear search</span>
    </Button>
  );
};
