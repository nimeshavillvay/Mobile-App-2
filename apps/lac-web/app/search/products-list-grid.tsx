"use client";

import { ProductsGridList } from "@/_components/products-grid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@repo/web-ui/components/ui/dialog";
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

  const handleCloseDialog = () => {
    router.push("/");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleCloseDialog(); // Redirect when dialog is closed
    }
  };

  if (
    searchQuery.data.results &&
    Array.isArray(searchQuery.data.results) &&
    searchQuery.data.results.length === 0
  ) {
    return (
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialogOverlay />
        <DialogContent>
          <h2>No Results Found</h2>
          <p>Sorry, no results were found for your search term.</p>
          <DialogClose />
        </DialogContent>
      </Dialog>
    );
  }

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
