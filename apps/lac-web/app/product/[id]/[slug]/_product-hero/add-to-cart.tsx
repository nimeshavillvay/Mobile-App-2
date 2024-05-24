import { cn } from "@/_lib/utils";
import { Check } from "@repo/web-ui/components/icons/check";
import { Button } from "@repo/web-ui/components/ui/button";
import { Suspense } from "react";
import AddToCartForm from "./_add-to-cart-form";
import LocationStocks from "./_location-stocks";
import RegionalExclusionNotice from "./_regional-exclusion-notice";
import FavoriteButton from "./favorite-button";
import FavoriteButtonSkeleton from "./favorite-button-skeleton";

type AddToCartProps = {
  productId: number;
  minQty: number;
  incQty: number;
  uom: string;
  className?: string;
};

const AddToCart = ({
  productId,
  minQty,
  incQty,
  uom,
  className,
}: AddToCartProps) => {
  return (
    <>
      <section className={cn("space-y-3", className)}>
        <LocationStocks productId={productId} />

        <AddToCartForm
          productId={productId}
          minQty={minQty}
          incQty={incQty}
          uom={uom}
        />

        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex-1 text-sm text-wurth-gray-500 md:flex md:flex-row md:items-center md:gap-4">
            <div>
              Min Order:{" "}
              <span className="font-semibold text-wurth-gray-800">
                {minQty}
              </span>
            </div>

            <div>
              Quantity Multiple by:{" "}
              <span className="font-semibold text-wurth-gray-800">
                {incQty}
              </span>
            </div>
          </div>

          <Button variant="outline" disabled className="gap-1 md:py-2">
            <Check className="size-4" />
            <span>Compare</span>
          </Button>

          <Suspense fallback={<FavoriteButtonSkeleton />}>
            <FavoriteButton productId={productId} />
          </Suspense>
        </div>

        <Suspense>
          <RegionalExclusionNotice productId={productId} />
        </Suspense>
      </section>
    </>
  );
};

export default AddToCart;
