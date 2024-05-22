"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { useEffect, useId, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import * as z from "zod";
import { AddToCart } from "~/components/icons/add-to-cart";
import useCustomDebounce from "./custom-debounce";
import ItemSelectorInput from "./item-selector-input";
import ProductDetails from "./product-details";
import { Product } from "./types";
import useSearch from "./use-search.hook";

const formSchema = z.object({
  cart: z
    .object({
      sku: z.string().min(1),
      quantity: z.number().int().positive(),
      jobName: z.string().optional(),
      isInvalid: z.boolean(),
      info: z
        .object({
          minQuantity: z.number().optional(),
          orderIncrementBy: z.number().optional(),
          title: z.string().optional(),
        })
        .optional(),
    })
    .array(),
});
type FormSchema = z.infer<typeof formSchema>;

const AddMoreItemsForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedIndex, setLastEditedIndex] = useState(0);
  const [searchResultProducts, setSearchResultProducts] = useState<Product[]>(
    [],
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const debouncedSearchInput = useCustomDebounce(searchInput, 1000);

  const id = useId();

  const { control, handleSubmit, register, watch } = useForm<FormSchema>({
    defaultValues: {
      cart: [{ sku: "", quantity: 1, jobName: "" }],
    },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const { remove, fields, append, update } = useFieldArray({
    name: "cart",
    control,
  });

  useEffect(() => {
    if (searchInput == searchTerm) {
      setIsPopupOpen(true);
    }
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput && debouncedSearchInput.length > 2) {
      setSearchTerm(searchInput);
      setIsLoading(true);
    } else {
      setIsPopupOpen(false);
    }
  }, [debouncedSearchInput]);

  const { isLoading: isSearchLoading, data: searchData } =
    useSearch(searchTerm);

  useEffect(() => {
    const searchDataTotal = searchData?.length ?? 0;

    if (!isSearchLoading && searchDataTotal > 0) {
      setSearchResultProducts(searchData ?? []);
      setIsPopupOpen(true);
      setIsLoading(false);
    }
  }, [searchData]);

  const onChange = (value: string, type: string) => {
    if (type === "__input_change__") {
      setSearchInput(value);
    }
    console.log("onchange", value, type);
  };

  const onSelectedItemChange = (value: Product, index: number) => {
    console.log("on selected item change", value, index);
    setIsPopupOpen(false);

    update(lastEditedIndex, { sku: value.sku, isInvalid: false });

    // update(lastEditedIndex, {
    //   ...fields[lastEditedIndex],
    //   sku: value.sku,
    //   isInvalid: false,
    //   quantity: 1, // Assign a default quantity value of 1
    //   // info: {
    //   //   title: value.title,
    //   //   minQuantity: value.minimumOrderQuantity,
    //   //   orderIncrementBy: value.orderQuantityByIncrements,
    //   // },
    // });
  };

  const onSubmit = async (values: FormSchema) => {
    console.log("form submitted", values);

    const isQtyValid = values.cart.every((item) => item.quantity > 0);

    if (isQtyValid) {
      // Quantity is valid, proceed with adding items to cart
    } else {
      // Quantity is not valid, show error message or handle accordingly
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="text-2xl font-bold text-wurth-gray-800">Quick order</div>

      <div className="text-sm text-wurth-gray-800">
        Add more items to your cart
      </div>

      <div className="mb-14 mt-4 rounded-lg border p-5 shadow-md">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="mb-3 flex items-center gap-2">
              <ItemSelectorInput
                id={id}
                searchResultProducts={searchResultProducts}
                onSelectedItemChange={(value) => {
                  onSelectedItemChange(value, index);
                }}
                register={register(`cart.${index}.sku`)}
                onTextChange={(value, type) => {
                  onChange(value, type);
                  setLastEditedIndex(index);
                }}
                isPopupOpen={isPopupOpen && lastEditedIndex == index}
              />

              <Input
                {...register(`cart.${index}.jobName` as const, {
                  required: true,
                })}
                id={`sku-${index}-${id}`}
                placeholder="PO number / job name"
                className="h-10 px-3 py-2"
              />

              <Input
                {...register(`cart.${index}.quantity` as const, {
                  required: true,
                })}
                id={`sku-${index}-${id}`}
                placeholder="Qty"
                className="h-10 max-w-20 px-3 py-2"
              />

              <div className="min-w-96">
                <ProductDetails
                  isLoading={isLoading}
                  isLastEditedIndex={lastEditedIndex == index}
                />
              </div>

              <div
                className="w-6 cursor-pointer p-2"
                onClick={() => remove(index)}
              >
                <Close
                  width={12}
                  height={12}
                  className="stroke-2 hover:stroke-black"
                />
              </div>
            </div>

            {fields.length != index + 1 && <hr className="mb-3" />}
          </div>
        ))}

        <button
          type="button"
          className="mt-3 flex flex-row items-center gap-1 rounded border px-4 py-2.5 text-sm font-semibold shadow-sm"
          onClick={() => {
            append({ sku: "", quantity: 0, isInvalid: false });
          }}
        >
          <MdAdd />
          <span>Add more items</span>
        </button>

        <div className="text-right">
          <Button type="submit" variant="default" className="">
            <AddToCart className="stroke-white stroke-2" width={16} />
            <span>Add all items to cart</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddMoreItemsForm;
