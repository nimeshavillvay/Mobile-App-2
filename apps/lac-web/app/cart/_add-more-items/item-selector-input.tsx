"use client";

import { cn } from "@/(old-design)/_utils/helpers";
import { Input } from "@repo/web-ui/components/ui/input";
import { useCombobox } from "downshift";
import React, { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Product } from "./types";

type ItemSelectorInputProps = {
  searchResultProducts: Product[];
  onTextChange: (selection: string, type: string) => void;
  onSelectedItemChange: (value: Product) => void;
  id: string;
  isPopupOpen: boolean;
  register: UseFormRegisterReturn<string>;
};

const ItemSelectorInput = ({
  searchResultProducts = [],
  onTextChange,
  onSelectedItemChange,
  id,
  isPopupOpen,
  register,
}: ItemSelectorInputProps) => {
  const [items, setItems] = useState(searchResultProducts);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    isOpen: isPopupOpen,
    onInputValueChange({ type, inputValue }) {
      onTextChange(inputValue, type);
    },
    onSelectedItemChange({ selectedItem }) {
      onSelectedItemChange(selectedItem);
    },
    items,
    itemToString(item) {
      return item ? item.sku : "";
    },
  });

  useEffect(() => {
    setItems(searchResultProducts);
  }, [searchResultProducts]);

  return (
    <div>
      <div className="flex w-72 flex-col gap-1">
        <div className="flex gap-0.5 bg-white shadow-sm">
          <Input
            id={id}
            placeholder="Item #"
            className="h-10 w-full"
            {...register}
            {...getInputProps()}
          />
        </div>
      </div>
      <ul
        className={`absolute z-50 mt-1 max-h-80 w-72 overflow-x-hidden overflow-y-scroll  bg-white p-0 ${
          !(isOpen && items.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.length > 0 &&
          items.map((item, index) => (
            <li
              className={cn(
                highlightedIndex === index && "bg-blue-300",
                selectedItem === item && "font-bold",
                "flex flex-col px-3 py-2 shadow-sm",
              )}
              key={item.sku}
              {...getItemProps({ item, index })}
            >
              <span>{item.sku}</span>
              <span className="text-sm text-gray-700">{item.sku}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ItemSelectorInput;
