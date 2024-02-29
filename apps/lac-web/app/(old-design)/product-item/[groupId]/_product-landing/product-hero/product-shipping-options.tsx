"use client";

import ShippingOptions from "@/(old-design)/_components/shipping-options";
import { useFormContext } from "react-hook-form";
import { type AddItemSchema } from "./helpers";

type ProductShippingOptionsProps = {
  sku: string;
};

const ProductShippingOptions = ({ sku }: ProductShippingOptionsProps) => {
  const { watch } = useFormContext<AddItemSchema>();
  const quantity = watch("quantity");

  return (
    <>
      <h3 className="font-wurth text-base font-extrabold uppercase text-black">
        Shipping option/Stock availability
      </h3>

      <ShippingOptions sku={sku} quantity={quantity} />
    </>
  );
};

export default ProductShippingOptions;
