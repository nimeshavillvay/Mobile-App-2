"use client";

import useItemInfo from "@/_hooks/product/use-item-info.hook";
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
import { CombinedPurchasedItem } from "./types";
import useSuspensePurchasedItemsList from "./use-suspense-purchased-items-list.hook";

const PurchasedItemsList = ({ token }: { token: string }) => {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from") ?? INIT_FROM_DATE;
  const toDate = searchParams.get("to") ?? INIT_TO_DATE;
  const orderField = searchParams.get("orderBy") ?? INIT_SORTING_FIELD;
  const orderType = searchParams.get("orderType") ?? INIT_SORTING_TYPE;
  const page = Number(searchParams.get("page") ?? INIT_PAGE_NUMBER);
  const perPage = Number(searchParams.get("perPage") ?? INIT_PER_PAGE);

  let isLoading = true;
  let totalItems = 0;

  const selectedSorting = SORTING_TYPES.find(
    (sortingType) => sortingType.value === orderType,
  );

  const purchasedItemsList = useSuspensePurchasedItemsList(
    token,
    fromDate,
    toDate,
    page - 1,
    perPage,
    orderField,
    orderType,
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

  const getItemInfo = useItemInfo(productIds);
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

  const combinedPurchasedItems: CombinedPurchasedItem[] = [];

  if (purchasedItemsList.data.pagination.totalCount > 0) {
    purchasedItemsList.data.products.forEach((item) => {
      const itemInfo = getItemInfo?.data?.find(
        (info) => info.productSku === item.productSku,
      );

      const initialDetails: ItemInfo = {
        productId: 0,
        isExcludedProduct: false,
        productSku: "",
        productName: "",
        image: "",
        isComparison: false,
        skuAttribute: "",
        isHazardous: false,
        specialShipping: false,
        productIdOnSap: "",
        mfrPartNo: "",
        productDescription: "",
        productTitle: "",
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

      // TODO Fix this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      combinedPurchasedItems.push({
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

      <TotalCountAndPagination isLoading={isLoading} totalItems={totalItems} />

      {/* Mobile View for Items List */}
      <PurchasedItemsListForMobile
        items={combinedPurchasedItems}
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

              <TableHead className="space-y-2 py-3 text-center">
                Price
              </TableHead>
              <TableHead className="space-y-2 py-3">Quantity</TableHead>
              <TableHead className="space-y-2 py-3">UOM</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {combinedPurchasedItems?.map((item, index) => (
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

      <TotalCountAndPagination isLoading={isLoading} totalItems={totalItems} />
    </>
  );
};

export default PurchasedItemsList;
