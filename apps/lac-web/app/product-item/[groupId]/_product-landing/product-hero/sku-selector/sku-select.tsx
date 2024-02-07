"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import * as Label from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect, useId } from "react";

type SKUSelectProps = {
  groupId: string;
  selectedSku?: string;
  variants: {
    sku: string;
    name: string;
  }[];
};

const SKUSelect = ({ groupId, selectedSku, variants }: SKUSelectProps) => {
  const router = useRouter();
  const id = useId();
  const skuSelectId = `sku-select-${id}`;
  const selectedValue = variants.find((variant) => variant.sku === selectedSku);

  const onValueChange = (value: string) => {
    router.replace(`/product-item/${groupId}/${value}`);
  };

  useEffect(() => {
    // Prefetch all variant pages
    variants.forEach((variant) => {
      router.prefetch(`/product-item/${groupId}/${variant.sku}`);
    });
  }, [groupId, router, variants]);

  return (
    <div className="flex flex-row items-center gap-2">
      <Label.Root htmlFor={skuSelectId}>Item # :</Label.Root>

      <Select value={selectedSku} onValueChange={onValueChange}>
        <SelectTrigger
          id={skuSelectId}
          className="border-brand-gray-400 flex flex-row items-center gap-2 rounded-md border p-2"
        >
          <SelectValue placeholder="Make a Selection">
            {selectedValue
              ? formatLabel(selectedValue.name, selectedValue.sku)
              : ""}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="bg-white">
          {variants.map((variant) => (
            <SelectItem key={variant.sku} value={variant.sku}>
              {formatLabel(variant.name, variant.sku)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SKUSelect;

const formatLabel = (name: string, sku: string) => {
  return `${name} ( ${sku} )`;
};
