"use client";

import Warning from "@/_components/warning";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";

const RegionalExclusionNotice = ({
  token,
  productId,
}: {
  readonly token: string;
  readonly productId: number;
}) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  if (!productExcludedQuery.data.isExcluded) {
    return null;
  }

  return (
    <Warning
      title="Not Available"
      description="This item is not available in your territory."
    />
  );
};

export default RegionalExclusionNotice;
