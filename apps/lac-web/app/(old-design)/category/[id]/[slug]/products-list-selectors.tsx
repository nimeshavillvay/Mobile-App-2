"use client";

import Pagination from "@/old/_components/pagination";
import { Label } from "@/old/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { Skeleton } from "@/old/_components/ui/skeleton";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { useId } from "react";
import { PAGE_SIZES, SORTING_TYPES } from "./constants";

type ProductsListSelectorsProps = {
  pageNo?: number;
  pageSize?: number;
  total?: number;
  sorting?: (typeof SORTING_TYPES)[number]["value"];
  onSortingChange?: (value: string) => void;
  onPerPageChange?: (value: string) => void;
  searchParams?: ReadonlyURLSearchParams;
};

const ProductsListSelectors = ({
  pageNo = 0,
  pageSize = 0,
  total = 0,
  sorting = SORTING_TYPES[0].value,
  onSortingChange,
  onPerPageChange,
  searchParams,
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
    <div className="col-span-4 flex flex-row items-center justify-between">
      {!isLoading ? (
        <>
          <div className="text-brand-gray-500 min-w-[115px]">
            {(pageNo - 1) * pageSize + 1} - {Math.min(pageNo * pageSize, total)}{" "}
            of {total}
          </div>

          <div className="flex flex-row items-center gap-2">
            <Label htmlFor={sortId} className="text-nowrap">
              Sort by :
            </Label>

            <Select value={sorting} onValueChange={onSortingChange}>
              <SelectTrigger id={sortId} className="h-8 py-0">
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

          <div className="flex flex-row items-center gap-2">
            <Label htmlFor={pageSizeId} className="text-nowrap">
              Per Page :
            </Label>

            <Select value={perPage} onValueChange={onPerPageChange}>
              <SelectTrigger id={pageSizeId} className="h-8 py-0">
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
            searchParams={searchParams}
          />
        </>
      ) : (
        <>
          <Skeleton className="mt-[5px] h-[15px] w-[115px]" />

          <div className="flex flex-row items-center gap-2">
            <Skeleton className="mt-[5px] h-[15px] w-[52px]" />

            <Skeleton className="h-8 w-[82px]" />
          </div>

          <div className="flex flex-row items-center gap-2">
            <Skeleton className="mt-[5px] h-[15px] w-[70px]" />

            <Skeleton className="h-8 w-[62px]" />
          </div>

          <div className="flex flex-row items-center gap-1">
            {[...Array(9)].map((item, index) => (
              <Skeleton key={index} className="size-7 rounded-sm" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsListSelectors;
