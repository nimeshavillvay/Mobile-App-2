"use client";

import { Suspense, type ComponentProps } from "react";
import {
  LaminatesGridList,
  LaminatesGridListSkeleton,
} from "./components/laminates-grid-list";
import useSuspenseLaminateFilters from "./hooks/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "./hooks/use-suspense-search-laminate-list.hook";

type LaminateListGridProps = {
  readonly token: string;
  readonly type: ComponentProps<typeof LaminatesGridList>["type"];
};

const LaminateListGrid = ({ token, type }: LaminateListGridProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const { data } = useSuspenseSearchLaminateList(
    token,
    categoryFiltersQuery.data,
  );

  const products: ComponentProps<typeof LaminatesGridList>["products"] =
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

  return (
    <Suspense fallback={<LaminatesGridListSkeleton />}>
      <LaminatesGridList products={products} token={token} />
    </Suspense>
  );
};

export default LaminateListGrid;
