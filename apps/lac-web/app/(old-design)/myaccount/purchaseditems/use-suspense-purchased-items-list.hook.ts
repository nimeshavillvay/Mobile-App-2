import { api } from "@/_lib/api";
import type {
  OldPurchasedItems,
  Pagination,
  PurchasedItems,
  PurchasedProduct,
} from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspensePurchasedItemsList = (
  token: string,
  fromDate: string,
  toDate: string,
  page: number,
  size: number,
  orderField: string,
  orderType: string,
) => {
  return useSuspenseQuery({
    queryKey: [
      "user",
      "order-history",
      token,
      fromDate,
      toDate,
      page,
      size,
      orderField,
      orderType,
    ],
    queryFn: () =>
      api
        .get("rest/order-history/purchase", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: {
            from: fromDate,
            to: toDate,
            page: page,
            size: size,
            field: orderField,
            order: orderType,
          },
        })
        .json<OldPurchasedItems>(),
    select: (data): PurchasedItems => {
      const { products, pagination } = data;

      const mappedProducts = products.map(
        ({
          product,
          sku,
          id,
          totalItem,
          orderDate,
          isFavourite,
        }): PurchasedProduct => ({
          productTitle: product,
          productSku: sku,
          productId: Number(id),
          totalItem: Number(totalItem),
          purchaseOrderDate: orderDate,
          isFavorite: isFavourite,
        }),
      );

      const firstPagination = pagination[0] || {
        db_count: "0",
        offset: 0,
        perPage: 0,
      };

      const mappedPagination: Pagination = {
        totalCount: Number(firstPagination.db_count),
        offset: firstPagination.offset,
        perPage: firstPagination.perPage,
      };

      return { products: mappedProducts, pagination: mappedPagination };
    },
  });
};

export default useSuspensePurchasedItemsList;
