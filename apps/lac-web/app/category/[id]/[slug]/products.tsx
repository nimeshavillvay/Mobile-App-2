"use client";

import ProductsGrid from "@/_components/products-grid";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import useSuspenseSearch from "@/_hooks/search/use-suspense-search.hook";

type ProductsProps = {
  catId: string;
};

const Products = ({ catId }: ProductsProps) => {
  const searchQuery = useSuspenseSearch({ groupResults: true, page: 1 });
  const filterQuery = useSuspenseFilters({
    type: "Categories",
    id: catId,
    membershipId: 1,
  });

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
      filters={filterQuery.data.map((filter) => ({
        id: filter.id,
        title: filter.filter,
        values: filter.values.map((value) => ({
          id: value.id.toString(),
          value: value.value,
          active: value.active,
        })),
      }))}
    />
  );
};

export default Products;
