import { api } from "@/_lib/api";
import RelatedProductsTable from "./related-products-table";
import type { RelatedProduct } from "./types";

type AccessoriesAndRelatedProducts = {
  groupId: string;
};

const AccessoriesAndRelatedProducts = async ({
  groupId,
}: AccessoriesAndRelatedProducts) => {
  const products = await api
    .get(`pim/webservice/rest/landingrelatedproduct/${groupId}`)
    .json<{
      data: RelatedProduct[];
    }>();

  // No Accessories or Related Products
  if (!products.data.length) {
    return (
      <div className="text-brand-gray-500">
        Accessories and Related Products are not available
      </div>
    );
  }

  return <RelatedProductsTable products={products.data} />;
};

export default AccessoriesAndRelatedProducts;
