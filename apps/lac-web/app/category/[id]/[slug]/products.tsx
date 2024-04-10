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
      total={parseInt(searchQuery.data.pagination[0].db_count)}
      page={{
        current: 1,
        total: 15,
      }}
      products={searchQuery.data.group_list.map((product) => ({
        groupId: product.groupid,
        groupName: product.item_group_name,
        variants: product.itemSkuList.map((variant) => ({
          id: variant.productid,
          slug: variant.slug,
          title: variant.item_name,
        })),
      }))}
      filters={filters}
    />
  );
};

export default Products;
