import { cn } from "@/_lib/utils";
import { Check } from "@repo/web-ui/components/icons/check";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import AddToCartForm from "./_add-to-cart-form";
import LocationStocks from "./_location-stocks";

type AddToCartProps = {
  productId: number;
  minQty: number;
  incQty: number;
  className?: string;
};

const AddToCart = ({
  productId,
  minQty,
  incQty,
  className,
}: AddToCartProps) => {
  return (
    <section className={cn("space-y-3", className)}>
      <LocationStocks productId={productId} />

      <AddToCartForm productId={productId} minQty={minQty} incQty={incQty} />

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

        <Button variant="outline" disabled className="gap-1 md:py-2">
          <Check className="size-4" />
          <span>Compare</span>
        </Button>

        <Button variant="outline" size="icon">
          <HeartOutline className="size-4" />

          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
    </section>
  );
};

export default AddToCart;
