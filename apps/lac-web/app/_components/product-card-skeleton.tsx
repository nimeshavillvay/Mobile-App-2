import { cn } from "@/_lib/utils";
import { ProductCardSkeleton as ProductCardSkeletonPrimitive } from "@repo/web-ui/components/product-card";
import { type ComponentProps } from "react";

type ProductCardSkeletonProps = {
  orientation?: ComponentProps<
    typeof ProductCardSkeletonPrimitive
  >["orientation"];
};

const ProductCardSkeleton = ({ orientation }: ProductCardSkeletonProps) => {
  return (
    <ProductCardSkeletonPrimitive
      orientation={orientation}
      className={cn(
        "shrink-0 snap-start",
        orientation === "horizontal" && "w-full",
      )}
    />
  );
};

export default ProductCardSkeleton;
