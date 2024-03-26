"use client";

import DatePicker from "@/(old-design)/_components/date-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/(old-design)/_components/ui/accordion";
import { Label } from "@/(old-design)/_components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/(old-design)/_components/ui/radio-group";
import { cn } from "@/(old-design)/_utils/helpers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DURATIONS } from "./constants";
import { Option } from "./types";

const initialDuration = DURATIONS[DURATIONS.length - 2];

type FiltersForMobileProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fromDate: Date;
  setFromDate: Dispatch<SetStateAction<Date>>;
  toDate: Date;
  setToDate: Dispatch<SetStateAction<Date>>;
  duration: Option;
  setDuration: Dispatch<SetStateAction<Option>>;
};

const FiltersForMobileDialog = ({
  open,
  setOpen,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  duration,
  setDuration,
}: FiltersForMobileProps) => {
  console.log(DURATIONS);
  const initialDuration = DURATIONS[DURATIONS.length - 2];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base max-w-[500px] md:hidden">
        <DialogHeader>
          <DialogTitle className="text-left">Sort & Filter</DialogTitle>

          <DialogDescription className="sr-only">
            Add a new user by entering the email
          </DialogDescription>
        </DialogHeader>

        <div className="pb-12 pt-6">
          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1">
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-[#000] hover:no-underline">
                Duration
              </AccordionTrigger>
              <AccordionContent className="grid gap-y-5 px-5 py-3">
                <div className="mt-4 flex flex-col items-center gap-2 xs:flex-row">
                  <DatePicker
                    date={fromDate}
                    onSelectDate={(date) => {
                      setFromDate(date);
                      // setDuration(customDuration as Option);
                    }}
                  />

                  <div>to</div>

                  <DatePicker
                    date={toDate}
                    onSelectDate={(date) => {
                      setToDate(date);
                      // setDuration(customDuration as Option);
                    }}
                  />
                </div>
                <div>
                  <RadioGroup
                    defaultValue="12"
                    onValueChange={(value) => {
                      setDuration(
                        DURATIONS.find(
                          (durationObj) => durationObj.value === value,
                        ) ?? (initialDuration as Option),
                      );
                    }}
                    className="gap-auto grid grid-cols-2 justify-between sm:grid-cols-4"
                  >
                    {DURATIONS.map(
                      (durationObj) =>
                        durationObj.value != "0" && (
                          <div
                            key={durationObj.label}
                            className={cn(
                              "flex items-center space-x-2 rounded border px-2 py-2",
                              duration.value == durationObj.value
                                ? "border-brand-secondary bg-brand-secondary bg-opacity-20 text-brand-secondary"
                                : "bg-gray-100",
                            )}
                          >
                            <RadioGroupItem
                              value={durationObj.value}
                              id={`duration-${durationObj.value}`}
                              className="min-h-4 min-w-4"
                            />
                            <Label
                              htmlFor={`duration-${durationObj.value}`}
                              className="w-full"
                            >
                              {durationObj.label}
                            </Label>
                          </div>
                        ),
                    )}
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersForMobileDialog;
