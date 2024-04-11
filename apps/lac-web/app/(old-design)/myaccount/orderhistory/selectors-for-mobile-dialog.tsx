"use client";

import type { Filter } from "@/_lib/types";
import { filterAndMapValues } from "@/_lib/utils";
import DatePicker from "@/old/_components/date-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/old/_components/ui/accordion";
import { Checkbox } from "@/old/_components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { Label } from "@/old/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/old/_components/ui/radio-group";
import { cn } from "@/old/_utils/helpers";
import dayjs from "dayjs";
import { useState, type Dispatch, type SetStateAction } from "react";
import {
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  URL_DATE_FORMAT,
} from "./constants";

const customDuration = DURATIONS.at(-1);

type SelectorsForMobileDialogProps = {
  open: boolean;
  filters: Filter[];
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const SelectorsForMobileDialog = ({
  open,
  filters,
  onOpenChange,
}: SelectorsForMobileDialogProps) => {
  const poNoFilter = filterAndMapValues(filters, "PO #");
  const jobNameFilter = filterAndMapValues(filters, "Job Name");
  const statusFilter = filterAndMapValues(filters, "Status");
  const typesFilter = filterAndMapValues(filters, "Transaction Type");

  const [fromDate, setFromDate] = useState(new Date(INIT_FROM_DATE));
  const [toDate, setToDate] = useState(new Date());
  const [duration, setDuration] = useState(INIT_DURATION);
  const [orderTypes, setOrderTypes] = useState<string[]>([]);
  const [poNos, setPoNos] = useState<string[]>([]);
  const [jobNames, setJobNames] = useState<string[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<string[]>([]);

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);

    if (duration) {
      setDuration(duration);
    }

    if (value !== "0") {
      const newFromDate = dayjs()
        .subtract(Number(value), "months")
        .format(URL_DATE_FORMAT);
      const newToDate = dayjs().format(URL_DATE_FORMAT);

      setFromDate(new Date(newFromDate));
      setToDate(new Date(newToDate));
    }
  };

  const handleOrderTypeCheckedChanged = (id: string, checked: boolean) => {
    if (checked) {
      setOrderTypes((prev) => [...prev, id]);
    } else {
      setOrderTypes((prev) => prev.filter((type) => type !== id));
    }
  };

  const handlePoNoCheckedChanged = (id: string, checked: boolean) => {
    if (checked) {
      setPoNos((prev) => [...prev, id]);
    } else {
      setPoNos((prev) => prev.filter((po) => po !== id));
    }
  };

  const handleJobNameCheckedChanged = (id: string, checked: boolean) => {
    if (checked) {
      setJobNames((prev) => [...prev, id]);
    } else {
      setJobNames((prev) => prev.filter((job) => job !== id));
    }
  };

  const handleStatusesCheckedChanged = (id: string, checked: boolean) => {
    if (checked) {
      setOrderStatuses((prev) => [...prev, id]);
    } else {
      setOrderStatuses((prev) => prev.filter((status) => status !== id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bottom-0 top-auto max-h-[80vh] max-w-[500px] translate-y-[0%] gap-0 overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-left  font-wurth md:text-center">
            Sort & Filter
          </DialogTitle>

          <DialogDescription className="sr-only">
            Filters for my orders
          </DialogDescription>
        </DialogHeader>

        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="duration-item"
          >
            {/* Duration selector */}
            <AccordionItem value="duration-item">
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                Duration
              </AccordionTrigger>

              <AccordionContent className="grid gap-y-5 px-5 py-3">
                <div className="flex flex-row items-center justify-between">
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

                <div>
                  <RadioGroup
                    value={duration?.value}
                    onValueChange={(value) => {
                      handleDurationChange(value);
                    }}
                    className="gap-auto grid grid-cols-2 justify-between"
                  >
                    {DURATIONS.map((item) => (
                      <div
                        key={item.value}
                        className={cn(
                          "flex flex-row items-center space-x-2 rounded border p-2",
                          duration?.value === item.value
                            ? "border-brand-secondary bg-brand-secondary bg-opacity-20"
                            : "bg-brand-gray-100",
                        )}
                      >
                        <RadioGroupItem
                          value={item.value}
                          id={`duration-${item.value}`}
                          className="min-h-4 min-w-4"
                        />

                        <Label
                          htmlFor={`duration-${item.value}`}
                          className={cn(
                            "w-full",
                            duration?.value === item.value
                              ? "text-brand-secondary"
                              : "text-black",
                          )}
                        >
                          {item.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Order Types selector */}
            <AccordionItem value="type-item">
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                Order Types
              </AccordionTrigger>

              <AccordionContent className="grid gap-y-5 px-5 py-3">
                {typesFilter.map((item) => (
                  <CheckboxWithLabel
                    key={item.id}
                    flag="type"
                    checked={orderTypes.includes(item.id)}
                    onCheckedChanged={(checked) =>
                      handleOrderTypeCheckedChanged(item.id, checked)
                    }
                    {...item}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* PO No selector */}
            <AccordionItem value="po-item">
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                PO No
              </AccordionTrigger>

              <AccordionContent className="grid gap-y-5 px-5 py-3">
                {poNoFilter.map((item) => (
                  <CheckboxWithLabel
                    key={item.id}
                    flag="po"
                    checked={poNos.includes(item.id)}
                    onCheckedChanged={(checked) =>
                      handlePoNoCheckedChanged(item.id, checked)
                    }
                    {...item}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Job Name selector */}
            <AccordionItem value="job-item">
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                Job Name
              </AccordionTrigger>

              <AccordionContent className="grid gap-y-5 px-5 py-3">
                {jobNameFilter.map((item) => (
                  <CheckboxWithLabel
                    key={item.id}
                    flag="job"
                    checked={jobNames.includes(item.id)}
                    onCheckedChanged={(checked) =>
                      handleJobNameCheckedChanged(item.id, checked)
                    }
                    {...item}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Order Status selector */}
            <AccordionItem value="status-item">
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                Order Status
              </AccordionTrigger>

              <AccordionContent className="grid gap-y-5 px-5 py-3">
                {statusFilter.map((item) => (
                  <CheckboxWithLabel
                    key={item.id}
                    flag="status"
                    checked={orderStatuses.includes(item.id)}
                    onCheckedChanged={(checked) =>
                      handleStatusesCheckedChanged(item.id, checked)
                    }
                    {...item}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Sort direction selector */}
            <AccordionItem value="sort-item">
              <AccordionTrigger className="bg-gray-100 px-5 py-3 text-xl text-black hover:no-underline">
                Sort Direction
              </AccordionTrigger>

              <AccordionContent className="grid gap-y-5 px-5 py-3">
                {/* list of sort directions */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectorsForMobileDialog;

// TODO: Move this to a separate file (Reusable component)
const CheckboxWithLabel = ({
  id,
  flag = "checkbox",
  value,
  active,
  checked,
  onCheckedChanged,
}: {
  id: string;
  flag: string;
  value: string;
  active: boolean;
  checked: boolean;
  onCheckedChanged: (checked: boolean) => void;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox
        id={`${flag}-${id}`}
        disabled={!active}
        checked={checked}
        onCheckedChange={onCheckedChanged}
      />

      <Label htmlFor={`${flag}-${id}`} className="w-full text-wrap">
        {value}
      </Label>
    </div>
  );
};
