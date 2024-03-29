"use client";

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
  QUERY_KEYS,
  SORTING_BY_FIELDS,
  SORTING_TYPES,
} from "./constants";
import PurchasedItemRow from "./purchased-item-row";
import PurchasedItemsListForMobile from "./purchased-items-list-for-mobile";
import PurchasedItemsSelectors from "./purchased-items-selectors";
import TotalCountAndPagination from "./total-count-and-pagination";
import { CombinedPurchasedItem, OrderHistoryItem } from "./types";
import useGetItemInfo from "./use-get-items-info.hook";
import useSuspensePurchasedItemsList from "./use-suspense-purchased-items-list.hook";

const PurchasedItemsList = ({ token }: { token: string }) => {
  const INIT_SORTING_TYPE = "desc";
  const INIT_PAGE_NUMBER = "1";
  const INIT_PER_PAGE = "1";
  const INIT_FROM_DATE = dayjs().subtract(1, "year").format("YYYY-MM-DD");
  const INIT_TO_DATE = dayjs().format("YYYY-MM-DD");
  const INIT_SORTING_FIELD = SORTING_BY_FIELDS.ORDER_DATE;

  const searchParams = useSearchParams();
  const orderField = searchParams.get("orderBy") ?? INIT_SORTING_FIELD;
  const orderType = searchParams.get("orderType") ?? INIT_SORTING_TYPE;
  const page = Number(searchParams.get("page") ?? INIT_PAGE_NUMBER);
  const perPage = Number(searchParams.get("perPage") ?? INIT_PER_PAGE);

  let isLoading = true;
  let totalItems = 0;

  const selectedSorting = SORTING_TYPES.find(
    (sortingType) => sortingType.value === orderType,
  );

  const [fromDate, setFromDate] = useState(new Date(INIT_FROM_DATE));
  const [toDate, setToDate] = useState(new Date());

  const purchasedItemsList = useSuspensePurchasedItemsList(
    token,
    searchParams.get("from") ?? INIT_FROM_DATE,
    searchParams.get("to") ?? INIT_TO_DATE,
    Number(searchParams.get("page") ?? page) - 1,
    perPage,
    orderField,
    orderType,
  );

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
    setFromDate(new Date(INIT_FROM_DATE));
    setToDate(new Date(INIT_TO_DATE));

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

  return (
    <>
      {!isLoading && (
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
          changeSearchParams={changeSearchParams}
        />
      )}

      <TotalCountAndPagination
        isLoading={isLoading}
        searchParams={searchParams}
        page={page}
        perPage={perPage}
        totalItems={totalItems}
        changeSearchParams={changeSearchParams}
      />

      {/* Mobile View for Items List */}
      <PurchasedItemsListForMobile items={combinedPurchasedItems} />

      {/* Desktop View for Items List */}
      <Table className="hidden md:block">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="space-y-2 py-3">
              <div>Item # / MFR Part #</div>
              <Select
                value={SORTING_BY_FIELDS.SKU}
                onValueChange={(value) => {
                  onChangeSortingParams(SORTING_BY_FIELDS.SKU, value);
                }}
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>
                    {orderField == SORTING_BY_FIELDS.SKU
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
                value={SORTING_BY_FIELDS.ORDER_DATE}
                onValueChange={(value) => {
                  onChangeSortingParams(SORTING_BY_FIELDS.ORDER_DATE, value);
                }}
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>
                    {orderField == SORTING_BY_FIELDS.ORDER_DATE
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
                value={SORTING_BY_FIELDS.TOTAL_ITEMS}
                onValueChange={(value) => {
                  onChangeSortingParams(SORTING_BY_FIELDS.TOTAL_ITEMS, value);
                }}
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>
                    {orderField == SORTING_BY_FIELDS.TOTAL_ITEMS
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

            <TableHead className="space-y-2 py-3 text-center">Price</TableHead>
            <TableHead className="space-y-2 py-3">Quantity</TableHead>
            <TableHead className="space-y-2 py-3">UOM</TableHead>
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

      <TotalCountAndPagination
        isLoading={isLoading}
        searchParams={searchParams}
        page={page}
        perPage={perPage}
        totalItems={totalItems}
        changeSearchParams={changeSearchParams}
      />
    </>
  );
};

export default PurchasedItemsList;
