"use client";

import { cn } from "@/_lib/utils";
import { Close } from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { type UseFormRegisterReturn } from "react-hook-form";
import ItemSelectorInput from "./item-selector-input";
import ProductDetails from "./product-details";
import type { Product } from "./types";

type AddMoreItemsRowProps = {
  readonly index: number;
  readonly id: string;
  readonly searchResultProducts: Product[];
  readonly onSelectedItemChange: (value: Product, index: number) => void;
  readonly lineItemFormData: {
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
          productId?: number | undefined;
        }
      | undefined;
  };
  readonly onChange: (value: string, type: string, index: number) => void;
  readonly lastEditedIndex: number;
  readonly setLastEditedIndex: (index: number) => void;
  readonly isPopupOpen: boolean;
  readonly registerQuantityField: UseFormRegisterReturn<`cart.${number}.quantity`>;
  readonly registerJobNameField: UseFormRegisterReturn<`cart.${number}.jobName`>;
  readonly isFormSubmitted: boolean;
  readonly isInvalidQuantity: (index: number) => boolean;
  readonly isLoading: boolean;
  readonly removeLineItem: () => void;
};

const AddMoreItemsRow = ({
  index,
  id,
  searchResultProducts,
  onSelectedItemChange,
  lineItemFormData,
  onChange,
  lastEditedIndex,
  setLastEditedIndex,
  isPopupOpen,
  registerQuantityField,
  registerJobNameField,
  isFormSubmitted,
  isInvalidQuantity,
  isLoading,
  removeLineItem,
}: AddMoreItemsRowProps) => {
  const getLineItemStatus = () => {
    if (lineItemFormData.sku == "") {
      return null;
    }
    return lineItemFormData.isInvalid;
  };

  return (
    <div className="mb-3 flex items-center gap-2">
      <ItemSelectorInput
        id={id}
        items={searchResultProducts}
        onSelectedItemChange={(value) => {
          onSelectedItemChange(value, index);
        }}
        value={lineItemFormData.sku}
        isInvalid={getLineItemStatus(index) ?? null}
        onTextChange={(value, type) => {
          onChange(value, type, index);
          setLastEditedIndex(index);
        }}
        isPopupOpen={isPopupOpen && lastEditedIndex == index}
      />

      <Input
        {...registerJobNameField}
        id={`sku-${index}-${id}`}
        placeholder="PO number / job name"
        className="h-10 min-w-32 px-3 py-2"
      />

      <Input
        {...registerQuantityField}
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
            isInvalid: lineItemFormData?.isInvalid,
            info: lineItemFormData?.info,
          }}
          isLoading={isLoading}
          isLastEditedIndex={lastEditedIndex == index}
        />
      </div>

      <Button
        variant="ghost"
        className="h-6 w-6 cursor-pointer px-1.5"
        onClick={removeLineItem}
      >
        <Close width={12} height={12} className="stroke-2 hover:stroke-black" />
      </Button>
    </div>
  );
};

export default AddMoreItemsRow;
