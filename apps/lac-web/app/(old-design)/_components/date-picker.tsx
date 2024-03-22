"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

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
  setDate: Dispatch<SetStateAction<Date>>;
  dateFormat?: "PPP" | "mm/dd/yyyy";
  placeholder?: string;
};

const DatePicker = ({
  date,
  setDate,
  dateFormat = "PPP",
  placeholder = "Pick a date",
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {date ? format(date, dateFormat) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => setDate(selectedDate as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
