"use client";

import ProductsGrid from "@/_components/products-grid";
import useSuspenseSearch from "@/_hooks/search/use-suspense-search.hook";

const Products = () => {
  const { data } = useSuspenseSearch({ groupResults: true, page: 1 });

  return (
    <ProductsGrid
      products={data.group_list.map((product) => ({
        groupId: product.groupid,
        groupName: product.item_group_name,
        variants: product.itemSkuList.map((variant) => ({
          id: variant.productid,
          slug: variant.slug,
          title: variant.item_name,
        })),
      }))}
    />
  );
};

export default Products;
