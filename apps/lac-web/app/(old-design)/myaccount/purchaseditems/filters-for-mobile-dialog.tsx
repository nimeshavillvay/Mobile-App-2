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
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { MdCheck } from "react-icons/md";
import {
  DURATIONS,
  QUERY_KEYS,
  SORTING_BY_FIELDS,
  SORTING_FILTERS_FOR_MOBILE,
} from "./constants";

const customDuration = DURATIONS[DURATIONS.length - 1]; // Custom duration: last item in the `DURATIONS` array

type FiltersForMobileProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fromDate: Date;
  setFromDate: Dispatch<SetStateAction<Date>>;
  toDate: Date;
  setToDate: Dispatch<SetStateAction<Date>>;
  duration: (typeof DURATIONS)[number] | undefined;
  setDuration: Dispatch<SetStateAction<(typeof DURATIONS)[number] | undefined>>;
  handleDurationChange: (value: string) => void;
  changeSearchParams: (
    params: {
      key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
      value: string;
    }[],
  ) => void;
  onReset: Dispatch<SetStateAction<void>>;
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
  changeSearchParams,
  onReset,
}: FiltersForMobileProps) => {
  const [activeFilter, setActiveFilter] = useState<string>(
    `${SORTING_BY_FIELDS.SKU}-desc`,
  );

  function onResetFiltersMobile() {
    onReset();
    setOpen(false);
  }

  const onSearchMobileFilters = () => {
    const [orderBy = null, orderType = null] = activeFilter.split("-");

    const searchParams = [];

    if (orderBy && orderType) {
      searchParams.push(
        {
          key: QUERY_KEYS.ORDER_BY,
          value: orderBy,
        },
        {
          key: QUERY_KEYS.ORDER_TYPE,
          value: orderType,
        },
      );
    }

    searchParams.push(
      {
        key: QUERY_KEYS.FROM_DATE,
        value: dayjs(fromDate).format("YYYY-MM-DD"),
      },
      {
        key: QUERY_KEYS.TO_DATE,
        value: dayjs(toDate).format("YYYY-MM-DD"),
      },
    );

    changeSearchParams(searchParams);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base max-h-[80vh] max-w-[500px] overflow-scroll md:hidden">
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
                              duration?.value == durationObj.value
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

              <AccordionContent className="grid">
                {SORTING_FILTERS_FOR_MOBILE.map((sortingFilter) => (
                  <div key={sortingFilter.title}>
                    <MobileFilterSortItem
                      key={sortingFilter.title}
                      title={sortingFilter.title}
                    />
                    <div className="bg-white font-bold">
                      {sortingFilter.options.map((sortingType) => (
                        <MobileFilterSortItemOption
                          key={sortingType.type}
                          title={sortingType.title}
                          activeFilter={activeFilter}
                          setActiveFilter={setActiveFilter}
                          sortingType={sortingType.type}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="grid grid-cols-2 gap-3 p-5">
            <Button
              className="min-w-24 rounded-sm border border-brand-primary bg-transparent p-6 font-bold text-brand-primary"
              onClick={onResetFiltersMobile}
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

const MobileFilterSortItem = ({ title }: { title: string }) => {
  return (
    <div className="bg-gray-200 px-5 py-3 text-base font-bold ">{title}</div>
  );
};

const MobileFilterSortItemOption = ({
  title,
  sortingType,
  activeFilter,
  setActiveFilter,
}: {
  title: string;
  sortingType: string;
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div
      className={cn(
        "py-2 pl-8 pr-2",
        activeFilter == sortingType
          ? "bg-brand-secondary bg-opacity-20 text-brand-secondary"
          : "",
      )}
    >
      <button
        className="flex w-full items-center justify-between text-sm"
        onClick={() => {
          setActiveFilter(sortingType);
        }}
      >
        {title}
        <MdCheck
          className={cn(
            "text-3xl leading-none text-brand-secondary",
            activeFilter == sortingType ? "block" : "hidden",
          )}
        />
      </button>
    </div>
  );
};
