import { cn } from "@/_lib/utils";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { Suspense } from "react";
import AddToCartForm from "./_add-to-cart-form";
import LocationStocks from "./_location-stocks";
import RegionalExclusionNotice from "./_regional-exclusion-notice";

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
            <span className="font-semibold text-wurth-gray-800">{minQty}</span>
          </div>

          <div>
            Quantity Multiple by:{" "}
            <span className="font-semibold text-wurth-gray-800">{incQty}</span>
          </div>
        </div>

        <Button variant="outline" size="icon">
          <HeartOutline className="size-4" />

          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>

      <Suspense>
        <RegionalExclusionNotice productId={productId} />
      </Suspense>
    </section>
  );
};

export default AddToCart;
