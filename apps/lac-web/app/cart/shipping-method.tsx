"use client";

import type { ShippingMethod } from "./types";

type ShippingMethodProps = {
  options: ShippingMethod[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ShippingMethod = ({ options }: ShippingMethodProps) => {
  return (
    <div className="space-y-3 rounded-lg border border-wurth-gray-150 px-5 py-4 shadow-md">
      <h3 className="pb-2 text-sm text-black">Default delivery method</h3>
    </div>
  );
};

export default ShippingMethod;
