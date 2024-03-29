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
import { updateSearchParams } from "@/(old-design)/_utils/client-helpers";
import { cn } from "@/(old-design)/_utils/helpers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { MdCheck } from "react-icons/md";
import { changeSearchParams } from "./client-helpers";
import {
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  INIT_TO_DATE,
  QUERY_KEYS,
  SORTING_BY_FIELDS,
  SORTING_FILTERS_FOR_MOBILE,
} from "./constants";

const customDuration = DURATIONS[DURATIONS.length - 1]; // Custom duration: last item in the `DURATIONS` array

type FiltersForMobileProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const PurchasedItemsMobilePagination = ({
  open,
  setOpen,
}: FiltersForMobileProps) => {
  const urlSearchParams = useSearchParams();

  const [fromDate, setFromDate] = useState(new Date(INIT_FROM_DATE));
  const [toDate, setToDate] = useState(new Date());
  const [duration, setDuration] = useState(INIT_DURATION);
  const [activeFilter, setActiveFilter] = useState<string>(
    `${SORTING_BY_FIELDS.SKU}-desc`,
  );

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);

    if (duration) {
      setDuration(duration);
    }

    if (value == "0") return;

    setFromDate(
      new Date(dayjs().subtract(Number(value), "months").format("YYYY-MM-DD")),
    );

    setToDate(new Date(dayjs().format("YYYY-MM-DD")));
  };

  function onResetFiltersMobile() {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date(INIT_TO_DATE));

    const params = new URLSearchParams();
    updateSearchParams(params);
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

    changeSearchParams(urlSearchParams, searchParams);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base max-h-[80vh] max-w-[500px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-left">Sort & Filter</DialogTitle>

          <DialogDescription className="sr-only">
            Add a new user by entering the email
          </DialogDescription>
        </DialogHeader>

        <div>
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

export default PurchasedItemsMobilePagination;
