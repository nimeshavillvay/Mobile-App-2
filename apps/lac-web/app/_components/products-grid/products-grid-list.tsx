"use client";

import ProductCard from "@/_components/product-card";
import ProductCardSkeleton from "@/_components/product-card-skeleton";
import { cn } from "@/_lib/utils";
import { Suspense, type ComponentProps, type ReactNode } from "react";

const ProductsGridListContainer = ({
  type,
  children,
}: {
  type: "mobile" | "desktop";
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        type === "mobile"
          ? "flex flex-col gap-3 md:hidden"
          : "grid flex-1 gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5",
      )}
    >
      {children}
    </div>
  );
};

export const ProductsGridList = ({
  type,
  products,
  token,
}: {
  type: ComponentProps<typeof ProductsGridListContainer>["type"];
  products: {
    prop: ComponentProps<typeof ProductCard>["product"];
    info: { groupId: string };
  }[];
  token: string;
}) => {
  const orientation = type === "mobile" ? "horizontal" : "vertical";

  return (
    <ProductsGridListContainer type={type}>
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
  type: ComponentProps<typeof ProductsGridListContainer>["type"];
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
