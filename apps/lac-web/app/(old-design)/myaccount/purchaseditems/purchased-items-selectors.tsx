"use client";

import DatePicker from "@/(old-design)/_components/date-picker";
import Pagination from "@/(old-design)/_components/pagination";
import { Button } from "@/old/_components/ui/button";
import { Label } from "@/old/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import dayjs from "dayjs";
import { ChevronDown } from "lucide-react";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useId,
  useState,
} from "react";
import { DURATIONS, QUERY_KEYS } from "./constants";
import FiltersForMobileDialog from "./filters-for-mobile-dialog";

type PurchasedItemsSelectorProps = {
  fromDate: Date;
  setFromDate: Dispatch<SetStateAction<Date>>;
  toDate: Date;
  setToDate: Dispatch<SetStateAction<Date>>;
  onSearch: MouseEventHandler<HTMLButtonElement>;
  onReset: Dispatch<SetStateAction<void>>;
  isLoading: boolean;
  page: number;
  perPage: number;
  totalItems: number;
  searchParams: ReadonlyURLSearchParams;
  changeSearchParams: (
    params: {
      key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
      value: string;
    }[],
  ) => void;
};

const PurchasedItemsSelectors = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onSearch,
  onReset,
  isLoading,
  page,
  perPage,
  totalItems,
  searchParams,
  changeSearchParams,
}: PurchasedItemsSelectorProps) => {
  const initialDuration = DURATIONS.at(-2); // Initial duration before last item in the `DURATIONS` array
  const customDuration = DURATIONS.at(-1); // Custom duration: last item in the `DURATIONS` array
  const [duration, setDuration] = useState(initialDuration);
  const [open, setOpen] = useState(false);

  const id = useId();
  const durationId = `duration-${id}`;
  const formattedFromDate = dayjs(fromDate).format("YYYY-MM-DD");
  const formattedToDate = dayjs(toDate).format("YYYY-MM-DD");

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);

    if (duration) {
      setDuration(duration);
    }

    if (value == "0") return;

    setFromDate(
      new Date(dayjs().subtract(Number(value), "months").format("YYYY-MM-DD")),
    );

    setToDate(new Date(dayjs().format("YYYY-MM-DD")));
  };

  return (
    <>
      <div className="md:flex-warp col-span-4 hidden flex-col items-center justify-between bg-brand-gray-100 px-4 py-5 md:flex lg:flex-row">
        <div className="min-w-[160px] text-brand-gray-500">
          <Label htmlFor={durationId} className="text-nowrap font-bold">
            Duration
          </Label>

          <Select
            value={duration?.value}
            onValueChange={function (value) {
              handleDurationChange(value);
            }}
          >
            <SelectTrigger id={durationId} className="h-8 py-0">
              <SelectValue>{duration?.label}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              {DURATIONS.map((duration) => (
                <SelectItem key={duration.value} value={duration.value}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
          <DatePicker
            date={fromDate}
            onSelectDate={(date) => {
              setFromDate(date);
              setDuration(customDuration);
            }}
          />

          <div>to</div>

          <DatePicker
            date={toDate}
            onSelectDate={(date) => {
              setToDate(date);
              setDuration(customDuration);
            }}
          />
        </div>

        <div className="mt-4 flex flex-row items-center gap-2">
          <Button className="min-w-24" onClick={onSearch}>
            Search
          </Button>
          <Button
            className="min-w-24 bg-brand-secondary"
            onClick={() => {
              setDuration(initialDuration);
              onReset();
            }}
          >
            Reset
          </Button>
        </div>
      </div>
      <>
        <div className="py-3 sm:hidden sm:flex-row">
          <div className="mb-3 flex justify-between">
            <div
              className="items-left flex items-center text-base font-bold uppercase tracking-wide"
              onClick={function () {
                setOpen(true);
              }}
            >
              Sort & Filter
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </div>
            <div>
              {!isLoading && (
                <div className="text-base">
                  {(page - 1) * perPage + 1} -{" "}
                  {Math.min(page * perPage, totalItems)} of {totalItems}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="rounded border bg-gray-100 p-2">
              <div className="text-[10px] uppercase">Duration</div>
              <div className="font-bold">{`${formattedFromDate} - ${formattedToDate}`}</div>
            </div>
            <Pagination
              pageSize={perPage}
              totalSize={totalItems}
              currentPage={page}
              searchParams={searchParams}
            />
          </div>
        </div>
        <FiltersForMobileDialog
          open={open}
          setOpen={setOpen}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          duration={duration}
          setDuration={setDuration}
          handleDurationChange={handleDurationChange}
          changeSearchParams={changeSearchParams}
          onReset={onReset}
        />
      </>
    </>
  );
};

export default PurchasedItemsSelectors;
