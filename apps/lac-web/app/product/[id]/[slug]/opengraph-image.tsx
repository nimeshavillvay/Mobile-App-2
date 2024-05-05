import OGImage from "@/_lib/og-image";
import { unstable_noStore as noStore } from "next/cache";
import { getProduct } from "./apis";
import type { ProductPageProps } from "./types";

export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";
export const contentType = "image/png";

const Image = async ({ params: { id } }: ProductPageProps) => {
  noStore(); // Added this because the cache gets confused between the product and category pages
  const product = await getProduct(id);

  return OGImage({
    title: product.selectedProduct.productName,
    image: product.selectedProduct.image,
  });
};

export default Image;
