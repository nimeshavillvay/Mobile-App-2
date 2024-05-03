"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { useFilterParams } from "./use-filter-params.hook";

export const ProductsGridPagination = ({
  totalPages,
}: {
  totalPages: number;
}) => {
  const pathname = usePathname();
  const { pageNo, searchParams } = useFilterParams();

  const previousPage = pageNo - 1 < 1 ? 1 : pageNo - 1;
  const nextPage = pageNo + 1 > totalPages ? totalPages : pageNo + 1;

  const getHref = (page: number) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set("page", page.toString());
    return `${pathname}?${newUrlSearchParams.toString()}`;
  };

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={getHref(previousPage)} />
        </PaginationItem>

        {pageNo !== previousPage && (
          <>
            {previousPage > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={getHref(previousPage)}>
                {previousPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink href={getHref(pageNo)} isActive>
            {pageNo}
          </PaginationLink>
        </PaginationItem>

        {pageNo !== nextPage && (
          <>
            <PaginationItem>
              <PaginationLink href={getHref(nextPage)}>
                {nextPage}
              </PaginationLink>
            </PaginationItem>

            {nextPage < totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        <PaginationItem>
          <PaginationNext href={getHref(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export const ProductsGridPaginationSkeleton = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-1 pt-4">
      <Skeleton className="h-9 w-28" />

      <Skeleton className="size-9" />

      <Skeleton className="size-9" />

      <Skeleton className="size-9" />

      <Skeleton className="h-9 w-20" />
    </div>
  );
};
