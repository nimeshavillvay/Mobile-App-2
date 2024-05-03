"use client";

import type { Filters } from "@/_lib/types";
import { ChevronDown } from "@repo/web-ui/components/icons/chevron-down";
import { Close as CloseIcon } from "@repo/web-ui/components/icons/close";
import { Settings } from "@repo/web-ui/components/icons/settings";
import { Button } from "@repo/web-ui/components/ui/button";
import { Separator } from "@repo/web-ui/components/ui/separator";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { type ReactNode } from "react";
import { useFilterParams, type SelectedValues } from "./use-filter-params.hook";

export const ProductsGridHeader = ({
  filters,
  totalCount,
  totalPages,
}: {
  filters: Filters[];
  totalCount: number;
  totalPages: number;
}) => {
  const { pageNo, selectedValues, searchParams } = useFilterParams(filters);
  const mappedSelectedValues: (SelectedValues[string] & { id: string })[] = [];
  for (const [key, value] of Object.entries(selectedValues)) {
    mappedSelectedValues.push({ ...value, id: key });
  }

  const clear = (attributeId: string, valueId?: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(attributeId, valueId);
    window.history.pushState(null, "", `?${newParams.toString()}`);
  };

  const clearAll = () => {
    const newParams = new URLSearchParams(searchParams);

    mappedSelectedValues.forEach((selectedValue) => {
      newParams.delete(selectedValue.id);
    });

    window.history.pushState(null, "", `?${newParams.toString()}`);
  };

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

      {/* Desktop selected attributes viewer */}
      {mappedSelectedValues.length > 0 && (
        <div className="hidden md:flex md:flex-row md:items-center md:gap-2">
          {mappedSelectedValues.map((selectedValue) => (
            <DesktopAttributePill
              key={selectedValue.id}
              id={selectedValue.id}
              name={selectedValue.name}
              values={selectedValue.values}
              clear={clear}
            />
          ))}

          <Button
            variant="ghost"
            className="flex h-fit flex-row items-center gap-2.5 rounded-full px-4 py-2.5"
            onClick={clearAll}
          >
            <span className="text-sm font-bold">Clear all</span>

            <CloseIcon width={16} height={16} />
          </Button>
        </div>
      )}
    </header>
  );
};

const MobileAttributePill = ({ children }: { children: ReactNode }) => {
  return (
    <button className="flex shrink-0 snap-start flex-row items-center gap-2 rounded-full border border-wurth-gray-250 px-4 py-3 text-sm font-medium text-wurth-gray-800 shadow-sm">
      {children}
    </button>
  );
};

const DesktopAttributePill = ({
  id,
  name,
  values,
  clear,
}: {
  id: string;
  name: string;
  values: { name: string; id: string }[];
  clear: (attributeId: string, valueId?: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center gap-2 rounded-full border border-wurth-gray-250 bg-white px-4 py-2.5 shadow-sm">
      <span className="text-sm font-medium text-wurth-gray-800">{name}</span>

      <Separator orientation="vertical" className="h-5" />

      <ul className="flex flex-row items-center gap-1">
        {values.length < 3 ? (
          values.map((value) => (
            <li key={value.id}>
              <Button
                variant="subtle"
                className="flex h-fit flex-row items-center gap-2 rounded-sm px-1 py-0.5"
                onClick={() => clear(id, value.id)}
              >
                <span className="text-xs font-normal text-wurth-gray-800">
                  {value.name}
                </span>

                <CloseIcon width={12} height={12} />
              </Button>
            </li>
          ))
        ) : (
          <li>
            <Button
              variant="subtle"
              className="flex h-fit flex-row items-center gap-2 rounded-sm px-1 py-0.5"
              onClick={() => clear(id)}
            >
              <span className="text-xs font-normal text-wurth-gray-800">
                {values.length} selected
              </span>

              <CloseIcon width={12} height={12} />
            </Button>
          </li>
        )}
      </ul>
    </div>
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
