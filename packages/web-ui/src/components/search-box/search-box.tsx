import { MagnifyingGlass } from "@/components/icons/magnifying-glass";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCombobox } from "downshift";
import Image from "next/image";
import { type ComponentProps } from "react";

type SearchData = {
  meta: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
  };
  results: SearchResult[];
};

type SearchResult = {
  id: string;
  title: string;
  img: string;
  code: string;
  description: string;
};

export const SearchBox = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div className={cn("ui-relative ui-flex", className)} {...delegated} />
  );
};

export const SearchBoxInput = ({
  className,
  data,
  value,
  setValue,
  ...delegated
}: ComponentProps<"input"> & {
  data: {
    products: SearchData;
    categories: SearchData;
    brands: SearchData;
  };
  value: string;
  setValue: (value: string) => void;
}) => {
  const { products, categories, brands } = data;
  const { isOpen, getMenuProps, getInputProps, getItemProps } = useCombobox({
    onInputValueChange({ inputValue }) {
      setValue(inputValue);
    },

    items: [...products.results, ...categories.results, ...brands.results],
    itemToString(item) {
      return item ? item.title : "";
    },
  });

  return (
    <div className="ui-relative ui-rounded-md">
      <div className="ui-flex ui-w-72 ui-flex-col ui-gap-1">
        <div className="flex shadow-sm bg-white gap-0.5">
          <input
            className={cn(
              "ui-w-full ui-min-w-0 ui-flex-1 ui-shrink ui-rounded-l-full ui-border-0 ui-py-2.5 ui-pl-3.5 ui-text-sm placeholder:ui-text-wurth-gray-400",
              className,
            )}
            {...delegated}
            {...getInputProps()}
          />
        </div>
      </div>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } absolute w-72 bg-white mt-4 shadow-sm max-h-80 overflow-y-auto p-0 z-10 rounded-md`}
        {...getMenuProps()}
      >
        {isOpen && value && (
          <>
            {categories.results.length > 0 && (
              <>
                <li className="ui-text-black-500 ui-px-3 ui-py-1 ui-font-semibold">
                  Categories for &quot;{value}&quot;
                </li>
                <br />
                {categories.results.map((category, index) => (
                  <li
                    className={cn("py-2 px-3 shadow-sm flex flex-col")}
                    key={category.id}
                    {...getItemProps({ item: category, index })}
                  >
                    <span className="bg-red-100">
                      <span className="ui-text-gray-500">&#8627;</span>{" "}
                      <b className="ui-text-red-500">{category.title}</b>
                    </span>
                  </li>
                ))}
                <br />
              </>
            )}
            {brands.results.length > 0 && (
              <>
                <li className="ui-text-black-500 ui-px-3 ui-py-1 ui-font-semibold">
                  Brands for &quot;{value}&quot;
                </li>
                <br />
                <li className="ui-flex ui-flex-row ui-flex-wrap">
                  {brands.results.map((brand, index) => (
                    <div
                      key={brand.id}
                      className={cn(
                        "ui-mb-2 ui-mr-2 ui-flex ui-items-center ui-rounded-md ui-p-2",

                        "ui-m-2 ui-rounded-lg ui-border-2 ui-p-4 ui-shadow-sm",
                      )}
                      {...getItemProps({ item: brand, index })}
                    >
                      <Image
                        src={brand.img}
                        alt={brand.title}
                        className="ui-mr-2 ui-h-10 ui-w-10"
                        width={40}
                        height={40}
                      />
                      <span className="ui-flex-grow">{brand.title}</span>
                    </div>
                  ))}
                </li>
                <br />
              </>
            )}
            {products.results.length > 0 && (
              <>
                <li className="ui-text-black-500 ui-px-3 ui-py-1 ui-font-semibold">
                  Products for &quot;{value}&quot;
                </li>
                <br />
                <div className="ui-flex">
                  <div className="ui-w-1/2">
                    {products.results.slice(0, 5).map((product, index) => (
                      <li
                        className={cn("ui-flex ui-px-3 ui-py-2")}
                        key={product.id}
                        {...getItemProps({ item: product, index })}
                      >
                        <div className="ui-flex">
                          <Image
                            src={product.img}
                            alt={product.title}
                            className="ui-mr-2 ui-h-20 ui-w-20  ui-border ui-border-gray-300"
                            width={80}
                            height={80}
                            priority={true}
                          />
                          <div className="ui-flex ui-flex-col ui-justify-between">
                            <span>{product.title}</span>
                            <span className="ui-text-gray-500">
                              Item# {product.code}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                  <div className="ui-w-1/2">
                    {products.results.slice(5).map((product, index) => (
                      <li
                        className={cn("ui-flex ui-px-3 ui-py-2")}
                        key={product.id}
                        {...getItemProps({ item: product, index: index + 5 })}
                      >
                        <div className="ui-flex">
                          <Image
                            src={product.img}
                            alt={product.title}
                            className="ui-mr-2 ui-h-20 ui-w-20  ui-border ui-border-gray-300"
                            width={80}
                            height={80}
                          />
                          <div className="ui-flex ui-flex-col ui-justify-between">
                            <span>{product.title}</span>
                            <span className="ui-text-gray-500">
                              Item# {product.code}
                            </span>
                          </div>
                        </div>
                      </li>
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
      className={cn("ui-mx-0.5 ui-rounded-full ui-px-2", className)}
      {...delegated}
    >
      <MagnifyingGlass className="ui-size-5" />
    </Button>
  );
};
