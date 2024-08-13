import type { ProductPrice } from "@repo/shared-logic/models/pricing";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export function calculateDiscount(pricing: ProductPrice): number {
  if (!pricing.listPrice || pricing.listPrice <= pricing.price) {
    return 0;
  }
  return Math.round(pricing.listPrice - pricing.price);
}
