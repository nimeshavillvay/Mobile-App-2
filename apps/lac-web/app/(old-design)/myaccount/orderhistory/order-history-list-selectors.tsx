import type { Filter } from "@/_lib/types";
import { filterAndMapValues } from "@/_lib/utils";
import DatePicker from "@/old/_components/date-picker";
import { Button } from "@/old/_components/ui/button";
import { Checkbox } from "@/old/_components/ui/checkbox";
import { Label } from "@/old/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { updateSearchParams } from "@/old/_utils/client-helpers";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { changeSearchParams } from "../_utils/client-helpers";
import {
  CUSTOM_DURATION,
  DURATIONS,
  INIT_DURATION,
  INIT_FROM_DATE,
  INIT_TO_DATE,
  QUERY_KEYS,
  UI_DATE_FORMAT,
  URL_DATE_FORMAT,
} from "./constants";
import MultiSelect from "./multi-select";
import type { Option } from "./types";

type OrderHistoryListSelectorsProps = {
  filters: Filter[];
};

const OrderHistoryListSelectors = ({
  filters,
}: OrderHistoryListSelectorsProps) => {
  const poNoFilter = filterAndMapValues(filters, "PO #");
  const jobNameFilter = filterAndMapValues(filters, "Job Name");
  const statusFilter = filterAndMapValues(filters, "Status");
  const typesFilter = filterAndMapValues(filters, "Transaction Type");

  const urlSearchParams = useSearchParams();
  const urlFromDate = urlSearchParams.get("from");
  const urlToDate = urlSearchParams.get("to");

  const [duration, setDuration] = useState(INIT_DURATION);
  const [fromDate, setFromDate] = useState(
    new Date(urlFromDate ?? INIT_FROM_DATE),
  );
  const [toDate, setToDate] = useState(new Date(urlToDate ?? INIT_TO_DATE));
  const [orderStatuses, setOrderStatuses] = useState<string[]>([]);
  const [orderTypes, setOrderTypes] = useState<string[]>([]);

  const id = useId();
  const durationId = `duration-${id}`;

  const handleDurationChange = (value: string) => {
    const duration = DURATIONS.find((duration) => duration.value === value);
    if (duration) {
      setDuration(duration);
    }

    if (value === "0") {
      return;
    }

    setFromDate(
      new Date(dayjs().subtract(Number(value), "days").format(URL_DATE_FORMAT)),
    );
    setToDate(new Date(dayjs().format(URL_DATE_FORMAT)));
  };

  const handleSearch = () => {
    changeSearchParams(urlSearchParams, [
      {
        key: QUERY_KEYS.FROM_DATE,
        value: dayjs(fromDate).format(URL_DATE_FORMAT),
      },
      {
        key: QUERY_KEYS.TO_DATE,
        value: dayjs(toDate).format(URL_DATE_FORMAT),
      },
      {
        key: QUERY_KEYS.ORDER_STATUS,
        value: orderStatuses.join(","),
      },
      {
        key: QUERY_KEYS.ORDER_TYPE,
        value: orderTypes.join(","),
      },
    ]);
  };

  const handleReset = () => {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date(INIT_TO_DATE));

    const params = new URLSearchParams();

    updateSearchParams(params);
  };

  const handleOrderTypeCheckedChanged = (id: string, checked: boolean) => {
    if (checked) {
      setOrderTypes((prev) => [...prev, id]);
    } else {
      setOrderTypes((prev) => prev.filter((type) => type !== id));
    }
  };

  const handleOrderStatusChange = (values: Option[]) => {
    const selectedOrderStatus = values.map((value) => value.id);
    setOrderStatuses(selectedOrderStatus);
  };

  return (
    <div className="hidden flex-col justify-between gap-4 bg-brand-gray-100 px-4 py-5 md:flex md:flex-wrap lg:flex-row lg:gap-0">
      <div className="flex flex-col justify-between gap-4 lg:gap-0">
        <div className="space-y-4">
          <div className="text-brand-gray-500">
            <Label htmlFor={durationId} className="text-nowrap font-bold">
              Duration
            </Label>

            <Select
              value={duration?.value}
              onValueChange={function (value) {
                handleDurationChange(value);
              }}
            >
              <SelectTrigger id={durationId} className="h-8 py-0">
                <SelectValue>{duration?.label}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                {DURATIONS.map((duration) => (
                  <SelectItem key={duration.value} value={duration.value}>
                    {duration.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row items-center gap-2 self-start">
            <DatePicker
              date={fromDate}
              onSelectDate={(date) => {
                setFromDate(date);
                setDuration(CUSTOM_DURATION);
              }}
              dateFormat={UI_DATE_FORMAT}
            />

            <div>to</div>

            <DatePicker
              date={toDate}
              onSelectDate={(date) => {
                setToDate(date);
                setDuration(CUSTOM_DURATION);
              }}
              dateFormat={UI_DATE_FORMAT}
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Button className="min-w-24" onClick={handleSearch}>
            Search
          </Button>

          <Button className="min-w-24 bg-brand-secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Order Types Column */}
      <div>
        <Label className="text-nowrap font-bold">Order Types</Label>

        <div className="flex min-h-[186px] min-w-[170px] flex-col gap-2 rounded-sm border bg-white p-3">
          {typesFilter.map((orderType) => (
            <OrderTypeCheckbox
              key={orderType.id}
              onCheckedChanged={(checked) =>
                handleOrderTypeCheckedChanged(orderType.id, checked)
              }
              {...orderType}
            />
          ))}
        </div>
      </div>

      {/* Filter By Column */}
      <div>
        <Label className="text-nowrap font-bold">Filter By</Label>

        <div className="flex flex-col gap-2">
          <MultiSelect label="PO No." data={poNoFilter} />
          <MultiSelect label="Job Name" data={jobNameFilter} />
          <MultiSelect
            label="Order Status"
            data={statusFilter}
            onValuesChange={(values) => handleOrderStatusChange(values)}
            onClear={() => setOrderStatuses([])}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryListSelectors;

const OrderTypeCheckbox = ({
  id,
  value,
  active,
  onCheckedChanged,
}: {
  id: string;
  value: string;
  active: boolean;
  onCheckedChanged: (checked: boolean) => void;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox
        id={`order-type-${id}`}
        disabled={!active}
        onCheckedChange={onCheckedChanged}
      />

      <Label htmlFor={`order-type-${id}`} className="text-wrap">
        {value}
      </Label>
    </div>
  );
};
