"use client";

import ProductCardSkeleton from "@/_components/product-card-skeleton";
import { cn } from "@/_lib/utils";
import { Suspense, type ComponentProps, type ReactNode } from "react";
import LaminateCard from "./laminate-card";

const LaminatesGridListContainer = ({
  type,
  children,
}: {
  readonly type: "mobile" | "desktop";
  readonly children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        type === "mobile"
          ? "flex flex-col gap-3 md:hidden"
          : "grid flex-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
      )}
    >
      {children}
    </div>
  );
};

export const LaminatesGridList = ({
  type,
  products,
  token,
}: {
  readonly type: ComponentProps<typeof LaminatesGridListContainer>["type"];
  readonly products: {
    prop: ComponentProps<typeof LaminateCard>["product"];
    info: { groupId: string };
  }[];
  readonly token: string;
}) => {
  const orientation = type === "mobile" ? "horizontal" : "vertical";

  return (
    <LaminatesGridListContainer type={type}>
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
          <LaminateCard product={prop} token={token} />
        </Suspense>
      ))}
    </LaminatesGridListContainer>
  );
};

export const LaminatesGridListSkeleton = ({
  type,
}: {
  readonly type: ComponentProps<typeof LaminatesGridListContainer>["type"];
}) => {
  return (
    <LaminatesGridListContainer type={type}>
      {Array.from({ length: 20 }).map((_, index) => (
        <ProductCardSkeleton
          key={index}
          orientation={type === "mobile" ? "horizontal" : "vertical"}
          stretchWidth={type === "desktop"}
        />
      ))}
    </LaminatesGridListContainer>
  );
};
