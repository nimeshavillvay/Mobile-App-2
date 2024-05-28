"use client";

import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddToCart } from "@repo/web-ui/components/icons/add-to-cart";
import { Close } from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Skull } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import * as z from "zod";
import getStatus from "./apis";
import BulkUpload from "./bulk-upload";
import useCustomDebounce from "./custom-debounce";
import ItemSelectorInput from "./item-selector-input";
import ProductDetails from "./product-details";
import { Product } from "./types";
import useAddMultipleToCartMutation from "./use-add-multiple-to-cart-mutation.hook";
import useSearch from "./use-search.hook";

const formSchema = z.object({
  cart: z
    .object({
      sku: z.string(),
      quantity: z
        .union([z.number().int().positive(), z.nan()])
        .optional()
        .nullable(),
      jobName: z.string().optional(),
      isInvalid: z.boolean().nullable().default(null).optional(),
      isBulkUploadItem: z.boolean().default(false),
      info: z
        .object({
          minQuantity: z.number(),
          orderIncrementBy: z.number(),
          title: z.string(),
          image: z.string(),
          productId: z.number().optional(),
        })
        .optional(),
    })
    .array(),
});
type FormSchema = z.infer<typeof formSchema>;

const AddMoreItemsForm = ({ token }: { token: string }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedIndex, setLastEditedIndex] = useState(0);
  const [searchResultProducts, setSearchResultProducts] = useState<Product[]>(
    [],
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBulkUploadDone, setIsBulkUploadDone] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [isFileProcessing, setIsFileProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [bulkUploadItems, setBulkUploadItems] = useState<
    { sku: string; quantity: string; jobName: string }[]
  >([]);

  const addMultipleToCartMutation = useAddMultipleToCartMutation(token);

  useEffect(() => {}, [searchTerm]);

  const debouncedSearchInput = useCustomDebounce(searchInput, 1000);

  const id = useId();

  const { control, handleSubmit, register, watch, setValue, reset } =
    useForm<FormSchema>({
      defaultValues: {
        cart: [
          {
            sku: "",
            quantity: null,
            jobName: "",
          },
        ],
      },
      mode: "onBlur",
      resolver: zodResolver(formSchema),
    });

  const { remove, fields, append } = useFieldArray({
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

  const { data: searchData } = useSearch(searchTerm);

  useEffect(() => {
    if (searchData == undefined) {
      return;
    }

    if (searchData.length == 0) {
      setIsLoading(false);

      setValue(`cart.${lastEditedIndex}.sku`, searchTerm);
      setValue(`cart.${lastEditedIndex}.isInvalid`, true);

      return;
    }

    setSearchResultProducts(searchData ?? []);
    setIsPopupOpen(true);
    setIsLoading(false);
  }, [searchData]);

  const onChange = (value: string, type: string, index: number) => {
    if (type === "__input_change__") {
      setValue(`cart.${index}.sku`, value);
      setSearchInput(value);
    }
  };

  const onSelectedItemChange = async (value: Product, index: number) => {
    setIsPopupOpen(false);

    setValue(`cart.${index}.sku`, value.sku);
    setValue(`cart.${index}.isInvalid`, false);
    setValue(`cart.${index}.info`, {
      title: value.title,
      minQuantity: value.minimumOrderQuantity,
      orderIncrementBy: value.orderQuantityByIncrements,
      image: value.image,
    });

    const validatedCartItems = await getStatus({
      products: [{ sku: value.sku }],
    });

    if (validatedCartItems != undefined && validatedCartItems.length > 0) {
      const validatedCartItem = validatedCartItems?.[0] ?? { productId: "" };
      setValue(
        `cart.${index}.info.productId`,
        parseInt(validatedCartItem.productId),
      );
    }
  };

  const setBulkUploadCSVDataToForm = async (
    bulkUploadItems: {
      sku: string;
      quantity: string;
      jobName: string;
    }[],
  ) => {
    setIsFileProcessing(true);
    const cart = watch("cart");
    if (cart && cart[0]?.sku == "") {
      remove(0);
    }

    for (let i = 0; i < bulkUploadItems.length; i++) {
      const item = bulkUploadItems[i];

      if (!item) return;

      append({
        sku: item.sku,
        quantity: item.quantity == "" ? null : parseInt(item.quantity),
        jobName: item.jobName,
        isBulkUploadItem: true,
      });
    }

    await getItemsStatuses();
    setIsBulkUploadDone(true);
    setIsFileProcessing(false);
  };

  useEffect(() => {
    if (bulkUploadItems.length == 0) {
      return;
    }

    setBulkUploadCSVDataToForm(bulkUploadItems);
  }, [bulkUploadItems]);

  const getLineItemStatus = (index: number) => {
    const cartItem = watch(`cart.${index}`);
    if (cartItem.sku == "") {
      return null;
    }
    return cartItem.isInvalid;
  };

  const getItemsStatuses = async () => {
    const cartItems = watch("cart").map((item) => ({
      sku: item.sku,
      mqt: item.quantity ?? 0,
      poOrJobName: item.jobName,
    }));

    const validatedCartItems = await getStatus({
      products: cartItems,
    });

    cartItems.map((item, index) => {
      const validatedItem = validatedCartItems.find(
        (validatedItem1) =>
          validatedItem1.sku.toUpperCase() == item.sku.toUpperCase(),
      );

      if (validatedItem) {
        setValue(`cart.${index}.isInvalid`, false);
        setValue(`cart.${index}.info`, {
          minQuantity: parseInt(validatedItem.txt_min_order_amount),
          orderIncrementBy: parseInt(validatedItem.qm),
          title: validatedItem.txt_product_summary,
          image: validatedItem.product_image,
          productId: parseInt(validatedItem.productId),
        });
      } else {
        setValue(`cart.${index}.isInvalid`, true);
      }
    });
  };

  const isFormValid = (
    cartItems: {
      sku: string;
      isBulkUploadItem: boolean;
      quantity?: number | null | undefined;
      jobName?: string | undefined;
      isInvalid?: boolean | null | undefined;
      info?:
        | {
            minQuantity: number;
            orderIncrementBy: number;
            title: string;
            image: string;
          }
        | undefined;
    }[],
  ): boolean => {
    let isValidForm = true;
    let i = 0;

    while (isValidForm && i < cartItems.length) {
      const cartItem = cartItems?.[i];

      if (cartItem?.sku == "" || isInvalidQuantity(i) || cartItem?.isInvalid) {
        isValidForm = false;
      }
      i++;
    }

    return isValidForm;
  };

  const onSubmit = async (values: FormSchema) => {
    setIsFormInvalid(false);
    setIsFormSubmitted(true);

    if (!isFormValid(values?.cart)) {
      setIsFormInvalid(true);
      return;
    }

    const cartItemDetails = values.cart.map((item, index) => {
      return {
        productId: item.info?.productId,
        quantity: item.quantity,
        poOrJobName: item.jobName,
      };
    });

    addMultipleToCartMutation.mutateAsync(cartItemDetails, {
      onSuccess: () => {
        reset();
        setLastEditedIndex(0);
        setIsBulkUploadDone(false);
        setIsFormSubmitted(false);
        setIsFormInvalid(false);
        setBulkUploadItems([]);
        setFile(null);
      },
    });
  };

  const isInvalidQuantity = (index: number) => {
    const itemSKU = watch(`cart.${index}.sku`);
    const itemQuantity = watch(`cart.${index}.quantity`) ?? 0;
    const minQuantity = watch(`cart.${index}.info.minQuantity`);
    const orderIncrementBy = watch(`cart.${index}.info.orderIncrementBy`);

    function isDataComplete() {
      return (
        itemSKU !== "" &&
        minQuantity != undefined &&
        orderIncrementBy != undefined
      );
    }

    if (
      isDataComplete() &&
      (isNaN(itemQuantity) ||
        itemQuantity < 1 ||
        minQuantity > itemQuantity ||
        itemQuantity % orderIncrementBy !== 0)
    ) {
      return true;
    }

    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-10 px-4 md:p-0"
    >
      <div className="text-2xl font-bold text-wurth-gray-800">Quick order</div>

      <div className="text-sm text-wurth-gray-800">
        Add more items to your cart
      </div>

      <div className="mb-5 mt-4 overflow-x-scroll rounded-lg border p-5 shadow-md md:overflow-hidden">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="mb-3 flex items-center gap-2">
              <ItemSelectorInput
                id={id}
                items={searchResultProducts}
                onSelectedItemChange={(value) => {
                  onSelectedItemChange(value, index);
                }}
                value={watch(`cart.${index}.sku`)}
                isInvalid={getLineItemStatus(index) ?? null}
                onTextChange={(value, type) => {
                  onChange(value, type, index);
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
                className="h-10 min-w-32 px-3 py-2"
              />

              <Input
                {...register(`cart.${index}.quantity`, {
                  valueAsNumber: true,
                })}
                id={`quantity-${index}-${id}`}
                placeholder="Qty"
                type="number"
                className={cn(
                  "h-10 w-20 px-3 py-2",
                  isFormSubmitted &&
                    isInvalidQuantity(index) &&
                    "border-wurth-red-650 text-wurth-red-650",
                )}
              />

              <div className="h-10 min-w-96">
                <ProductDetails
                  product={{
                    isInvalid: watch("cart")[index]?.isInvalid,
                    info: watch("cart")[index]?.info,
                  }}
                  isLoading={isLoading}
                  isLastEditedIndex={lastEditedIndex == index}
                />
              </div>

              <Button
                variant="ghost"
                className="h-6 w-6 cursor-pointer px-1.5"
                onClick={() => remove(index)}
              >
                <Close
                  width={12}
                  height={12}
                  className="stroke-2 hover:stroke-black"
                />
              </Button>
            </div>

            {fields.length != index + 1 && <hr className="mb-3" />}
          </div>
        ))}

        <button
          type="button"
          className="mt-3 flex flex-row items-center gap-1 rounded border px-4 py-2.5 text-sm font-semibold shadow-sm"
          onClick={() => {
            append({
              sku: "",
              quantity: null,
              jobName: "",
              isBulkUploadItem: false,
            });
            setIsFormSubmitted(false);
          }}
        >
          <MdAdd />
          <span>Add more items</span>
        </button>

        <BulkUpload
          file={file}
          setFile={setFile}
          setBulkUploadItems={setBulkUploadItems}
          isBulkUploadDone={isBulkUploadDone}
          isFileProcessingState={isFileProcessing}
        />

        <div className="flex w-full min-w-[820px] items-center justify-end gap-2">
          {isFormSubmitted && isFormInvalid && (
            <div className="text-sm text-wurth-red-650">
              Please fix the errors in the form first.
            </div>
          )}
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
