"use client";

import ProductCard from "@/_components/product-card";
import { cn } from "@/_lib/utils";
import { ProductCardSkeleton } from "@repo/web-ui/components/product-card";
import { type ComponentProps, type ReactNode } from "react";

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
}: {
  type: ComponentProps<typeof ProductsGridListContainer>["type"];
  products: {
    prop: ComponentProps<typeof ProductCard>["product"];
    info: { groupId: string };
  }[];
}) => {
  return (
    <ProductsGridListContainer type={type}>
      {products.map(({ prop, info }) => (
        <ProductCard
          key={info.groupId}
          orientation={type === "mobile" ? "horizontal" : "vertical"}
          product={prop}
        />
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
        />
      ))}
    </ProductsGridListContainer>
  );
};
