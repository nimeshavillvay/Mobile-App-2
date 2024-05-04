import OGImage from "@/_lib/og-image";
import { getProduct } from "./apis";
import type { ProductPageProps } from "./types";

export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";
export const contentType = "image/png";

const Image = async ({ params: { id, slug } }: ProductPageProps) => {
  const product = await getProduct(id, slug);

  return OGImage({
    title: product.selectedProduct.productName,
    image: product.selectedProduct.image,
  });
};

export default Image;
