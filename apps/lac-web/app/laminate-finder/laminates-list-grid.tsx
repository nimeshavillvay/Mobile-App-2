"use client";

import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "@/_hooks/laminate/use-suspense-search-laminate-list.hook";
import { Suspense, type ComponentProps } from "react";
import {
  LaminatesGridList,
  LaminatesGridListSkeleton,
} from "./components/laminates-grid-list";

type LaminateListGridProps = {
  readonly token: string;
};

const LaminateListGrid = ({ token }: LaminateListGridProps) => {
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

  return data.pagination.totalCount > 0 ? (
    <Suspense fallback={<LaminatesGridListSkeleton />}>
      <LaminatesGridList products={products} token={token} />
    </Suspense>
  ) : (
    "No results found"
  );
};

export default LaminateListGrid;
