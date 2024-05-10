import { useCombobox } from "downshift";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { MagnifyingGlass } from "~/components/icons/magnifying-glass";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { BarcodeScan } from "../icons/barcode-scan";

type SearchData = {
  meta: {
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
    lastUpadtedDate?: string | null;
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
    orderQuantitybyIncrements?: string;
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
      items: [...categories.results, ...brands.results, ...products.results],
      itemToString(item) {
        if (item && item.productTitle && item.brandName && item.categoryPath) {
          return item.productTitle;
        } else if (
          item &&
          item.brandName &&
          !item.productTitle &&
          !item.categoryPath
        ) {
          return item.brandName;
        } else if (
          item &&
          item.categoryPath &&
          !item.brandName &&
          !item.productTitle
        ) {
          return item.categoryPath;
        }
      },
    });

  return (
    <div className="relative w-full rounded-md">
      <div className="flex  flex-col gap-1">
        <div>
          <input
            className={cn(
              "placeholder-text-wurth-gray-400 w-full min-w-0 flex-1 shrink rounded-l-full border-0 py-2.5 pl-3.5 text-sm",
              className,
            )}
            {...delegated}
            {...getInputProps()}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } shadow-right shadow-bottom shadow-left le absolute z-50 ml-3 mt-4 w-full rounded-b-lg bg-white p-0 pl-4 shadow-sm`}
        {...getMenuProps()}
      >
        {isOpen && value && (
          <>
            {categories.results.length > 0 && (
              <>
                <li className="text-black-500 px-3 py-1 font-semibold ">
                  Categories for &quot;{value}&quot;
                </li>
                {categories.results.map((category, index) => (
                  <Link
                    href={`/category/${category.id}/${category.slug}`}
                    key={category.id}
                  >
                    <li
                      className="p-2 pl-8"
                      key={category.id}
                      {...getItemProps({ item: category, index })}
                    >
                      <span>
                        <span className="text-gray-500">&#8627;</span>{" "}
                        <b className="text-red-500">{category.categoryPath}</b>
                        <br />
                      </span>
                    </li>
                  </Link>
                ))}
                <br />
              </>
            )}
            {brands.results.length > 0 && (
              <>
                <li className="text-black-500 px-3 py-1 font-semibold">
                  Brands for &quot;{value}&quot;
                </li>
                <li className="flex flex-row flex-wrap ">
                  {brands.results.map((brand, index) => (
                    <Link href={`/search?query=${brand.slug}`} key={brand.id}>
                      <div
                        key={brand.id}
                        className={cn(
                          "mb-2 mr-2 flex items-center rounded-md p-2 ",
                          "m-2 rounded-lg border-2 p-4 shadow-sm",
                        )}
                        {...getItemProps({
                          item: brand,
                          index: index + categories.results.length,
                        })}
                      >
                        <Image
                          src={brand.brandImage}
                          alt={brand.brandName}
                          className="mr-2 min-h-10 min-w-10 object-contain"
                          width={40}
                          height={40}
                        />
                        <span className="flex-grow truncate break-all text-center">
                          {brand.brandName}
                        </span>
                      </div>
                    </Link>
                  ))}
                </li>
                <br />
              </>
            )}
            {products.results.length > 0 && (
              <>
                <li className="text-black-500 px-3 py-1 font-semibold">
                  Products for &quot;{value}&quot;
                </li>
                <div className="flex">
                  <div className="w-1/2">
                    {products.results.slice(0, 5).map((product, index) => (
                      <Link
                        href={`/product/${product.id}/${product.slug}`}
                        key={product.id}
                      >
                        <li
                          className={cn("flex px-3 py-2")}
                          key={product.id}
                          {...getItemProps({
                            item: product,
                            index:
                              index +
                              categories.results.length +
                              brands.results.length,
                          })}
                        >
                          <div className="flex">
                            <Image
                              src={product.itemImage}
                              alt={product.productTitle}
                              className="mr-2 min-h-20 min-w-20 rounded-md border border-gray-300 object-contain"
                              width={80}
                              height={80}
                              priority={true}
                            />
                            <div className="flex flex-col justify-between">
                              <span>{product.productTitle}</span>
                              <span className="text-gray-500">
                                Item# {product.MFRPartNo}
                              </span>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </div>
                  <div className="w-1/2">
                    {products.results.slice(5, 10).map((product, index) => (
                      <Link
                        href={`/product/${product.id}/${product.slug}`}
                        key={product.id}
                      >
                        <li
                          className={cn("flex px-3 py-2")}
                          key={product.id}
                          {...getItemProps({
                            item: product,
                            index:
                              index +
                              categories.results.length +
                              brands.results.length +
                              5,
                          })}
                        >
                          <div className="flex">
                            <Image
                              src={product.itemImage}
                              alt={product.productTitle}
                              className="mr-2 min-h-20 min-w-20 rounded-md border border-gray-300 object-contain"
                              width={80}
                              height={80}
                            />
                            <div className="flex flex-col justify-between">
                              <span>{product.productTitle}</span>
                              <span className="text-gray-500">
                                Item# {product.MFRPartNo}
                              </span>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </div>
                </div>
                <br />
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

export const BarcodeScanButton = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, "children">
>(({ type = "submit", className, ...delegated }, ref) => {
  return (
    <Button
      ref={ref}
      type={type}
      variant="ghost"
      size="icon"
      className={cn("mx-0.5 rounded-full px-2", className)}
      {...delegated}
    >
      <BarcodeScan className="size-5" />

      <span className="sr-only">Scan barcode</span>
    </Button>
  );
});
BarcodeScanButton.displayName = "BarcodeScanButton";
