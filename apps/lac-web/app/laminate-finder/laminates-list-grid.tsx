"use client";

import { ProductsGridList } from "@/_components/products-grid";
import { type ComponentProps } from "react";
import useSuspenseLaminateFilters from "./use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "./use-suspense-search-laminate-list.hook";

type LaminateListGridProps = {
  readonly token: string;
  readonly type: ComponentProps<typeof ProductsGridList>["type"];
};

const LaminateListGrid = ({ token, type }: LaminateListGridProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const { data } = useSuspenseSearchLaminateList(
    token,
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
          onSale: variant.isSaleItem,
          isNewItem: variant.isNewItem,
        })),
      },
      info: {
        groupId: product.groupId,
      },
    }));

  return <ProductsGridList products={products} type={type} token={token} />;
};

export default LaminateListGrid;
