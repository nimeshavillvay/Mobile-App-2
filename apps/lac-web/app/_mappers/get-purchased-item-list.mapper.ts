import type { PurchasedItems } from "@/_lib/types";

export const mapGetPurchasedItemListResponse = (response: PurchasedItems) => {
  const { products, pagination } = response;

  const mappedProducts = products.map(
    ({ product, sku, id, totalItem, orderDate }) => ({
      productTitle: product,
      productSku: sku,
      productId: Number(id),
      totalItem: Number(totalItem),
      purchaseOrderDate: orderDate,
    }),
  );

  const mappedPagination = {
    totalCount: Number(pagination[0]?.db_count ?? 0),
    offset: pagination[0]?.offset ?? 0,
    perPage: pagination[0]?.perPage ?? 0,
  };

  return { products: mappedProducts, pagination: mappedPagination };
};
