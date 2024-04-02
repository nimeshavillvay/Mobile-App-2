import type { Metadata } from "next";
import ProductLanding from "../_product-landing";
import { getProduct } from "../apis";

type ProductPageProps = {
  params: {
    groupId: string;
    sku: string;
  };
};

export const generateMetadata = async ({
  params: { groupId, sku },
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(groupId, sku);

  return {
    title: product.page_title,
  };
};

const ProductPage = ({ params: { groupId, sku } }: ProductPageProps) => {
  return <ProductLanding groupId={groupId} sku={sku} />;
};

export default ProductPage;
