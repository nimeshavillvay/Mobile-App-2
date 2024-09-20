import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

const ProductCardVariantSelectorSkeleton = () => {
  return (
    <>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="mt-1 h-10 w-full" />
    </>
  );
};

export default ProductCardVariantSelectorSkeleton;
