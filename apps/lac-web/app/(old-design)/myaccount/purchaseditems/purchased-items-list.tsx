"use client";

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
import { useState } from "react";
import PurchasedItemRow from "./purchased-item-row";
import PurchasedItemsSelectors from "./purchased-items-selectors";
import { CombinedPurchasedItem, Option, OrderHistoryItem } from "./types";
import useGetItemInfo from "./use-get-items-info.hook";
import useSuspensePurchasedItemsList from "./use-suspense-purchased-items-list.hook";

const SORT_TYPES = [
  { label: "Sort...", value: "default" },
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const PurchasedItemsList = ({ token }: { token: string }) => {
  const [itemNoOrder, setItemNoOrder] = useState<Option>(
    SORT_TYPES[0] as Option,
  );
  const [orderDateOrder, setOrderDateOrder] = useState<Option>(
    SORT_TYPES[0] as Option,
  );
  const [orderCountOrder, setOrderCountOrder] = useState<Option>(
    SORT_TYPES[0] as Option,
  );

  const [fromDate, setFromDate] = useState<Date>(
    new Date(dayjs().subtract(1, "year").format("YYYY-MM-DD")),
  );
  const [toDate, setToDate] = useState<Date>(new Date());
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [orderField, setOrderField] = useState<string>("orderDate");
  const [orderType, setOrderType] = useState<string>("desc");

  const purchasedItemsList = useSuspensePurchasedItemsList(
    token,
    dayjs(fromDate).format("YYYY-MM-DD"),
    dayjs(toDate).format("YYYY-MM-DD"),
    page,
    size,
    orderField,
    orderType,
  );

  const skuIds: string[] = [];
  purchasedItemsList.data.purchesOrders.content.forEach((element) => {
    const isExist = skuIds.find((e) => e === element.sku);
    if (!isExist) {
      skuIds.push(element.sku);
    }
  });

  const getItemInfo = useGetItemInfo(token, skuIds.toString());

  const onSearch = () => {
    console.log("search", purchasedItemsList.data);
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
      <PurchasedItemsSelectors
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        onSearch={onSearch}
      />

      <div className="my-6 flex flex-row justify-between text-brand-gray-400">
        <div>1-10 of 17</div>

        <div>Per Page:</div>

        <div>1</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="space-y-2 py-3">
              <div>Item # / MFR Part #</div>
              <Select
                value={itemNoOrder.value}
                onValueChange={(value) =>
                  setItemNoOrder(
                    SORT_TYPES.find((type) => type.value === value) ??
                      (SORT_TYPES[0] as Option),
                  )
                }
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>{itemNoOrder.label}</SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {SORT_TYPES.map((type) => (
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
                value={orderDateOrder.value}
                onValueChange={(value) =>
                  setOrderDateOrder(
                    SORT_TYPES.find((type) => type.value === value) ??
                      (SORT_TYPES[0] as Option),
                  )
                }
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>{orderDateOrder.label}</SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {SORT_TYPES.map((type) => (
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
                value={orderCountOrder.value}
                onValueChange={(value) =>
                  setOrderCountOrder(
                    SORT_TYPES.find((type) => type.value === value) ??
                      (SORT_TYPES[0] as Option),
                  )
                }
              >
                <SelectTrigger className="h-8 w-[120px] py-0">
                  <SelectValue>{orderCountOrder.label}</SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {SORT_TYPES.map((type) => (
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
              <PurchasedItemRow key={item.sku} index={index} item={item} />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PurchasedItemsList;
