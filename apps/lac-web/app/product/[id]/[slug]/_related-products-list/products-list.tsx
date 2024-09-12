"use client";

import ProductCard from "@/_components/product-card";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { getBoolean } from "@/_lib/utils";
import type { RelatedProduct } from "../types";

type ProductsListProps = {
  readonly token: string;
  readonly products: RelatedProduct[];
};

const ProductsList = ({ token, products }: ProductsListProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    token,
    products.map((product) => ({
      productId: Number(product.productid),
      qty: 1,
    })),
  );

  return products.map((item) => {
    const priceData = priceCheckQuery.data.productPrices.find(
      (price) => Number(price.productId) === Number(item.productid),
    );

    if (!priceData) {
      return null;
    }

    return (
      <ProductCard
        key={item.productid}
        product={{
          groupName: item.item_name,
          groupImage: item.img,
          variants: [
            {
              id: item.productid,
              image: item.img,
              sku: item.txt_wurth_lac_item,
              slug: item.slug,
              title: item.item_name,
              uom: item.txt_uom,
              onSale: getBoolean(item.on_sale),
              isNewItem: getBoolean(item.is_new),
            },
          ],
        }}
        token={token}
        orientation="horizontal"
        prices={[priceData]}
      />
    );
  });
};

export default ProductsList;
