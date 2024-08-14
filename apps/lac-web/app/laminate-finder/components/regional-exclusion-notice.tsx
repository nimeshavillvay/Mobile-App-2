"use client";

import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import { Alert, AlertDescription } from "@repo/web-ui/components/ui/alert";

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
    <Alert variant="destructive">
      <AlertDescription>
        This item is not available in your territory.
      </AlertDescription>
    </Alert>
  );
};

export default RegionalExclusionNotice;
