"use client";

import ProductCard from "@/_components/product-card";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type { MappedFeaturedProduct } from "./type";

type FlashSaleListProps = {
  readonly token?: string;
  readonly products: MappedFeaturedProduct[];
};

const FlashSaleList = ({ token, products }: FlashSaleListProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    token,
    products.map((product) => ({
      productId: Number(product.productId),
      qty: 1,
    })),
  );

  return products.map((product) => {
    const priceData = priceCheckQuery.data.productPrices.find(
      (price) => price.productId.toString() === product.productId,
    );

    if (!priceData) {
      return null;
    }

    return (
      <ProductCard
        key={product.productId}
        orientation="vertical"
        token={token}
        product={{
          groupName: product.productTitle,
          groupImage: product.groupImage,
          variants: [
            {
              id: product.productId,
              slug: product.slug,
              sku: product.productSku,
              title: product.productTitle,
              image: product.productImage,
              uom: product.unitOfMeasure,
              isNewItem: product.isNewItem,
            },
          ],
        }}
        prices={[
          {
            productId: priceData.productId,
            listPrice: priceData.listPrice,
            price: priceData.price,
            uomPrice: priceData.uomPrice,
            uomPriceUnit: priceData.uomPriceUnit,
          },
        ]}
      />
    );
  });
};

export default FlashSaleList;
