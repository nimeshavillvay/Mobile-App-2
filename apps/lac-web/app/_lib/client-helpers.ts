import "client-only";
import { Product, ProductVariant } from "./types";

export function getVariantData(variant: ProductVariant | undefined) {
  if (variant) {
    const { id, sku, uom } = variant;
    return { id, sku, uom };
  }
  return { id: "", sku: "", uom: "" };
}

export function getProductTitle(
  product: Product,
  selectedVariant: ProductVariant | undefined,
) {
  const defaultVariant = product.variants[0];
  if (product.variants.length === 1 && defaultVariant) {
    return defaultVariant.title;
  }
  if (product.variants.length > 1) {
    if (selectedVariant) {
      return selectedVariant.title;
    } else {
      return product.groupName;
    }
  }
  return "";
}

export function getProductDetails(
  productVariants: ProductVariant[],
  selectedVariant?: ProductVariant,
) {
  const defaultVariant = productVariants[0];
  let href = "";
  let image = "";
  if (
    (productVariants.length === 1 ||
      (productVariants.length > 1 && !selectedVariant)) &&
    defaultVariant
  ) {
    href = `/product/${defaultVariant.id}/${defaultVariant.slug}`;
    image = defaultVariant.image;
  } else if (selectedVariant) {
    href = `/product/${selectedVariant.id}/${selectedVariant.slug}`;
    image = selectedVariant.image;
  }
  return { href, image };
}
