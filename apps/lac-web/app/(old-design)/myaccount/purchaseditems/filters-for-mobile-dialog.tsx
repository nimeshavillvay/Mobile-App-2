"use client";

import DatePicker from "@/(old-design)/_components/date-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/(old-design)/_components/ui/accordion";
import { Button } from "@/(old-design)/_components/ui/button";
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
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { MdCheck } from "react-icons/md";
import { DURATIONS } from "./constants";
import { Option } from "./types";

const customDuration = DURATIONS[DURATIONS.length - 1]; // Custom duration: last item in the `DURATIONS` array

type FiltersForMobileProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fromDate: Date;
  setFromDate: Dispatch<SetStateAction<Date>>;
  toDate: Date;
  setToDate: Dispatch<SetStateAction<Date>>;
  duration: Option;
  setDuration: Dispatch<SetStateAction<Option>>;
  handleDurationChange: (value: string) => void;
  onChangeSortingParams: (orderBy: string, orderType: string) => void;
  onSearch: MouseEventHandler<HTMLButtonElement>;
  onReset: MouseEventHandler<HTMLButtonElement>;
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
  handleDurationChange,
  onChangeSortingParams,
  onReset,
}: FiltersForMobileProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("sku-desc");

  const onSearchMobileFilters = () => {
    const sortingFilterData = activeFilter.split("-");

    onChangeSortingParams(
      sortingFilterData[0] as string,
      sortingFilterData[1] as string,
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base max-w-[500px] md:hidden">
        <DialogHeader>
          <DialogTitle className="text-left">Sort & Filter</DialogTitle>

          <DialogDescription className="sr-only">
            Add a new user by entering the email
          </DialogDescription>
        </DialogHeader>

        <div>
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
                <div>
                  <RadioGroup
                    value={duration.value}
                    defaultValue="12"
                    onValueChange={(value) => {
                      handleDurationChange(value);
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
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-[#000] hover:no-underline">
                Sort
              </AccordionTrigger>
              <AccordionContent className="grid gap-y-5 py-3">
                <ul>
                  <li>
                    <div className="bg-gray-200 px-5 py-3 text-base font-bold ">
                      Item # / MFR Part #
                    </div>
                    <ul className="bg-white text-base font-bold">
                      <li
                        className={cn(
                          "flex items-center justify-between py-4 pl-8 pr-5",
                          activeFilter == "sku-asc"
                            ? "bg-brand-secondary bg-opacity-20 text-brand-secondary"
                            : "",
                        )}
                        onClick={() => {
                          setActiveFilter("sku-asc");
                        }}
                      >
                        Item # / MFR Part # Ascending
                        <MdCheck
                          className={cn(
                            "text-3xl leading-none text-brand-secondary",
                            activeFilter == "sku-asc" ? "block" : "hidden",
                          )}
                        />
                      </li>
                      <li
                        className={cn(
                          "flex items-center justify-between py-4 pl-8 pr-5",
                          activeFilter == "sku-desc"
                            ? "bg-brand-secondary bg-opacity-20 text-brand-secondary"
                            : "",
                        )}
                        onClick={() => {
                          setActiveFilter("sku-desc");
                        }}
                      >
                        Item # / MFR Part # Descending
                        <MdCheck
                          className={cn(
                            "text-3xl leading-none text-brand-secondary",
                            activeFilter == "sku-desc" ? "block" : "hidden",
                          )}
                        />
                      </li>
                    </ul>
                  </li>
                  <li>
                    Order Date
                    <ul>
                      <li>Order Date Ascending</li>
                      <li>Order Date Descending</li>
                    </ul>
                  </li>
                  <li>
                    Order Count
                    <ul>
                      <li>Order Count Ascending</li>
                      <li>Order Count Descending</li>
                    </ul>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="grid grid-cols-2 gap-3 p-5">
            <Button
              className="min-w-24 rounded-sm border border-brand-primary bg-transparent p-6 font-bold text-brand-primary"
              onClick={onReset}
            >
              Reset
            </Button>
            <Button
              className="min-w-24 p-6"
              onClick={() => onSearchMobileFilters()}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersForMobileDialog;
