"use client";

import { ProductsGridList } from "@/_components/products-grid";
import { useRouter } from "next/navigation";
import { type ComponentProps } from "react";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductListGridProps = {
  token: string;
  term: string;
  type: ComponentProps<typeof ProductsGridList>["type"];
  pageNo: string;
};

const ProductListGrid = ({ type, term, pageNo }: ProductListGridProps) => {
  const router = useRouter();
  const searchQuery = useSuspenseSearchProductList(term, pageNo);
  const handleRedirect = () => {
    if (searchQuery.data.summary.plp == true) {
      const productPath = `/product/${searchQuery.data.results.id}/${searchQuery.data.results.slug}`;
      router.push(productPath);
    }
  };

  if (searchQuery.data.summary.plp) {
    handleRedirect();
    return null;
  } else {
    const products: ComponentProps<typeof ProductsGridList>["products"] =
      searchQuery.data.results.map((product) => ({
        prop: {
          groupName: product.id,
          groupImage: product.itemImage,
          variants: [
            {
              id: product.id,
              slug: product.slug,
              title: product.productTitle,
              image: product.itemImage,
            },
          ],
        },
        info: {
          groupId: product.id,
        },
      }));
    return <ProductsGridList products={products} type={type} />;
  }
};

export default ProductListGrid;
