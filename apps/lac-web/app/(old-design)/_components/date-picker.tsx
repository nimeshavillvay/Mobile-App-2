"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";

import { Button } from "@/old/_components/ui/button";
import { Calendar } from "@/old/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/old/_components/ui/popover";
import { cn } from "@/old/_utils/helpers";
import { Dispatch, SetStateAction } from "react";

type DatePickerProps = {
  date: Date;
  onSelectDate: Dispatch<SetStateAction<Date>>;
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY";
  placeholder?: string;
  containerClassName?: string;
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
            "font-base justify-start gap-2 text-left font-normal capitalize",
            !date && "text-muted-foreground",
            containerClassName,
          )}
        >
          <CalendarIcon className="h-4 w-4" />

          <div>
            {date ? dayjs(date).format(dateFormat) : <span>{placeholder}</span>}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) =>
            selectedDate && onSelectDate(selectedDate)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
