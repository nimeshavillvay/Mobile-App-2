"use client";

import Pagination from "@/(old-design)/_components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { changeSearchParams } from "./client-helpers";
import {
  INIT_PAGE_NUMBER,
  INIT_PER_PAGE,
  PAGE_SIZES,
  QUERY_KEYS,
} from "./constants";
import PurchasedItemsMobilePagination from "./purchased-items-mobile-pagination";

const TotalCountAndPagination = ({
  isLoading,
  totalItems,
  itemCountOnly = false,
}: {
  isLoading: boolean;
  totalItems: number;
  itemCountOnly?: boolean;
}) => {
  const urlSearchParams = useSearchParams();
  const page = Number(urlSearchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    urlSearchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE,
  );

  const totalPagesCount = Math.ceil(totalItems / perPage);

  const [openMobilePagination, setMobilePagination] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <div className="my-6 hidden flex-row justify-between text-brand-gray-400 md:flex">
          {!isLoading && (
            <div>
              {(page - 1) * perPage + 1} -{" "}
              {Math.min(page * perPage, totalItems)} of {totalItems}
            </div>
          )}

          {!itemCountOnly && (
            <>
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
            </>
          )}
        </div>
      </div>

      {!itemCountOnly && (
        <div className="overflow-hidden py-3 md:hidden">
          <div className="flex flex-row justify-center gap-1 font-bold">
            <button className="flex flex-row items-center bg-gray-100 px-3 py-3 text-base uppercase text-brand-gray-400">
              <MdArrowBack className="mr-[5px] text-2xl leading-none" />
              Back
            </button>

            <button
              className="text-brand-[#000] flex w-full max-w-28 flex-row items-center justify-center rounded-sm border-2 border-black bg-gray-100 px-3 py-3 text-base font-bold uppercase"
              onClick={() => setMobilePagination(true)}
            >
              {page}/{totalPagesCount}
              <ChevronDown className="h-5 w-8 shrink-0" />
            </button>

            <button className="flex flex-row items-center bg-gray-100 px-3 py-3 uppercase text-brand-gray-400">
              Next
              <MdArrowForward className="ml-[5px] text-2xl leading-none" />
            </button>
          </div>

          <PurchasedItemsMobilePagination
            open={openMobilePagination}
            setOpen={setMobilePagination}
            totalPagesCount={totalPagesCount}
          />
        </div>
      )}
    </>
  );
};

export default TotalCountAndPagination;
