"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "~/components/base/atoms/button";
import { Calendar } from "~/components/base/atoms/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/base/molecules/popover";
import { cn } from "~/lib/utils";

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
