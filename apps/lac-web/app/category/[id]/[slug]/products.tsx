"use client";

import ProductsGrid from "@/_components/products-grid";
import useSuspenseSearch from "@/_hooks/search/use-suspense-search.hook";
import { type ComponentProps } from "react";

type ProductsProps = {
  filters: ComponentProps<typeof ProductsGrid>["filters"];
};

const Products = ({ filters }: ProductsProps) => {
  const searchQuery = useSuspenseSearch({ groupResults: true, page: 1 });

  return (
    <ProductsGrid
      total={searchQuery.data.pagination.totalCount}
      page={{
        current: 1,
        total: 15,
      }}
      products={searchQuery.data.groupList.map((product) => ({
        groupId: product.groupId,
        groupName: product.productGroupName,
        variants: product.productSkuList.map((variant) => ({
          id: variant.productId,
          slug: variant.slug,
          title: variant.productName,
        })),
      }))}
      filters={filters}
    />
  );
};

export default Products;
