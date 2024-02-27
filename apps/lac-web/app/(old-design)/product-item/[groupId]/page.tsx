import type { Metadata } from "next";
import ProductLanding from "./_product-landing";
import { getProduct } from "./apis";

type ProductPageProps = {
  params: {
    groupId: string;
  };
};

export const generateMetadata = async ({
  params: { groupId },
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(groupId);

  return {
    title: product.page_title,
  };
};

const ProductPage = ({ params: { groupId } }: ProductPageProps) => {
  return <ProductLanding groupId={groupId} />;
};

export default ProductPage;
