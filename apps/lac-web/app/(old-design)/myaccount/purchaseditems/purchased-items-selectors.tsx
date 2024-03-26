"use client";

import DatePicker from "@/(old-design)/_components/date-picker";
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
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useId,
  useState,
} from "react";
import { DURATIONS } from "./constants";
import { Option } from "./types";

type PurchasedItemsSelectorProps = {
  fromDate: Date;
  setFromDate: Dispatch<SetStateAction<Date>>;
  toDate: Date;
  setToDate: Dispatch<SetStateAction<Date>>;
  onSearch: MouseEventHandler<HTMLButtonElement>;
  onReset: MouseEventHandler<HTMLButtonElement>;
};

const PurchasedItemsSelectors = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onSearch,
  onReset,
}: PurchasedItemsSelectorProps) => {
  const initialDuration = DURATIONS[DURATIONS.length - 2]; // Initial duration before last item in the `DURATIONS` array
  const customDuration = DURATIONS[DURATIONS.length - 1]; // Custom duration: last item in the `DURATIONS` array
  const [duration, setDuration] = useState<Option>(initialDuration as Option);

  const id = useId();
  const durationId = `duration-${id}`;

  const handleDurationChange = (value: string) => {
    setDuration(
      DURATIONS.find((duration) => duration.value === value) ??
        (initialDuration as Option),
    );

    if (value == "0") return;

    setFromDate(
      new Date(dayjs().subtract(Number(value), "months").format("YYYY-MM-DD")),
    );
    setToDate(new Date(dayjs().format("YYYY-MM-DD")));
  };

  return (
    <div className="col-span-4 flex flex-col items-center justify-between bg-brand-gray-100 px-4 py-5 sm:flex-row">
      <div className="min-w-[160px] text-brand-gray-500">
        <Label htmlFor={durationId} className="text-nowrap font-bold">
          Duration
        </Label>

        <Select
          value={duration.value}
          onValueChange={function (value) {
            handleDurationChange(value);
          }}
        >
          <SelectTrigger id={durationId} className="h-8 py-0">
            <SelectValue>{duration.label}</SelectValue>
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
            setDuration(customDuration as Option);
          }}
        />

        <div>to</div>

        <DatePicker
          date={toDate}
          onSelectDate={(date) => {
            setToDate(date);
            setDuration(customDuration as Option);
          }}
        />
      </div>

      <div className="mt-4 flex flex-row items-center gap-2">
        <Button className="min-w-24" onClick={onSearch}>
          Search
        </Button>
        <Button className="min-w-24 bg-brand-secondary" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default PurchasedItemsSelectors;
