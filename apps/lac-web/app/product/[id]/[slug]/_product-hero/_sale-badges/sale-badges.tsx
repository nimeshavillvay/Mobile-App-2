"use client";

import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { Zap } from "@repo/web-ui/components/icons/zap";

type SaleBadgesProps = {
  readonly token: string;
  readonly productId: number;
  readonly listPrice: number;
  readonly onSale: boolean;
  readonly isNewItem: boolean;
};

const SaleBadges = ({
  token,
  productId,
  listPrice,
  onSale,
  isNewItem,
}: SaleBadgesProps) => {
  const priceCheckQuery = useSuspensePriceCheck(token, [{ productId, qty: 1 }]);
  const priceData = priceCheckQuery.data.productPrices[0];
  const currentPrice = priceData?.uomPrice ?? priceData?.price ?? 0;

  // We don't want to show the discount badge, if the list price is 0 or the product is an laminate item
  if (priceData?.uomPrice && priceData?.uomPriceUnit) {
    return null;
  }

  const discount = Math.round(((listPrice - currentPrice) / listPrice) * 100);

  return (
    <>
      {onSale && (
        <div className="flex flex-row items-center gap-1 rounded bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4 text-wurth-blue-450">
          <Zap className="hidden size-4 stroke-wurth-blue-450 md:block" />
          <span>Flash Deal</span>
        </div>
      )}
      {isNewItem && (
        <div
          className="flex flex-row items-center gap-1 rounded px-2 py-1.5 text-sm font-semibold leading-4"
          style={{
            color: "#A16207",
            backgroundColor: "#FEF2F2",
          }}
        >
          <span>New</span>
        </div>
      )}
      {discount > 0 && (
        <div className="rounded bg-green-50 px-2 py-0.5 text-base text-green-700">
          <span className="font-semibold">{discount}%</span> off
        </div>
      )}
    </>
  );
};

export default SaleBadges;
