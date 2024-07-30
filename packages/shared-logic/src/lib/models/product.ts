import type { ProductAvailability } from "./availability";
import type { Brand } from "./brand";
import type { Category } from "./category";
import type { ProductPrice } from "./pricing";
import type { MetadataValue } from "./shared";

/**
 * Product
 */
export type Product = {
  brand: Brand;
  categories: Category[];
  createdAt?: Date;
  description?: string;
  handle: string;
  id: string;
  imageUrl: string;
  status: string;
  title: string;
  updatedAt?: Date;
  variants?: Variant[];
};

export type LiteProduct = Pick<
  Product,
  "id" | "title" | "handle" | "imageUrl"
> & {
  brandName: Product["brand"]["name"];
  categoryName: Product["categories"][0]["name"];
  variants: LiteVariant[];
};

//todo change to product option
/**
 * Option
 */
export type Option = {
  name: string;
  values: MetadataValue[];
};

/**
 * Variant
 */
export type Variant = {
  barcode?: string;
  brand: Brand;
  category: Category;
  externalId?: string;
  id: string;
  handle: string;
  imageUrls: string[] | null;
  options: Option[];
  pricing: ProductPrice;
  availability?: ProductAvailability;
  sku: string;
  title: string;
  upc?: string;
};

export type LiteVariant = Pick<
  Variant,
  "id" | "title" | "sku" | "handle" | "imageUrls"
> & {
  brandName: Variant["brand"]["name"];
  categoryName: Variant["category"]["name"];
  pricing: Variant["pricing"];
};
