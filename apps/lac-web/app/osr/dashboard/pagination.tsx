"use client";

import { QUERY_KEYS } from "@/old/_lib/constants";
import {
  Pagination as PaginationComponent,
  PaginationLink as PaginationComponentLink,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  pageSize: number;
  totalSize: number;
  currentPage: number;
};

const Pagination = ({ pageSize, totalSize, currentPage }: PaginationProps) => {
  const searchParams = useSearchParams();
  const noOfPages = Math.ceil(totalSize / pageSize);
  const pathname = usePathname();

  const getHref = (pageNo: number) => {
    let verifiedPageNo = pageNo;

    if (pageNo <= 0) {
      verifiedPageNo = 1;
    } else if (pageNo > noOfPages) {
      verifiedPageNo = noOfPages;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERY_KEYS.PAGE, verifiedPageNo.toString());

    return `${pathname}?${newSearchParams.toString()}`;
  };

  const pages = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter((page) => page >= 1 && page <= noOfPages);

  return (
    <div className="flex flex-row items-center gap-1">
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={getHref(currentPage - 1)} />
          </PaginationItem>

          {currentPage - 2 > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationComponentLink
                href={getHref(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationComponentLink>
            </PaginationItem>
          ))}

          {currentPage + 2 < noOfPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext href={getHref(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};

export default Pagination;
