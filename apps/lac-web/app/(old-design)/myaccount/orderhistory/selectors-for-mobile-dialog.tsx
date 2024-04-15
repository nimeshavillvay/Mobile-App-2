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
import { Button } from "@/old/_components/ui/button";
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
import { updateSearchParams } from "@/old/_utils/client-helpers";
import { cn } from "@/old/_utils/helpers";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { MdCheck } from "react-icons/md";
import { changeSearchParams } from "../_utils/client-helpers";
import {
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  QUERY_KEYS,
  SORTING_FILTERS_FOR_MOBILE,
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
  const urlSearchParams = useSearchParams();

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
  const [sortDirection, setSortDirection] = useState("");
  const [sortType, setSortType] = useState("");

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

  const handleApplyFilters = () => {
    const urlFilters: { key: string; value: string }[] = [];

    if (fromDate && toDate) {
      urlFilters.push({
        key: QUERY_KEYS.FROM_DATE,
        value: dayjs(fromDate).format(URL_DATE_FORMAT),
      });

      urlFilters.push({
        key: QUERY_KEYS.TO_DATE,
        value: dayjs(toDate).format(URL_DATE_FORMAT),
      });
    } else {
      urlFilters.push({
        key: QUERY_KEYS.FROM_DATE,
        value: "",
      });

      urlFilters.push({
        key: QUERY_KEYS.TO_DATE,
        value: "",
      });
    }

    if (orderStatuses.length) {
      urlFilters.push({
        key: QUERY_KEYS.ORDER_STATUS,
        value: orderStatuses.join(","),
      });
    } else {
      urlFilters.push({
        key: QUERY_KEYS.ORDER_STATUS,
        value: "",
      });
    }

    if (orderTypes.length) {
      urlFilters.push({
        key: QUERY_KEYS.ORDER_TYPE,
        value: orderTypes.join(","),
      });
    } else {
      urlFilters.push({
        key: QUERY_KEYS.ORDER_TYPE,
        value: "",
      });
    }

    if (sortType && sortDirection) {
      urlFilters.push({
        key: QUERY_KEYS.SORT_TYPE,
        value: sortType,
      });
      urlFilters.push({
        key: QUERY_KEYS.SORT_DIRECTION,
        value: sortDirection,
      });
    } else {
      urlFilters.push({
        key: QUERY_KEYS.SORT_TYPE,
        value: "",
      });
      urlFilters.push({
        key: QUERY_KEYS.SORT_DIRECTION,
        value: "",
      });
    }

    changeSearchParams(urlSearchParams, urlFilters);

    // Close the dialog
    onOpenChange && onOpenChange(false);
  };

  const handleResetFilters = () => {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date());

    const params = new URLSearchParams();

    updateSearchParams(params);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bottom-0 top-auto max-w-[500px] translate-y-[0%] gap-0">
        <DialogHeader>
          <DialogTitle className="text-left  font-wurth md:text-center">
            Sort & Filter
          </DialogTitle>

          <DialogDescription className="sr-only">
            Filters for my orders
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-scroll">
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

              <AccordionContent className="grid">
                {SORTING_FILTERS_FOR_MOBILE.map((sort) => (
                  <>
                    <MobileSortFilterHeading
                      key={sort.title}
                      title={sort.title}
                    />
                    {sort.options.map((option) => (
                      <MobileSortFilterOption
                        key={option.title}
                        title={option.title}
                        active={
                          sortType === option.type &&
                          sortDirection === option.direction
                        }
                        onChecked={() => {
                          setSortType(option.type);
                          setSortDirection(option.direction);
                        }}
                      />
                    ))}
                  </>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="grid grid-cols-2 gap-3 p-5">
          <Button
            variant="secondary"
            className="h-12 border-brand-primary text-brand-primary"
            onClick={() => handleResetFilters()}
          >
            Reset
          </Button>

          <Button className="h-12" onClick={() => handleApplyFilters()}>
            Apply
          </Button>
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

const MobileSortFilterHeading = ({ title }: { title: string }) => {
  return (
    <div className="bg-brand-gray-200 px-5 py-3 text-base text-brand-gray-500">
      {title}
    </div>
  );
};

const MobileSortFilterOption = ({
  title,
  active,
  onChecked,
}: {
  title: string;
  active: boolean;
  onChecked: () => void;
}) => {
  return (
    <div
      className={cn(
        "py-2 pl-8 pr-2",
        active ? "bg-brand-secondary bg-opacity-20 text-brand-secondary" : "",
      )}
    >
      <Button
        variant="ghost"
        className="font-base flex w-full items-center justify-between font-bold normal-case"
        onClick={onChecked}
      >
        {title}
        <MdCheck
          className={cn(
            "text-2xl leading-none text-brand-secondary",
            active ? "block" : "hidden",
          )}
        />
      </Button>
    </div>
  );
};
