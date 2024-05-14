import { useCombobox } from "downshift";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";
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
      onInputValueChange: ({ inputValue }) => {
        setValue(inputValue);
      },
      items: [
        ...categories.results,
        ...brands.results,
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
        } dropdown-container shadow-right shadow-bottom shadow-left le absolute z-50 mt-4  w-full rounded-b-lg bg-white p-0 pl-4 text-sm shadow-sm`}
        {...getMenuProps()}
      >
        {isOpen && value && (
          <>
            {brands.summary.total > 0 && (
              <>
                <li className="text-black-500 px-3 py-1 font-semibold">
                  Brands for &quot;{value}&quot;
                </li>
                <li className="flex flex-wrap">
                  {brands.results.map((brand, index) => (
                    <Link href={`/search?query=${brand.slug}`} key={brand.id}>
                      <li
                        key={brand.id}
                        className={cn(
                          "mb-2 mr-2 flex items-center rounded-md p-2",
                          "m-2 rounded-lg border-2 p-4 shadow-sm",
                          "hover:bg-gray-100",
                          "w-1/2 sm:w-auto", 
                        )}
                        {...getItemProps({
                          item: brand,
                          index: index + categories.results.length,
                        })}
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
                        <span className="flex-grow truncate break-all text-center">
                          {brand.brandName}
                        </span>
                      </li>
                    </Link>
                  ))}
                </li>
                <br />
              </>
            )}
            {categories.summary.total > 0 && (
              <>
                <li className="text-black-500 px-3 py-1 font-semibold">
                  Categories for &quot;{value}&quot;
                </li>
                {categories.results.map((category, index) => (
                  <li
                    className="p-2 pl-8 hover:bg-gray-100"
                    key={category.id}
                    {...getItemProps({ item: category, index })}
                  >
                    <Link
                      href={`/category/${category.id}/${category.slug}`}
                      key={category.id}
                    >
                      <span className="text-[#74767B]">&#8627;</span>{" "}
                      <b className="text-[#CC0000]">{category.categoryPath}</b>
                      <br />
                    </Link>
                  </li>
                ))}
                <br />
              </>
            )}

            {products.summary.total > 0 && (
              <div>
                <li className="text-black-500 whitespace-normal px-3 py-1 font-semibold">
                  Products for &quot;{value}&quot;
                </li>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {products.results.slice(0, 10).map((product, index) => (
                    <Link
                      href={`/product/${product.id}/${product.slug}`}
                      key={product.id}
                      className="mx-h-[120px] mx-w-[338px] block"
                    >
                      <div className="mx-h-[120px] mx-w-[338px]">
                        <li
                          className="flex items-start justify-start space-x-4 px-3 py-2"
                          key={product.id}
                          {...getItemProps({
                            item: product,
                            index:
                              index +
                              categories.results.length +
                              brands.results.length,
                          })}
                        >
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                            {product.itemImage && product.productTitle && (
                              <Image
                                src={product.itemImage}
                                alt={product.productTitle}
                                className="h-full w-full object-cover"
                                layout="responsive"
                                width={80}
                                height={80}
                              />
                            )}
                            {!product.itemImage && (
                              <div className="h-10 w-10 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex flex-col justify-start">
                            <span className="overflow-hidden overflow-ellipsis hover:underline">
                              {product.productTitle}
                            </span>{" "}
                            <span className="text-[#74767B]">
                              Item# {product.materialNumber}
                            </span>
                          </div>
                        </li>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
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
