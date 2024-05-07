"use client";

import { ProductsGridList } from "@/_components/products-grid";
import { useRouter } from "next/navigation";
import { type ComponentProps } from "react";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductListGridProps = {
  token: string;
  term: string;
  type: ComponentProps<typeof ProductsGridList>["type"];
};

const ProductListGrid = ({ type, term }: ProductListGridProps) => {
  const router = useRouter();
  const searchQuery = useSuspenseSearchProductList(term);

  const handleRedirect = () => {
    const firstProduct = searchQuery.data.products.results[0];
    if (searchQuery.data.products.meta.plp && firstProduct) {
      const productPath = `/products/${firstProduct.id}/${firstProduct.productTitle.replace(/ /g, "-")}`;
      router.push(productPath);
    }
  };

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

  if (
    searchQuery.data.products.meta.plp &&
    searchQuery.data.products.results.length > 0
  ) {
    handleRedirect();
    return null;
  }

  return <ProductsGridList products={products} type={type} />;
};

export default ProductListGrid;
