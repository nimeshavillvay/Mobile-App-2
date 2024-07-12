"use client";

import { cn } from "@/_lib/utils";
import { Close } from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { type UseFormRegisterReturn } from "react-hook-form";
import ItemSelectorInput from "./item-selector-input";
import ProductSearchResult from "./product-search-result";
import type { CartItem, Product } from "./types";

type NewItemRowProps = {
  readonly index: number;
  readonly id: string;
  readonly searchResultProducts: Product[];
  readonly onSelectedItemChange: (value: Product, index: number) => void;
  readonly lineItemFormData: CartItem;
  readonly onChange: (
    value: string,
    isItemClick: boolean,
    index: number,
  ) => void;
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

const ALLOWED_KEYS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];

const NewItemRow = ({
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
}: NewItemRowProps) => {
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
        isInvalid={getLineItemStatus() ?? null}
        onTextChange={(value, isItemClick) => {
          onChange(value, isItemClick, index);
          setLastEditedIndex(index);
        }}
        isPopupOpen={isPopupOpen && lastEditedIndex == index}
      />

      <Input
        {...registerJobNameField}
        id={`sku-${index}-${id}`}
        placeholder="PO number / job name"
        className="h-10 min-w-[8rem] px-3 py-2"
      />

      <Input
        {...registerQuantityField}
        id={`quantity-${index}-${id}`}
        placeholder="Qty"
        type="number"
        min={1}
        step={1}
        className={cn(
          "h-10 w-20 px-3 py-2",
          isFormSubmitted &&
            isInvalidQuantity(index) &&
            "border-wurth-red-650 text-wurth-red-650",
        )}
        onKeyDown={(event) => {
          const value = (event.target as HTMLInputElement).value;
          if (
            !ALLOWED_KEYS.includes(event.key) ||
            (value &&
              value.toString().length >= 5 &&
              event.key !== "Backspace") || // Limit to 5 characters
            (value !== undefined &&
              value.toString().length === 0 &&
              event.key === "0") // Disable "0" as first character
          ) {
            event.preventDefault();
          }
        }}
      />

      <div className="flex-grow">
        <ProductSearchResult
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
        className="flex h-10 w-10 items-center justify-center"
        onClick={removeLineItem}
      >
        <Close width={16} height={16} className="stroke-2 hover:stroke-black" />
      </Button>
    </div>
  );
};

export default NewItemRow;
