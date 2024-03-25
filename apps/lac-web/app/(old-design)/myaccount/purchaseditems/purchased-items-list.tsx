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
import { useState } from "react";
import PurchasedItemsSelectors from "./purchased-items-selectors";
import { Option } from "./types";

const SORT_TYPES = [
  { label: "Sort...", value: "default" },
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const PurchasedItemsList = () => {
  const [itemNoOrder, setItemNoOrder] = useState<Option>(
    SORT_TYPES[0] as Option,
  );
  const [orderDateOrder, setOrderDateOrder] = useState<Option>(
    SORT_TYPES[0] as Option,
  );
  const [orderCountOrder, setOrderCountOrder] = useState<Option>(
    SORT_TYPES[0] as Option,
  );

  return (
    <>
      <PurchasedItemsSelectors />

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
            <TableHead className="space-y-2 py-3">UOM</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody></TableBody>
      </Table>
    </>
  );
};

export default PurchasedItemsList;
