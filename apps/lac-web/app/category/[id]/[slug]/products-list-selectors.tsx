"use client";

import VisuallyHidden from "@/_components/visually-hidden";
import { cn } from "@/_utils/helpers";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { useId, type ReactNode } from "react";
import {
  MdCheck,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineArrowDropDown,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { PAGE_SIZES, SORTING_TYPES } from "./constants";

type PaginationButtonType = "first" | "previous" | number | "next" | "last";
type ProductsListSelectorsProps = {
  pageNo?: number;
  pageSize?: number;
  total?: number;
  sorting?: (typeof SORTING_TYPES)[number]["value"];
  onSortingChange?: (value: string) => void;
  onPerPageChange?: (value: string) => void;
  onPageNoChange?: (value: number) => void;
};

const ProductsListSelectors = ({
  pageNo = 0,
  pageSize = 0,
  total = 0,
  sorting = SORTING_TYPES[0].value,
  onSortingChange,
  onPerPageChange,
  onPageNoChange,
}: ProductsListSelectorsProps) => {
  const id = useId();
  const sortId = `sort-${id}`;
  const pageSizeId = `per-page-${id}`;

  const isLoading = !pageNo || !pageSize || !total;

  const perPage = pageSize ? pageSize.toString() : PAGE_SIZES[0];
  const totalPages = Math.ceil(total / pageSize);

  const selectedSorting = SORTING_TYPES.find(
    (sortingType) => sortingType.value === sorting,
  );

  const paginationButtons: {
    value: PaginationButtonType;
    num: number;
    active?: boolean;
  }[] = [];

  // First page
  paginationButtons.push({
    value: "first",
    num: 1,
  });
  // Previous page
  paginationButtons.push({
    value: "previous",
    num: pageNo === 1 ? 1 : pageNo - 1,
  });

  // Left pages
  if (pageNo === totalPages && pageNo - 4 > 0) {
    paginationButtons.push({
      value: pageNo - 4,
      num: pageNo - 4,
    });
  }
  if (pageNo >= totalPages - 1 && pageNo - 3 > 0) {
    paginationButtons.push({
      value: pageNo - 3,
      num: pageNo - 3,
    });
  }
  if (pageNo >= 3) {
    paginationButtons.push({
      value: pageNo - 2,
      num: pageNo - 2,
    });
  }
  if (pageNo >= 2) {
    paginationButtons.push({
      value: pageNo - 1,
      num: pageNo - 1,
    });
  }

  // Current page
  paginationButtons.push({
    value: pageNo,
    num: pageNo,
    active: true,
  });

  // Right pages
  if (totalPages - pageNo >= 1) {
    paginationButtons.push({
      value: pageNo + 1,
      num: pageNo + 1,
    });
  }
  if (totalPages - pageNo >= 2) {
    paginationButtons.push({
      value: pageNo + 2,
      num: pageNo + 2,
    });
  }
  if (pageNo <= 2 && totalPages - pageNo >= 3) {
    paginationButtons.push({
      value: pageNo + 3,
      num: pageNo + 3,
    });
  }
  if (pageNo === 1 && totalPages - pageNo >= 4) {
    paginationButtons.push({
      value: pageNo + 4,
      num: pageNo + 4,
    });
  }

  // Next page
  paginationButtons.push({
    value: "next",
    num: pageNo === totalPages ? totalPages : pageNo + 1,
  });
  // Last page
  paginationButtons.push({
    value: "last",
    num: totalPages,
  });

  return (
    <div
      className={cn(
        "col-span-4 flex flex-row justify-between",
        isLoading && "animate-pulse",
      )}
    >
      {!isLoading ? (
        <>
          <div>
            {(pageNo - 1) * pageSize + 1} - {Math.min(pageNo * pageSize, total)}{" "}
            of {total}
          </div>

          <div className="flex flex-row">
            <SelectLabel htmlFor={sortId}>Sort by :</SelectLabel>

            <Select.Root value={sorting} onValueChange={onSortingChange}>
              <SelectTrigger id={sortId}>
                {selectedSorting?.label}
              </SelectTrigger>

              <SelectContent>
                {SORTING_TYPES.map((sortingType) => (
                  <SelectItem key={sortingType.value} value={sortingType.value}>
                    {sortingType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select.Root>
          </div>

          <div className="flex flex-row">
            <SelectLabel htmlFor={pageSizeId}>Per Page :</SelectLabel>

            <Select.Root value={perPage} onValueChange={onPerPageChange}>
              <SelectTrigger id={pageSizeId}>{perPage}</SelectTrigger>

              <SelectContent>
                {PAGE_SIZES.map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select.Root>
          </div>

          <div className="flex h-6 flex-row items-center gap-1">
            {paginationButtons.map((button) => (
              <button
                key={button.value}
                onClick={() => onPageNoChange?.(button.num)}
                className={cn(button.active && "text-brand-primary")}
                disabled={
                  ((button.value === "first" || button.value === "previous") &&
                    pageNo === 1) ||
                  ((button.value === "next" || button.value === "last") &&
                    pageNo === totalPages)
                }
              >
                {button.value === "first" && (
                  <>
                    <VisuallyHidden>First page</VisuallyHidden>
                    <MdOutlineKeyboardDoubleArrowLeft />
                  </>
                )}

                {button.value === "previous" && (
                  <>
                    <VisuallyHidden>Previous page</VisuallyHidden>
                    <MdKeyboardArrowLeft />
                  </>
                )}

                {typeof button.value === "number" && <>{button.value}</>}

                {button.value === "next" && (
                  <>
                    <VisuallyHidden>Next page</VisuallyHidden>
                    <MdKeyboardArrowRight />
                  </>
                )}

                {button.value === "last" && (
                  <>
                    <VisuallyHidden>Last page</VisuallyHidden>
                    <MdOutlineKeyboardDoubleArrowRight />
                  </>
                )}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="h-6 w-[103px] bg-gray-300" />

          <div className="h-6 w-[121px] bg-gray-300" />

          <div className="h-6 w-[109px] bg-gray-300" />

          <div className="h-6 w-[180px] bg-gray-300" />
        </>
      )}
    </div>
  );
};

export default ProductsListSelectors;

const SelectLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) => {
  return <Label.Root htmlFor={htmlFor}>{children}</Label.Root>;
};

const SelectTrigger = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  return (
    <Select.Trigger className="flex flex-row items-center" id={id}>
      <Select.Value>{children}</Select.Value>

      <Select.Icon>
        <MdOutlineArrowDropDown />
      </Select.Icon>
    </Select.Trigger>
  );
};

const SelectContent = ({ children }: { children: ReactNode }) => {
  return (
    <Select.Portal>
      <Select.Content className="bg-white">
        <Select.Viewport>{children}</Select.Viewport>
      </Select.Content>
    </Select.Portal>
  );
};

const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return (
    <Select.Item value={value}>
      <Select.ItemText>{children}</Select.ItemText>

      <Select.ItemIndicator>
        <MdCheck />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
