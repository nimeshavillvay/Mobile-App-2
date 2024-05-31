"use client";

import { ProductsGridList } from "@/_components/products-grid";
import { type ComponentProps } from "react";
import useSuspenseCategoryFilters from "./use-suspense-category-filters.hook";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductListGridProps = {
  readonly token: string;
  readonly categoryId: string;
  readonly type: ComponentProps<typeof ProductsGridList>["type"];
};

const ProductListGrid = ({ token, categoryId, type }: ProductListGridProps) => {
  const categoryFiltersQuery = useSuspenseCategoryFilters({
    token,
    categoryId,
  });
  const { data } = useSuspenseSearchProductList(
    token,
    categoryId,
    categoryFiltersQuery.data,
  );

  const products: ComponentProps<typeof ProductsGridList>["products"] =
    data.groupList.map((product) => ({
      prop: {
        groupName: product.productGroupName,
        groupImage: product.groupImage,
        variants: product.productSkuList.map((variant) => ({
          id: variant.productId,
          slug: variant.slug,
          sku: variant.productSku,
          title: variant.productName,
          image: variant.image,
          uom: variant.unitOfMeasure,
        })),
      },
      info: {
        groupId: product.groupId,
      },
    }));

  return <ProductsGridList products={products} type={type} token={token} />;
};

export default ProductListGrid;
