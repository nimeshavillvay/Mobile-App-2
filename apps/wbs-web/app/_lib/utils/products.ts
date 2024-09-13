import type { ProductPrice } from "@repo/shared-logic/models/pricing";

export function calculateDiscount(pricing: ProductPrice): number {
  if (!pricing.listPrice || pricing.listPrice <= pricing.price) {
    return 0;
  }
  return Math.round(pricing.listPrice - pricing.price);
}
