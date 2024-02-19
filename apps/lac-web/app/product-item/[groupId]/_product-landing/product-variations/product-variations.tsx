import { type ComponentProps } from "react";
import { getVariants } from "../apis";
import VariationsTable from "./variations-table";

type ProductVariationsProps = {
  product: ComponentProps<typeof VariationsTable>["product"];
  groupId: string;
  sku?: string;
};

const ProductVariations = async ({
  product,
  groupId,
  sku,
}: ProductVariationsProps) => {
  const variants = await getVariants(groupId, sku);

  return (
    <VariationsTable
      product={product}
      attributes={variants.AvailableAttributes}
      variants={variants.items}
    />
  );
};

export default ProductVariations;
