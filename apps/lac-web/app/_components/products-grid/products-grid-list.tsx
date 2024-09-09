"use client";

import ProductCard from "@/_components/product-card";
import ProductCardSkeleton from "@/_components/product-card-skeleton";
import { cn } from "@/_lib/utils";
import { Suspense, type ComponentProps, type ReactNode } from "react";

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

  return (
    <ProductsGridListContainer type={type} className={className}>
      {products.map(({ prop, info }) => (
        <Suspense
          key={info.groupId}
          fallback={
            <ProductCardSkeleton
              orientation={orientation}
              stretchWidth={orientation === "vertical"}
            />
          }
        >
          <ProductCard
            orientation={orientation}
            product={prop}
            token={token}
            stretchWidth={orientation === "vertical"}
          />
        </Suspense>
      ))}
    </ProductsGridListContainer>
  );
};

export const ProductsGridListSkeleton = ({
  type,
}: {
  readonly type: ComponentProps<typeof ProductsGridListContainer>["type"];
}) => {
  return (
    <ProductsGridListContainer type={type}>
      {Array.from({ length: 20 }).map((_, index) => (
        <ProductCardSkeleton
          key={index}
          orientation={type === "mobile" ? "horizontal" : "vertical"}
          stretchWidth={type === "desktop"}
        />
      ))}
    </ProductsGridListContainer>
  );
};
