"use client";

import useSuspenseSearch from "@/_hooks/search/use-suspense-search.hook";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { usePathname } from "next/navigation";
import useFilterParams from "./use-filter-params.hook";

export const ProductsGridPagination = ({
  token,
  categoryId,
}: {
  token: string;
  categoryId: string;
}) => {
  const pathname = usePathname();
  const { pageNo, searchParams } = useFilterParams(token, categoryId);

  const searchQuery = useSuspenseSearch(token, {
    categoryId,
    groupResults: true,
    page: pageNo,
  });

  const totalPages = Math.ceil(searchQuery.data.pagination.totalCount / 20);

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
