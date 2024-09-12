"use client";

import ProductCard from "@/_components/product-card";
import ProductCardSkeleton from "@/_components/product-card-skeleton";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { cn } from "@/_lib/utils";
import { type ComponentProps, type ReactNode } from "react";

const ProductsGridListContainer = ({
  type,
  children,
  className,
}: {
  readonly type: "mobile" | "desktop";
  readonly children: ReactNode;
  readonly className?: ComponentProps<"div">["className"];
}) => {
  return (
    <div
      className={cn(
        type === "mobile"
          ? "flex flex-col gap-3 md:hidden"
          : "grid flex-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ProductsGridList = ({
  type,
  className,
  products,
  token,
}: {
  readonly type: ComponentProps<typeof ProductsGridListContainer>["type"];
  readonly className?: ComponentProps<
    typeof ProductsGridListContainer
  >["className"];
  readonly products: {
    prop: ComponentProps<typeof ProductCard>["product"];
    info: { groupId: string };
  }[];
  readonly token?: string;
}) => {
  const orientation = type === "mobile" ? "horizontal" : "vertical";

  const priceCheckQuery = useSuspensePriceCheck(
    token,
    products
      .flatMap((product) => product.prop.variants)
      .map((product) => ({
        productId: Number(product.id),
        qty: 1,
      })),
  );

  const gtmProducts = products
    .flatMap((product) => product.prop.variants)
    .map((product) => {
      return {
        productid: Number(product.id),
        cartid: 0,
        quantity: 1,
      };
    });
  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  return (
    <ProductsGridListContainer type={type} className={className}>
      {products.map(({ prop, info }) => {
        const productIds = prop.variants.map((item) => item.id);

        const prices = priceCheckQuery.data.productPrices.filter((price) =>
          productIds.includes(price.productId.toString()),
        );

        const productProps = {
          ...prop,
          gtmItemInfo,
        };

        return (
          <ProductCard
            key={info.groupId}
            orientation={orientation}
            product={productProps}
            token={token}
            stretchWidth={orientation === "vertical"}
            prices={prices.map((price) => ({
              listPrice: price.listPrice,
              price: price.price,
              productId: price.productId,
              uomPrice: price.uomPrice,
              uomPriceUnit: price.uomPriceUnit,
            }))}
          />
        );
      })}
    </ProductsGridListContainer>
  );
};

export const ProductsGridListSkeleton = ({
  type,
  numberOfCards = 20,
}: {
  readonly type: ComponentProps<typeof ProductsGridListContainer>["type"];
  readonly numberOfCards?: number;
}) => {
  return (
    <ProductsGridListContainer type={type}>
      {Array.from({ length: numberOfCards }).map((_, index) => (
        <ProductCardSkeleton
          key={index}
          orientation={type === "mobile" ? "horizontal" : "vertical"}
          stretchWidth={type === "desktop"}
        />
      ))}
    </ProductsGridListContainer>
  );
};
