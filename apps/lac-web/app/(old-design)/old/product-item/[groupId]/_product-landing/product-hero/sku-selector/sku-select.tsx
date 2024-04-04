"use client";

import { Label } from "@/old/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
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
    <div className="mt-6 flex flex-row items-center gap-2">
      <Label
        htmlFor={skuSelectId}
        className="text-nowrap text-lg leading-6 text-[#4F4F4F]"
      >
        Item # :
      </Label>

      <Select value={selectedSku} onValueChange={onValueChange}>
        <SelectTrigger
          id={skuSelectId}
          className="flex h-auto w-full flex-row items-center gap-2 rounded-sm border border-brand-gray-400 px-1.5 py-1 text-[14px] leading-5"
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
