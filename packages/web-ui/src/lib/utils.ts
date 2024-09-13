import type { ProductPrice } from "@repo/shared-logic/models/pricing";
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  prefix: "",
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatNumberToPrice = (value: number) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function calculateDiscount(pricing: ProductPrice): number {
  if (!pricing.listPrice || pricing.listPrice <= pricing.price) {
    return 0;
  }
  return Math.round(pricing.listPrice - pricing.price);
}
