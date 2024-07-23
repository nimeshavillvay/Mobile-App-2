import { API_BASE_URL, API_KEY } from "@/lib/constants";
import {
  ProductCard as ProductCardPrimitive,
  ProductCardSkeleton,
} from "@repo/native-ui/components/product-card";
import useSuspensePriceCheck from "@repo/shared-logic/apis/hooks/product/use-suspense-price-check.hook";
import { type ComponentProps, Suspense } from "react";

type ProductCardProps = Omit<
  ComponentProps<typeof ProductCardPrimitive>,
  "price" | "listPrice"
> & {
  readonly token: string;
};

const ProductCardBase = ({
  token,
  productId,
  ...delegated
}: ProductCardProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    [
      {
        productId,
        qty: 1,
      },
    ],
  );
  const price = priceCheckQuery.data.productPrices[0]?.price ?? 0;
  const listPrice = priceCheckQuery.data.productPrices[0]?.listPrice ?? 0;

  return (
    <ProductCardPrimitive
      {...delegated}
      productId={productId}
      price={price}
      listPrice={listPrice}
    />
  );
};

const ProductCard = (props: ProductCardProps) => {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <ProductCardBase {...props} />
    </Suspense>
  );
};

export default ProductCard;
