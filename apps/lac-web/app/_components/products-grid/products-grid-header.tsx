"use client";

import { ChevronDown } from "@repo/web-ui/components/icons/chevron-down";
import { Settings } from "@repo/web-ui/components/icons/settings";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { type ReactNode } from "react";
import { useFilterParams } from "./use-filter-params.hook";

export const ProductsGridHeader = ({
  totalCount,
  totalPages,
}: {
  readonly totalCount: number;
  readonly totalPages: number;
}) => {
  const { pageNo } = useFilterParams([]);

  return (
    <header className="flex flex-col gap-3">
      {/* Mobile filters selector */}
      <div className="flex w-full snap-x scroll-pl-4 flex-row items-center gap-2 overflow-x-auto md:hidden">
        <MobileAttributePill>
          <Settings className="size-5" />

          <span className="flex flex-row items-center gap-1">
            Filters & sort
            <span className="grid size-5 place-content-center rounded-full bg-wurth-gray-800 text-xs font-semibold leading-none text-white">
              2
            </span>
          </span>
        </MobileAttributePill>

        <MobileAttributePill>
          Get it fast <ChevronDown className="size-4" />
        </MobileAttributePill>

        <MobileAttributePill>
          Offers <ChevronDown className="size-4" />
        </MobileAttributePill>
      </div>

      <div className="flex flex-row items-end justify-between text-wurth-gray-800">
        <div className="font-title text-lg font-medium tracking-normal md:text-3xl md:tracking-[-0.01406rem]">
          {totalCount} {totalCount === 1 ? "item" : "items"}
        </div>

        <div className="text-sm font-normal md:text-base">
          Page {pageNo} of {totalPages}
        </div>
      </div>
    </header>
  );
};

const MobileAttributePill = ({ children }: { readonly children: ReactNode }) => {
  return (
    <button className="flex shrink-0 snap-start flex-row items-center gap-2 rounded-full border border-wurth-gray-250 px-4 py-3 text-sm font-medium text-wurth-gray-800 shadow-sm">
      {children}
    </button>
  );
};

export const ProductsGridHeaderSkeleton = () => {
  return (
    <div className="flex flex-row items-end justify-between">
      <Skeleton className="h-7 w-24 md:h-9 md:w-36" />

      <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
    </div>
  );
};
