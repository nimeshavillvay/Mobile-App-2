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
};

const PurchasedItemsSelectors = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onSearch,
}: PurchasedItemsSelectorProps) => {
  const initialDuration = DURATIONS[DURATIONS.length - 2]; // Initial duration before last item in the `DURATIONS` array
  const [duration, setDuration] = useState<Option>(initialDuration as Option);

  const id = useId();
  const durationId = `duration-${id}`;

  return (
    <div className="col-span-4 flex flex-col items-center justify-between bg-brand-gray-100 px-4 py-5 sm:flex-row">
      <div className="min-w-[160px] text-brand-gray-500">
        <Label htmlFor={durationId} className="text-nowrap font-bold">
          Duration
        </Label>

        <Select
          value={duration.value}
          onValueChange={(value) =>
            setDuration(
              DURATIONS.find((duration) => duration.value === value) ??
                (initialDuration as Option),
            )
          }
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
        <DatePicker date={fromDate} setDate={setFromDate} />

        <div>to</div>

        <DatePicker date={toDate} setDate={setToDate} />
      </div>

      <div className="mt-4 flex flex-row items-center gap-2">
        <Button className="min-w-24" onClick={onSearch}>
          Search
        </Button>
        <Button className="min-w-24 bg-brand-secondary">Reset</Button>
      </div>
    </div>
  );
};

export default PurchasedItemsSelectors;
