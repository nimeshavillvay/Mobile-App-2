"use client";

import ProductCard from "@/_components/product-card";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type { FeaturedBrandGroup } from "./types";

type FeaturedBrandListProps = {
  token?: string;
  groups: FeaturedBrandGroup[];
};

const FeaturedBrandList = ({ token, groups }: FeaturedBrandListProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    token,
    groups
      .flatMap((group) => group.itemSkuList)
      .map((product) => ({
        productId: Number(product.productId),
        qty: 1,
      })),
  );

  const gtmProducts = priceCheckQuery.data.productPrices.map((product) => {
    return {
      productid: Number(product.productId),
      cartid: 0,
      quantity: 1,
    };
  });
  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  return groups.map((group) => {
    const productIds = group.itemSkuList.map((item) => item.productId);

    const prices = priceCheckQuery.data.productPrices.filter((price) =>
      productIds.includes(price.productId.toString()),
    );

    return (
      <ProductCard
        key={group.groupId}
        product={{
          groupName: group.groupName,
          groupImage: group.groupImage,
          variants: group.itemSkuList.map((item) => ({
            id: item.productId,
            slug: item.slug,
            sku: item.productSku,
            title: item.productName,
            image: item.image,
            uom: item.unitOfMeasure,
            onSale: item.isSaleItem,
            isNewItem: item.isNewItem,
          })),
          gtmProduct: gtmItemInfo ?? [],
        }}
        token={token}
        prices={prices.map((price) => ({
          listPrice: price.listPrice,
          price: price.price,
          productId: price.productId,
          uomPrice: price.uomPrice,
          uomPriceUnit: price.uomPriceUnit,
        }))}
      />
    );
  });
};

export default FeaturedBrandList;
