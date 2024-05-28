"use client";

import { Button } from "@/old/_components/ui/button";
import { Calendar } from "@/old/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/old/_components/ui/popover";
import { cn } from "@/old/_utils/helpers";
import { CalendarIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import type { Dispatch, SetStateAction } from "react";

type DatePickerProps = {
  readonly date: Date;
  readonly onSelectDate: Dispatch<SetStateAction<Date>>;
  readonly dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY";
  readonly placeholder?: string;
  readonly containerClassName?: string;
};

const DatePicker = ({
  date,
  onSelectDate,
  dateFormat = "MM/DD/YYYY",
  placeholder = "Pick a date",
  containerClassName,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "font-base justify-start gap-2 text-left font-normal",
            !date && "text-muted-foreground",
            containerClassName,
          )}
        >
          <CalendarIcon className="h-4 w-4" />

          {date ? dayjs(date).format(dateFormat) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          selectedDate={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onSelectDate(selectedDate);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
