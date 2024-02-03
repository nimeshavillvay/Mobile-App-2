"use client";

import VisuallyHidden from "@/_components/visually-hidden";
import { cn } from "@/_utils/helpers";
import { type ComponentProps } from "react";
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
  onPageChange: (page: number) => void;
};

const Pagination = ({
  pageSize,
  totalSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const noOfPages = Math.ceil(totalSize / pageSize);

  const previousPages = [
    currentPage - 4,
    currentPage - 3,
    currentPage - 2,
    currentPage - 1,
  ].filter((page) => page >= 1);
  const nextPages = [
    currentPage + 1,
    currentPage + 2,
    currentPage + 3,
    currentPage + 4,
  ].filter((page) => page <= noOfPages);

  return (
    <div className="flex h-6 flex-row items-center gap-1">
      <PaginationButton
        disabled={currentPage <= 1}
        onClick={() => onPageChange(1)}
      >
        <VisuallyHidden>First page</VisuallyHidden>
        <MdOutlineKeyboardDoubleArrowLeft />
      </PaginationButton>

      <PaginationButton
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <VisuallyHidden>Previous page</VisuallyHidden>
        <MdKeyboardArrowLeft />
      </PaginationButton>

      {previousPages.map((page) => (
        <PaginationButton key={page} onClick={() => onPageChange(page)}>
          {page}
        </PaginationButton>
      ))}

      <PaginationButton isCurrent disabled>
        {currentPage}
      </PaginationButton>

      {nextPages.map((page) => (
        <PaginationButton key={page} onClick={() => onPageChange(page)}>
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        disabled={currentPage >= noOfPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <VisuallyHidden>Next page</VisuallyHidden>
        <MdKeyboardArrowRight />
      </PaginationButton>

      <PaginationButton
        disabled={currentPage >= noOfPages}
        onClick={() => onPageChange(noOfPages)}
      >
        <VisuallyHidden>Last page</VisuallyHidden>
        <MdOutlineKeyboardDoubleArrowRight />
      </PaginationButton>
    </div>
  );
};

export default Pagination;

const PaginationButton = ({
  children,
  isCurrent,
  ...delegated
}: Pick<ComponentProps<"button">, "children" | "onClick" | "disabled"> & {
  isCurrent?: boolean;
}) => {
  return (
    <button className={cn(isCurrent && "text-brand-primary")} {...delegated}>
      {children}
    </button>
  );
};
