"use client";

import VisuallyHidden from "@/_components/visually-hidden";
import { QUERY_KEYS } from "@/_lib/constants";
import { cn } from "@/_utils/helpers";
import Link, { type LinkProps } from "next/link";
import { usePathname, type ReadonlyURLSearchParams } from "next/navigation";
import { type ReactNode } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

type PaginationProps = {
  pageSize: number;
  totalSize: number;
  currentPage: number;
  searchParams?: ReadonlyURLSearchParams;
};

const Pagination = ({
  pageSize,
  totalSize,
  currentPage,
  searchParams,
}: PaginationProps) => {
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

  // Keep adding pages till the total number becomes 5
  while (pages.length < 5) {
    let noPreviousAdded = true;
    let noNextAdded = true;

    const firstPage = pages[0];
    if (firstPage && firstPage > 1) {
      pages.unshift(firstPage - 1);
      noPreviousAdded = false;
    }

    const lastPage = pages[pages.length - 1];
    if (lastPage && lastPage < noOfPages) {
      pages.push(lastPage + 1);
      noNextAdded = false;
    }

    // No pages were added
    if (noPreviousAdded && noNextAdded) {
      break;
    }
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <PaginationLink href={getHref(1)}>
        <VisuallyHidden>First page</VisuallyHidden>
        <MdOutlineKeyboardDoubleArrowLeft />
      </PaginationLink>

      <PaginationLink href={getHref(currentPage - 1)}>
        <VisuallyHidden>Previous page</VisuallyHidden>
        <MdKeyboardArrowLeft />
      </PaginationLink>

      {pages.map((page) => (
        <PaginationLink
          key={page}
          href={getHref(page)}
          isCurrent={page === currentPage}
        >
          {page}
        </PaginationLink>
      ))}

      <PaginationLink href={getHref(currentPage + 1)}>
        <VisuallyHidden>Next page</VisuallyHidden>
        <MdKeyboardArrowRight />
      </PaginationLink>

      <PaginationLink href={getHref(noOfPages)}>
        <VisuallyHidden>Last page</VisuallyHidden>
        <MdOutlineKeyboardDoubleArrowRight />
      </PaginationLink>
    </div>
  );
};

export default Pagination;

const PaginationLink = ({
  children,
  isCurrent,
  ...delegated
}: Omit<LinkProps, "className" | "scroll"> & {
  children?: ReactNode;
  isCurrent?: boolean;
}) => {
  return (
    <Link
      className={cn(
        "border-brand-dark-gray text-brand-very-dark-gray grid size-7 place-items-center rounded-sm border text-sm font-bold leading-[22px]",
        isCurrent && "text-brand-primary border-brand-primary",
      )}
      scroll={false}
      {...delegated}
    >
      {children}
    </Link>
  );
};
