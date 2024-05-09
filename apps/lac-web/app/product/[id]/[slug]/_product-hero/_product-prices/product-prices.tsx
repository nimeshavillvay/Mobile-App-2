"use client";

import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { cn } from "@/_lib/utils";
import useAddToCartForm from "../use-add-to-cart-form.hook";

type ProductPricesProps = {
  token: string;
  productId: number;
  uom: string;
  className?: string;
};

const ProductPrices = ({
  productId,
  uom,
  token,
  className,
}: ProductPricesProps) => {
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

  return (
    <section className={cn("space-y-3 md:space-y-4", className)}>
      <div className="flex flex-row items-end gap-1 text-lg leading-6 text-wurth-gray-800">
        <div className="text-xl font-semibold leading-none">
          $
          <span className="font-title text-[1.75rem] leading-8">
            {currentPrice}
          </span>
        </div>

        {currentPrice !== previousPrice && (
          <div className="text-wurth-gray-400 line-through">
            ${previousPrice}
          </div>
        )}

        <div>
          <span className="text-sm font-semibold">/</span>
          <span className="font-title leading-none">{uom}</span>
        </div>

        {currentPrice !== previousPrice && (
          <div className="font-semibold text-green-700">
            You save ${(previousPrice - currentPrice).toFixed(2)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-0.5">
        {priceData?.priceBreakDowns.map((item) => (
          <div
            key={item.quantity}
            className="rounded-lg bg-wurth-gray-50 px-4 py-3 odd:rounded-r-none last:odd:rounded-r-lg even:rounded-l-none md:py-2"
          >
            <h5 className="text-sm font-medium text-wurth-gray-800">
              {item.quantity} items
            </h5>

            <div className="text-sm font-semibold leading-none text-wurth-gray-800">
              <span className="text-base font-bold leading-6">
                ${item.price}
              </span>
              /{uom}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPrices;
