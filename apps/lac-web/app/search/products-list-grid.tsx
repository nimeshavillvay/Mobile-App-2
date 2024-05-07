"use client";

import { ProductsGridList } from "@/_components/products-grid";
import { type ComponentProps } from "react";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductListGridProps = {
  token: string;
  term: string;
  type: ComponentProps<typeof ProductsGridList>["type"];
};

const ProductListGrid = ({ type, term }: ProductListGridProps) => {
  const searchQuery = useSuspenseSearchProductList(term);
  const products: ComponentProps<typeof ProductsGridList>["products"] =
    searchQuery.data.products.results.map((product) => ({
      prop: {
        groupName: product.id,
        groupImage: product.itemImages,
        variants: [
          {
            id: product.id,
            slug: product.productTitle,
            title: product.productTitle,
            image: product.itemImages,
          },
        ],
      },
      info: {
        groupId: product.id,
      },
    }));

  return <ProductsGridList products={products} type={type} />;
};

export default ProductListGrid;
