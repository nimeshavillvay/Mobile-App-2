"use client";

import { ProductsGridList } from "@/_components/products-grid";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { type ComponentProps } from "react";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductListGridProps = {
  token: string;
  categoryId: string;
  type: ComponentProps<typeof ProductsGridList>["type"];
};

const ProductListGrid = ({ token, categoryId, type }: ProductListGridProps) => {
  const filtersQuery = useSuspenseFilters(token, {
    type: "Categories",
    id: categoryId,
    membershipId: 0,
  });
  const { data } = useSuspenseSearchProductList(
    token,
    categoryId,
    filtersQuery.data,
  );

  const products: ComponentProps<typeof ProductsGridList>["products"] =
    data.groupList.map((product) => ({
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

  return <ProductsGridList products={products} type={type} />;
};

export default ProductListGrid;
