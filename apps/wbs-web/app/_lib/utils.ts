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

type ErrorResponse = {
  status_code: string | undefined;
  message: string;
};

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  if (
    typeof error === "object" &&
    (typeof (error as ErrorResponse)?.status_code === "string" ||
      typeof (error as ErrorResponse)?.status_code === "undefined") &&
    typeof (error as ErrorResponse)?.message === "string"
  ) {
    return true;
  }

  return false;
};
