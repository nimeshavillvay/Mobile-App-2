"use client";

import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useEffect, useId } from "react";
import { MdCheck, MdOutlineArrowDropDown } from "react-icons/md";

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

      <Select.Root value={selectedSku} onValueChange={onValueChange}>
        <Select.Trigger
          id={skuSelectId}
          className="border-brand-dark-gray flex flex-row items-center gap-2 rounded-md border p-2"
        >
          <Select.Value placeholder="Make a Selection">
            {selectedValue
              ? formatLabel(selectedValue.name, selectedValue.sku)
              : ""}
          </Select.Value>

          <Select.Icon>
            <MdOutlineArrowDropDown />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-white">
            <Select.Viewport>
              {variants.map((variant) => (
                <Select.Item key={variant.sku} value={variant.sku}>
                  <Select.ItemText>
                    {formatLabel(variant.name, variant.sku)}
                  </Select.ItemText>

                  <Select.ItemIndicator>
                    <MdCheck />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SKUSelect;

const formatLabel = (name: string, sku: string) => {
  return `${name} ( ${sku} )`;
};
