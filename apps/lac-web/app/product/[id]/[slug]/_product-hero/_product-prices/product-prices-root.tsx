import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense, type ComponentProps } from "react";
import ProductPrices from "./product-prices";

const ProductPricesWrapper = (
  props: Omit<ComponentProps<typeof ProductPrices>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return <ProductPrices token={sessionCookie.value} {...props} />;
};

const ProductPricesRoot = ({
  className,
  ...delegated
}: ComponentProps<typeof ProductPricesWrapper>) => {
  return (
    <Suspense
      fallback={<Skeleton className={cn(className, "h-28 md:h-[6.75rem]")} />}
    >
      <ProductPricesWrapper className={className} {...delegated} />
    </Suspense>
  );
};

export default ProductPricesRoot;