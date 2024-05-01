"use client";

import ProductCard from "@/_components/product-card";
import useSuspenseSearch from "@/_hooks/search/use-suspense-search.hook";
import { cn } from "@/_lib/utils";
import { type ComponentProps } from "react";

type ProductsGridListProps = {
  token: string;
  categoryId: string;
  type: "mobile" | "desktop";
};

export const ProductsGridList = ({
  token,
  categoryId,
  type,
}: ProductsGridListProps) => {
  const searchQuery = useSuspenseSearch(token, {
    categoryId,
    groupResults: true,
    page: 1,
  });

  const products: {
    prop: ComponentProps<typeof ProductCard>["product"];
    info: { groupId: string };
  }[] = searchQuery.data.groupList.map((product) => ({
    prop: {
      groupName: product.productGroupName,
      groupImage: product.groupImage,
      variants: product.productSkuList.map((variant) => ({
        id: variant.productId,
        slug: variant.slug,
        title: variant.productName,
        image: variant.image,
      })),
    },
    info: {
      groupId: product.groupId,
    },
  }));

  return (
    <div
      className={cn(
        type === "mobile"
          ? "container flex flex-col gap-3 md:hidden"
          : "grid flex-1 grid-cols-5 gap-5",
      )}
    >
      {products.map(({ prop, info }) => (
        <ProductCard
          key={info.groupId}
          orientation={type === "mobile" ? "horizontal" : "vertical"}
          product={prop}
        />
      ))}
    </div>
  );
};
