import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { type ComponentProps } from "react";
import AttributesSelector from "./attributes-selector";
import Product from "./product";
import ProductsGridHeader from "./products-grid-header";

type ProductsGridProps = {
  products: (ComponentProps<typeof Product>["product"] & {
    groupId: string;
  })[];
};

const ProductsGrid = ({ products }: ProductsGridProps) => {
  const mappedProducts: {
    prop: ComponentProps<typeof Product>["product"];
    info: { groupId: string };
  }[] = products.map((product) => ({
    prop: {
      groupName: product.groupName,
      variants: product.variants,
    },
    info: {
      groupId: product.groupId,
    },
  }));

  return (
    <section className="my-14 space-y-3 md:my-20 md:space-y-6">
      <ProductsGridHeader />

      {/* Mobile products list */}
      <div className="container flex flex-col gap-3 md:hidden">
        {mappedProducts.map(({ prop, info }) => (
          <Product key={info.groupId} orientation="horizontal" product={prop} />
        ))}
      </div>

      {/* Desktop products grid */}
      <div className="container hidden flex-row gap-10 md:flex">
        <AttributesSelector />

        <div className="grid flex-1 grid-cols-5 gap-5">
          {mappedProducts.map(({ prop, info }) => (
            <Product key={info.groupId} product={prop} />
          ))}
        </div>
      </div>

      <Pagination className="pt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default ProductsGrid;
