"use client";

import Pagination from "@/(old-design)/_components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { useSearchParams } from "next/navigation";
import { changeSearchParams } from "./client-helpers";
import {
  INIT_PAGE_NUMBER,
  INIT_PER_PAGE,
  PAGE_SIZES,
  QUERY_KEYS,
} from "./constants";

const TotalCountAndPagination = ({
  isLoading,
  totalItems,
}: {
  isLoading: boolean;
  totalItems: number;
}) => {
  const urlSearchParams = useSearchParams();
  const page = Number(urlSearchParams.get("page") ?? INIT_PAGE_NUMBER);
  const perPage = Number(urlSearchParams.get("perPage") ?? INIT_PER_PAGE);

  return (
    <div className="my-6 hidden flex-row justify-between text-brand-gray-400 md:flex">
      {!isLoading && (
        <div>
          {(page - 1) * perPage + 1} - {Math.min(page * perPage, totalItems)} of{" "}
          {totalItems}
        </div>
      )}

      <div className="flex items-center">
        <div className="mr-2">Per Page:</div>

        <Select
          value={perPage.toString()}
          onValueChange={(value) => {
            changeSearchParams(urlSearchParams, [
              {
                key: QUERY_KEYS.PAGE,
                value: "1",
              },
              {
                key: QUERY_KEYS.PER_PAGE,
                value: value,
              },
            ]);
          }}
        >
          <SelectTrigger className="h-8 w-[70px] py-0">
            <SelectValue>{perPage.toString()}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            {PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {totalItems > 0 ? (
        <Pagination
          pageSize={perPage}
          totalSize={totalItems}
          currentPage={page}
          searchParams={urlSearchParams}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TotalCountAndPagination;
