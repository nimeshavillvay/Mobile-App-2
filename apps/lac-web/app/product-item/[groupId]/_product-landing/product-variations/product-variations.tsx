import { getVariants } from "../apis";
import VariationsTable from "./variations-table";

type ProductVariationsProps = {
  groupId: string;
  sku?: string;
};

const ProductVariations = async ({ groupId, sku }: ProductVariationsProps) => {
  const variants = await getVariants(groupId, sku);

  return (
    <VariationsTable
      attributes={variants.AvailableAttributes}
      variants={variants.items}
    />
  );
};

export default ProductVariations;
