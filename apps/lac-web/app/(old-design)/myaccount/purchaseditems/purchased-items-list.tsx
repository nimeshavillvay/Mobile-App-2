"use client";

import Pagination from "@/(old-design)/_components/pagination";
import { updateSearchParams } from "@/(old-design)/_utils/client-helpers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  DEFAULT_SORT,
  ORDER_BY_FIELDS,
  PAGE_SIZES,
  QUERY_KEYS,
  SORTING_TYPES,
} from "./constants";
import PurchasedItemRow from "./purchased-item-row";
import PurchasedItemsSelectors from "./purchased-items-selectors";
import { CombinedPurchasedItem, OrderHistoryItem } from "./types";
import useGetItemInfo from "./use-get-items-info.hook";
import useSuspensePurchasedItemsList from "./use-suspense-purchased-items-list.hook";

const PurchasedItemsList = ({ token }: { token: string }) => {
  const searchParams = useSearchParams();
  const orderField = searchParams.get("orderBy") ?? ORDER_BY_FIELDS.ORDER_DATE;
  const orderType = searchParams.get("orderType") ?? "desc";
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("perPage") ?? "10");

  let isLoading = true;
  let totalItems: number = 0;

  const initialFromDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
  const initialToDate = dayjs().format("YYYY-MM-DD");

  const selectedSorting = SORTING_TYPES.find(
    (sortingType) => sortingType.value === orderType,
  );

  const [fromDate, setFromDate] = useState<Date>(new Date(initialFromDate));
  const [toDate, setToDate] = useState<Date>(new Date());

  const purchasedItemsList = useSuspensePurchasedItemsList(
    token,
    searchParams.get("from") ?? initialFromDate,
    searchParams.get("to") ?? initialToDate,
    Number(searchParams.get("page") ?? page) - 1,
    perPage,
    orderField,
    orderType,
  );

  console.log("purchasedItemsList", purchasedItemsList.data);

  const skuIds: string[] = [];
  if (purchasedItemsList.data) {
    totalItems = purchasedItemsList.data.purchesOrders.totalElements;

    purchasedItemsList.data.purchesOrders.content.forEach((element) => {
      const isExist = skuIds.find((e) => e === element.sku);
      if (!isExist) {
        skuIds.push(element.sku);
      }
    });
  }

  const getItemInfo = useGetItemInfo(token, skuIds.toString());
  if (purchasedItemsList && getItemInfo) {
    isLoading = false;
  }

  const onClickSearch = () => {
    changeSearchParams([
      {
        key: QUERY_KEYS.FROM_DATE,
        value: dayjs(fromDate).format("YYYY-MM-DD"),
      },
      {
        key: QUERY_KEYS.TO_DATE,
        value: dayjs(toDate).format("YYYY-MM-DD"),
      },
    ]);
  };

  const onClickReset = () => {
    const params = new URLSearchParams();
    updateSearchParams(params);
  };

  const changeSearchParams = (
    params: {
      key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
      value: string;
    }[],
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    params.map(function (param) {
      newSearchParams.set(param.key, param.value);
    });

    updateSearchParams(newSearchParams);
  };

  const onChangeSortingParams = (orderBy: string, orderType: string) => {
    changeSearchParams([
      {
        key: QUERY_KEYS.ORDER_BY,
        value: orderBy,
      },
      {
        key: QUERY_KEYS.ORDER_TYPE,
        value: orderType,
      },
    ]);
  };

  const combinedPurchasedItems: CombinedPurchasedItem[] = [];

  if (purchasedItemsList?.data?.purchesOrders?.content?.length > 0) {
    purchasedItemsList.data.purchesOrders.content.map((item) => {
      const itemInfo = getItemInfo?.data?.find(
        (info) => info.txt_wurth_lac_item === item.sku,
      );

      const initialDetails: OrderHistoryItem = {
        txt_wurth_lac_item: "",
        txt_sap: null,
        txt_sap_description_name: "",
        txt_x_pant_Mat_status: "",
        sel_assigned_brand: null,
        txt_CI_number: "",
        txt_hazardous: "",
        txt_special_shipping: "",
        txt_web_direct: "",
        txt_mfn: "",
        txt_uom: "",
        txt_uom_label: "",
        txt_uom_value: "",
        txt_min_order_amount: null,
        txt_order_qty_increments: null,
        txt_category: "",
        img: "",
        brand_name: "",
        categoryInfo: [],
        is_product_exclude: null,
        group_id: "",
      };

      combinedPurchasedItems.push({ ...item, ...(itemInfo || initialDetails) });
    });
  }

  console.log("itemInfo > ", getItemInfo.data);
  console.log("merged > ", combinedPurchasedItems);

  return (
    <>
      {!isLoading && (
        <div>
          <PurchasedItemsSelectors
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            onSearch={onClickSearch}
            onReset={onClickReset}
            isLoading={isLoading}
            searchParams={searchParams}
            page={page}
            perPage={perPage}
            totalItems={totalItems}
          />
        </div>
      )}

      <div className="my-6 hidden flex-row justify-between text-brand-gray-400 md:flex">
        {!isLoading && (
          <div>
            {(page - 1) * perPage + 1} - {Math.min(page * perPage, totalItems)}{" "}
            of {totalItems}
          </div>
        )}

        <div className="flex items-center">
          <div className="mr-2">Per Page:</div>

          <Select
            value={perPage.toString()}
            onValueChange={(value) => {
              changeSearchParams([
                {
                  key: QUERY_KEYS.PAGE,
                  value: "1",
                },
                {
                  key: QUERY_KEYS.PER_PAGE,
                  value: value,
                },
              ]);
            }}
          >
            <SelectTrigger className="h-8 w-[70px] py-0">
              <SelectValue>{perPage.toString()}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Pagination
          pageSize={perPage}
          totalSize={totalItems}
          currentPage={page}
          searchParams={searchParams}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="space-y-2 py-3">
              <div>Item # / MFR Part #</div>
              <Select
                value={ORDER_BY_FIELDS.SKU}
                onValueChange={(value) => {
                  onChangeSortingParams(ORDER_BY_FIELDS.SKU, value);
                }}
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>
                    {orderField == ORDER_BY_FIELDS.SKU
                      ? selectedSorting?.label
                      : DEFAULT_SORT}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {SORTING_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableHead>
            <TableHead className="space-y-2 py-3">
              <div>Order Date</div>
              <Select
                value={ORDER_BY_FIELDS.ORDER_DATE}
                onValueChange={(value) => {
                  onChangeSortingParams(ORDER_BY_FIELDS.ORDER_DATE, value);
                }}
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>
                    {orderField == ORDER_BY_FIELDS.ORDER_DATE
                      ? selectedSorting?.label
                      : DEFAULT_SORT}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {SORTING_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableHead>

            <TableHead className="space-y-2 py-3">
              <div>Order Count</div>
              <Select
                value={ORDER_BY_FIELDS.TOTAL_ITEM}
                onValueChange={(value) => {
                  onChangeSortingParams(ORDER_BY_FIELDS.TOTAL_ITEM, value);
                }}
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>
                    {orderField == ORDER_BY_FIELDS.TOTAL_ITEM
                      ? selectedSorting?.label
                      : DEFAULT_SORT}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {SORTING_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableHead>

            <TableHead className="space-y-2 py-3">Price</TableHead>
            <TableHead className="space-y-2 py-3">Quantity</TableHead>
            <TableHead className="space-y-2 py-3 text-right">UOM</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {combinedPurchasedItems &&
            combinedPurchasedItems.map((item, index) => (
              <PurchasedItemRow
                key={item.sku}
                token={token}
                index={index}
                item={item}
              />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PurchasedItemsList;
