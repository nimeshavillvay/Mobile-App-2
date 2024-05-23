"use client";

import useItemInfo from "@/_hooks/product/use-item-info.hook";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { ItemInfo } from "@/_lib/types";
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
import { useSearchParams } from "next/navigation";
import { changeSearchParams } from "./client-helpers";
import {
  DEFAULT_SORT,
  INIT_FROM_DATE,
  INIT_PAGE_NUMBER,
  INIT_PER_PAGE,
  INIT_SORTING_FIELD,
  INIT_SORTING_TYPE,
  INIT_TO_DATE,
  QUERY_KEYS,
  SORTING_BY_FIELDS,
  SORTING_TYPES,
} from "./constants";
import PurchasedItemRow from "./purchased-item-row";
import PurchasedItemsListForMobile from "./purchased-items-list-for-mobile";
import PurchasedItemsSelectors from "./purchased-items-selectors";
import TotalCountAndPagination from "./total-count-and-pagination";
import { DetailedPurchasedItem } from "./types";
import useSuspensePurchasedItemsList from "./use-suspense-purchased-items-list.hook";

const PurchasedItemsList = ({ token }: { token: string }) => {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get(QUERY_KEYS.FROM_DATE) ?? INIT_FROM_DATE;
  const toDate = searchParams.get(QUERY_KEYS.TO_DATE) ?? INIT_TO_DATE;
  const orderBy = searchParams.get(QUERY_KEYS.ORDER_BY) ?? INIT_SORTING_FIELD;
  const orderType =
    searchParams.get(QUERY_KEYS.ORDER_TYPE) ?? INIT_SORTING_TYPE;
  const page = Number(searchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    searchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE,
  );

  let isLoading = true;
  let totalItems = 0;

  const selectedSorting = SORTING_TYPES.find(
    (sortingType) => sortingType.value === orderType,
  );

  const filtersQuery = useSuspenseFilters(token, {
    type: "Purchases",
    from: fromDate,
    to: toDate,
  });

  const purchasedItemsList = useSuspensePurchasedItemsList(
    token,
    fromDate,
    toDate,
    page,
    perPage,
    orderBy,
    orderType,
    filtersQuery.data,
  );

  const productIds: number[] = [];
  if (purchasedItemsList.data) {
    totalItems = purchasedItemsList.data.pagination.totalCount;

    purchasedItemsList.data.products.forEach((product) => {
      const isExist = productIds.find((id) => id === product.productId);
      if (!isExist) {
        productIds.push(product.productId);
      }
    });
  }

  const getItemInfo = useItemInfo(productIds, token);
  if (purchasedItemsList && getItemInfo) {
    isLoading = false;
  }

  const onChangeSortingParams = (orderBy: string, orderType: string) => {
    changeSearchParams(searchParams, [
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

  const detailedPurchasedItems: DetailedPurchasedItem[] = [];

  if (purchasedItemsList.data.pagination.totalCount > 0) {
    purchasedItemsList.data.products.forEach((item) => {
      const itemInfo = getItemInfo?.data?.find(
        (info) => info.productSku === item.productSku,
      );

      const initialDetails: ItemInfo = {
        productId: item.productId,
        slug: "",
        isExcludedProduct: false,
        productSku: item.productSku,
        productName: "",
        image: "",
        isComparison: false,
        isHazardous: false,
        specialShipping: false,
        productIdOnSap: "",
        mfrPartNo: "",
        productDescription: "",
        productTitle: item.productTitle,
        brandCode: 0,
        unitOfMeasure: "",
        boxQuantity: 0,
        minimumOrderQuantity: 0,
        quantityByIncrements: 0,
        weight: 0,
        prop65MessageOne: "",
        prop65MessageTwo: "",
        prop65MessageThree: "",
        listPrice: 0,
        isSaleItem: false,
        fClassId: 0,
        class: "",
        attributes: [],
        productStatus: "",
        isDirectlyShippedFromVendor: false,
        productSummary: "",
        brand: "",
        productCategory: "",
      };

      detailedPurchasedItems.push({
        ...item,
        ...(itemInfo ?? initialDetails),
      });
    });
  }

  return (
    <>
      {!isLoading && (
        <PurchasedItemsSelectors
          isLoading={isLoading}
          totalItems={totalItems}
        />
      )}

      <TotalCountAndPagination
        isLoading={isLoading}
        totalItems={totalItems}
        itemCountOnly
      />

      {/* Mobile View for Items List */}
      <PurchasedItemsListForMobile
        items={detailedPurchasedItems}
        token={token}
      />

      {/* Desktop View for Items List */}
      <div className="hidden md:block">
        <Table>
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
                      {orderBy === SORTING_BY_FIELDS.SKU
                        ? selectedSorting?.label
                        : DEFAULT_SORT}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {SORTING_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="pl-2"
                      >
                        <div>{type.label}</div>
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
                      {orderBy === SORTING_BY_FIELDS.ORDER_DATE
                        ? selectedSorting?.label
                        : DEFAULT_SORT}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {SORTING_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="pl-2"
                      >
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
                      {orderBy === SORTING_BY_FIELDS.TOTAL_ITEMS
                        ? selectedSorting?.label
                        : DEFAULT_SORT}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {SORTING_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="pl-2"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>

              <TableHead className="space-y-2 py-3 text-center">
                Price
              </TableHead>
              <TableHead className="space-y-2 py-3">Quantity</TableHead>
              <TableHead className="space-y-2 py-3">UOM</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {detailedPurchasedItems.length > 0 &&
              detailedPurchasedItems.map((item, index) => (
                <PurchasedItemRow
                  key={`${item.productId}_${index}`}
                  token={token}
                  index={index}
                  item={item}
                />
              ))}
          </TableBody>
        </Table>
      </div>

      {detailedPurchasedItems.length > 0 && totalItems >= perPage && (
        <TotalCountAndPagination
          isLoading={isLoading}
          totalItems={totalItems}
        />
      )}
    </>
  );
};

export default PurchasedItemsList;
