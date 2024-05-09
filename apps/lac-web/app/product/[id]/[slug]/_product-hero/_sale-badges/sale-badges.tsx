"use client";

import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { Zap } from "@repo/web-ui/components/icons/zap";
import useAddToCartForm from "../use-add-to-cart-form.hook";

type SaleBadgesProps = {
  token: string;
  productId: number;
};

const SaleBadges = ({ token, productId }: SaleBadgesProps) => {
  const { watch } = useAddToCartForm();
  const quantity = watch("quantity");

  const priceCheckQuery = useSuspensePriceCheck(token, [{ productId, qty: 1 }]);
  const priceData = priceCheckQuery.data.productPrices[0];

  let currentPrice = 0;
  let previousPrice = 0;

  if (priceData) {
    currentPrice = priceData.price;
    previousPrice = priceData.price;

    // Get discounted price from breakdowns
    const priceBreakdown = priceData.priceBreakDowns.findLast(
      (breakdown) => quantity >= breakdown.quantity,
    );
    if (priceBreakdown) {
      currentPrice = priceBreakdown.price;
    }
  }

  if (currentPrice === previousPrice) {
    return null;
  }

  const discount = Math.round(
    ((previousPrice - currentPrice) / previousPrice) * 100,
  );

  return (
    <>
      <div className="flex flex-row items-center gap-1 rounded bg-sky-50 px-2 py-1.5 text-sm font-semibold leading-4 text-wurth-blue-450">
        <Zap className="hidden size-4 stroke-wurth-blue-450 md:block" />
        <span>Flash Deal</span>
      </div>
      <div className="rounded bg-green-50 px-2 py-0.5 text-base text-green-700">
        <span className="font-semibold">{discount}%</span> off
      </div>
    </>
  );
};

export default SaleBadges;
