import type { ProductPrice } from "@repo/shared-logic/models/pricing";
import { calculateDiscount, cn, formatNumberToPrice } from "~/lib/utils";

type ProductPricingProps = {
  readonly productPrice: ProductPrice;
  readonly className?: string;
};

const ProductPricing = ({ productPrice, className }: ProductPricingProps) => {
  const discount = productPrice ? calculateDiscount(productPrice) : 0;

  return (
    <section
      title="product-price"
      className={cn("space-y-3 md:space-y-4", className)}
    >
      <div className="flex flex-row items-end gap-1 text-lg leading-6 text-wurth-gray-800">
        <div className="text-xl font-semibold leading-none">
          $
          <span className="font-title text-[1.75rem] leading-none">
            {formatNumberToPrice(productPrice.price)}
          </span>
        </div>

        {discount > 0 && (
          <div className="text-wurth-gray-400 line-through">
            ${formatNumberToPrice(productPrice.listPrice || 0)}
          </div>
        )}

        <div>
          <span className="text-sm font-semibold">/</span>
          <span className="font-title leading-none">
            {productPrice.uomPriceUnit}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
        {productPrice?.priceBreakdowns?.map((item) => (
          <div
            key={item.quantity}
            className="rounded-lg bg-wurth-gray-50 px-4 py-3 odd:rounded-r-none last:odd:rounded-r-lg even:rounded-l-none md:py-2"
          >
            <h5 className="text-sm font-medium text-wurth-gray-800">
              {item.quantity} items
            </h5>

            <div className="text-sm font-semibold leading-none text-wurth-gray-800">
              <span className="text-base font-bold leading-6">
                $
                {formatNumberToPrice(
                  Math.min(item.price || 0, productPrice.price),
                )}
              </span>
              /{productPrice.uomPriceUnit}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPricing;
