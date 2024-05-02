import {
  ProductsGrid,
  ProductsGridFilters,
  ProductsGridHeader,
  ProductsGridList,
} from "@/_components/new-products-grid";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { cookies } from "next/headers";

type ProductsListProps = {
  categoryId: string;
};

const ProductsList = ({ categoryId }: ProductsListProps) => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return null;
  }

  return (
    <ProductsGrid>
      <ProductsGridHeader token={tokenCookie.value} categoryId={categoryId} />

      {/* Mobile products list */}
      <ProductsGridList
        type="mobile"
        token={tokenCookie.value}
        categoryId={categoryId}
      />

      {/* Desktop products grid */}
      <div className="container hidden flex-row items-start gap-10 md:flex">
        <ProductsGridFilters
          token={tokenCookie.value}
          categoryId={categoryId}
        />

        <ProductsGridList
          type="desktop"
          token={tokenCookie.value}
          categoryId={categoryId}
        />
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
    </ProductsGrid>
  );
};

export default ProductsList;
