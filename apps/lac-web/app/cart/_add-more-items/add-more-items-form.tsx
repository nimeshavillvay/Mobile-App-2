"use client";

import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddToCart } from "@repo/web-ui/components/icons/add-to-cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/web-ui/components/ui/alert-dialog";
import { Button } from "@repo/web-ui/components/ui/button";
// eslint-disable-next-line no-restricted-imports
import { useEffect, useId, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import * as z from "zod";
import getStatus from "./apis";
import BulkUpload from "./bulk-upload";
import NewItemRow from "./new-item-row";
import type { CartItem, Product } from "./types";
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

const AddMoreItemsForm = ({ token }: { readonly token: string }) => {
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
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const addMultipleToCartMutation = useAddMultipleToCartMutation(token);
  const debouncedSearchInput = useDebouncedState(searchInput);

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

  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });

  useEffect(() => {
    if (searchInput == searchTerm) {
      setIsPopupOpen(true);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput && debouncedSearchInput.length > 2) {
      setSearchTerm(searchInput);
      setIsLoading(true);
    } else {
      setIsPopupOpen(false);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  const onChange = (value: string, isItemClick: boolean, index: number) => {
    if (!isItemClick) {
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

      if (!item) {
        return;
      }

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
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bulkUploadItems]);

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

  const isFormValid = (cartItems: CartItem[]): boolean => {
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

    const cartItemDetails = values.cart.map((item) => {
      return {
        productId: item.info?.productId,
        quantity: item.quantity,
        poOrJobName: item.jobName,
        sku: item.sku,
      };
    });

    addMultipleToCartMutation.mutateAsync(cartItemDetails, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const resetForm = () => {
    reset();
    setLastEditedIndex(0);
    setIsBulkUploadDone(false);
    setIsFormSubmitted(false);
    setIsFormInvalid(false);
    setBulkUploadItems([]);
    setFile(null);
  };

  const isInvalidQuantity = (index: number) => {
    const itemSKU = watch(`cart.${index}.sku`);
    const itemQuantity = watch(`cart.${index}.quantity`) ?? 0;
    const minQuantity = watch(`cart.${index}.info.minQuantity`);
    const orderIncrementBy = watch(`cart.${index}.info.orderIncrementBy`);

    const isDataComplete = () => {
      return (
        itemSKU !== "" &&
        minQuantity != undefined &&
        orderIncrementBy != undefined
      );
    };

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

  const removeLineItem = (index: number) => {
    remove(index);
  };

  return (
    <form
      id="quick-order-form"
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
            <NewItemRow
              index={index}
              id={id}
              onSelectedItemChange={onSelectedItemChange}
              searchResultProducts={searchResultProducts}
              lineItemFormData={watch(`cart.${index}`)}
              onChange={onChange}
              lastEditedIndex={lastEditedIndex}
              setLastEditedIndex={setLastEditedIndex}
              isPopupOpen={isPopupOpen}
              registerQuantityField={register(`cart.${index}.quantity`, {
                valueAsNumber: true,
              })}
              registerJobNameField={register(`cart.${index}.jobName`)}
              isFormSubmitted={isFormSubmitted}
              isInvalidQuantity={isInvalidQuantity}
              isLoading={isLoading}
              removeLineItem={() => removeLineItem(index)}
            />

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
          {fields.length > 0 && (
            <AlertDialog
              open={deleteConfirmation}
              onOpenChange={setDeleteConfirmation}
            >
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="font-medium"
                  disabled={addMultipleToCartMutation.isPending}
                >
                  Clear all
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure want to clear all the items?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => resetForm()}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            type="submit"
            variant="default"
            className=""
            disabled={addMultipleToCartMutation.isPending}
          >
            <AddToCart className="stroke-white stroke-2" width={16} />
            <span>Add all items to cart</span>
          </Button>
        </div>

        {isFormSubmitted && isFormInvalid && (
          <div className="mt-3 text-right text-sm text-wurth-red-650">
            Please fix the errors in the form first.
          </div>
        )}
      </div>
    </form>
  );
};

export default AddMoreItemsForm;
