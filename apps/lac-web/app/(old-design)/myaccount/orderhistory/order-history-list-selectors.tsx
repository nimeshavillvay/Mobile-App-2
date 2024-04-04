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
  ORDER_TYPES,
  QUERY_KEYS,
  UI_DATE_FORMAT,
  URL_DATE_FORMAT,
} from "./constants";

const SELECTOR_ORDER_TYPES = [
  {
    id: "order-type-all",
    name: "All",
    type: "all",
    isActive: true,
    checked: false,
  },
  {
    id: `order-type-${ORDER_TYPES["H"]}`,
    name: ORDER_TYPES["H"],
    type: "H",
    isActive: true,
    checked: false,
  },
  {
    id: `order-type-${ORDER_TYPES["C"]}`,
    name: ORDER_TYPES["C"],
    type: "C",
    isActive: true,
    checked: false,
  },
  {
    id: `order-type-${ORDER_TYPES["B"]}`,
    name: ORDER_TYPES["B"],
    type: "B",
    isActive: true,
    checked: false,
  },
  {
    id: `order-type-${ORDER_TYPES["K"]}`,
    name: ORDER_TYPES["K"],
    type: "K",
    isActive: true,
    checked: false,
  },
  {
    id: `order-type-${ORDER_TYPES["L"]}`,
    name: ORDER_TYPES["L"],
    type: "L",
    isActive: true,
    checked: false,
  },
];

const ALL_ORDER_TYPES = ["H", "C", "B", "K", "L"];

const OrderHistoryListSelectors = () => {
  const urlSearchParams = useSearchParams();
  const urlFromDate = urlSearchParams.get("from");
  const urlToDate = urlSearchParams.get("to");
  const urlOrderType = urlSearchParams.get("orderType");
  let selectorOrderTypes = SELECTOR_ORDER_TYPES;

  const [duration, setDuration] = useState(INIT_DURATION);
  const [fromDate, setFromDate] = useState(
    new Date(urlFromDate ?? INIT_FROM_DATE),
  );
  const [toDate, setToDate] = useState(new Date(urlToDate ?? INIT_TO_DATE));
  // const currentPage = Number(urlSearchParams.get("page") ?? INIT_PAGE_NUMBER);
  // const pageSize = Number(urlSearchParams.get("perPage") ?? INIT_PAGE_SIZE);

  //   if (urlOrderType) {
  //     if (urlOrderType.includes(",")) {
  //       const orderTypes = urlOrderType.split(",");
  //       selectorOrderTypes = selectorOrderTypes.map((orderType) => ({
  //         ...orderType,
  //         checked: orderTypes.includes(orderType.type),
  //       }));
  //     } else {
  //       if (ALL_ORDER_TYPES.includes(urlOrderType)) {
  //         selectorOrderTypes = selectorOrderTypes.map((orderType) => ({
  //           ...orderType,
  //           checked: urlOrderType === orderType.type,
  //         }));
  //       } else {
  //         selectorOrderTypes = selectorOrderTypes.map((orderType) => ({
  //           ...orderType,
  //           checked: false,
  //         }));
  //       }
  //     }
  //   } else {
  //     selectorOrderTypes = selectorOrderTypes.map((orderType) => ({
  //       ...orderType,
  //       checked: true,
  //     }));
  //   }

  if (urlOrderType) {
    const orderTypes = urlOrderType.includes(",")
      ? urlOrderType.split(",")
      : [urlOrderType];
    selectorOrderTypes = selectorOrderTypes.map((orderType) => ({
      ...orderType,
      checked: orderTypes.includes(orderType.type),
    }));
  } else {
    selectorOrderTypes = selectorOrderTypes.map((orderType) => ({
      ...orderType,
      checked: true,
    }));
  }

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
    ]);
  };

  const handleReset = () => {
    setDuration(INIT_DURATION);
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date(INIT_TO_DATE));

    const params = new URLSearchParams();

    updateSearchParams(params);
  };

  const handleOrderTypeCheckedChanged =
    (type: string) => (checked: boolean) => {
      const params = new URLSearchParams();

      if (type === "all") {
        if (checked) {
          params.delete(QUERY_KEYS.ORDER_TYPE);
        } else {
          params.set(QUERY_KEYS.ORDER_TYPE, "null");
        }
      } else if (checked && urlOrderType) {
        const orderTypes =
          urlOrderType === "null" ? [] : urlOrderType.split(",");
        const newOrderTypes = [...orderTypes, type].filter((orderType) =>
          ALL_ORDER_TYPES.includes(orderType),
        );
        if (newOrderTypes.length === ALL_ORDER_TYPES.length) {
          params.delete(QUERY_KEYS.ORDER_TYPE);
        } else {
          params.set(QUERY_KEYS.ORDER_TYPE, newOrderTypes.join(","));
        }
      } else if (!checked && urlOrderType) {
        const orderTypes = urlOrderType.split(",");
        const newOrderTypes = orderTypes.filter(
          (orderType) => orderType !== type,
        );
        params.set(
          QUERY_KEYS.ORDER_TYPE,
          newOrderTypes.length ? newOrderTypes.join(",") : "null",
        );
      } else {
        const newOrderTypes = ALL_ORDER_TYPES.filter(
          (orderType) => orderType !== type,
        );
        params.set(QUERY_KEYS.ORDER_TYPE, newOrderTypes.join(","));
      }

      updateSearchParams(params);
    };

  return (
    <div className="hidden flex-col justify-between bg-brand-gray-100 px-4 py-5 md:flex md:flex-wrap lg:flex-row">
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

        <div className="flex flex-row items-center gap-2">
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

        <div className="mt-4 flex flex-row items-center gap-2">
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

        <div className="flex min-w-[170px] flex-col gap-2 rounded-sm border bg-white p-3">
          {selectorOrderTypes.map((orderType) => (
            <OrderTypeCheckbox
              key={orderType.type}
              {...orderType}
              onCheckedChanged={handleOrderTypeCheckedChanged(orderType.type)}
            />
          ))}
        </div>
      </div>

      {/* Filter By Column */}
      <div>
        <Label className="text-nowrap font-bold">Filter By</Label>
      </div>
    </div>
  );
};

export default OrderHistoryListSelectors;

const OrderTypeCheckbox = ({
  id,
  name,
  isActive,
  checked,
  onCheckedChanged,
}: {
  id: string;
  name: string;
  isActive: boolean;
  checked: boolean;
  onCheckedChanged: (checked: boolean) => void;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox
        id={id}
        disabled={!isActive}
        checked={checked}
        onCheckedChange={onCheckedChanged}
      />

      <Label htmlFor={id} className="text-wrap">
        {name}
      </Label>
    </div>
  );
};
