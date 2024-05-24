import { cn } from "@/_lib/utils";
import { ProductCardSkeleton as ProductCardSkeletonPrimitive } from "@repo/web-ui/components/product-card";
import { type ComponentProps } from "react";

type ProductCardSkeletonProps = {
  orientation?: ComponentProps<
    typeof ProductCardSkeletonPrimitive
  >["orientation"];
  stretchWidth?: boolean;
};

const ProductCardSkeleton = ({
  orientation,
  stretchWidth = false,
}: ProductCardSkeletonProps) => {
  return (
    <ProductCardSkeletonPrimitive
      orientation={orientation}
      className={cn(
        "h-[25.75rem] shrink-0 snap-start md:h-[29.5rem]",
        orientation === "horizontal" && "w-full",
        stretchWidth && "md:w-full",
      )}
    />
  );
};

export default ProductCardSkeleton;
