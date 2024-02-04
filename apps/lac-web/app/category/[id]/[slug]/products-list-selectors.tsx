"use client";

import Pagination from "@/_components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { cn } from "@/_utils/helpers";
import * as Label from "@radix-ui/react-label";
import { useId } from "react";
import { PAGE_SIZES, SORTING_TYPES } from "./constants";

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

  const selectedSorting = SORTING_TYPES.find(
    (sortingType) => sortingType.value === sorting,
  );

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
            <Label.Root htmlFor={sortId}>Sort by :</Label.Root>

            <Select value={sorting} onValueChange={onSortingChange}>
              <SelectTrigger id={sortId}>
                <SelectValue>{selectedSorting?.label}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                {SORTING_TYPES.map((sortingType) => (
                  <SelectItem key={sortingType.value} value={sortingType.value}>
                    {sortingType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row">
            <Label.Root htmlFor={pageSizeId}>Per Page :</Label.Root>

            <Select value={perPage} onValueChange={onPerPageChange}>
              <SelectTrigger id={pageSizeId}>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {PAGE_SIZES.map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Pagination
            pageSize={pageSize}
            totalSize={total}
            currentPage={pageNo}
            onPageChange={(page) => onPageNoChange?.(page)}
          />
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
