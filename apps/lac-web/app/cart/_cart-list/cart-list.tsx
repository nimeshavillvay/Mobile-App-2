"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import type { Plant, ShippingMethod } from "@/_lib/types";
import { Suspense } from "react";
import CartItemFallback from "../cart-item-fallback";
import CartItem from "./cart-item";

type CartListProps = {
  token: string;
  shippingMethods: ShippingMethod[];
  plants: Plant[];
};

const CartList = ({ token, shippingMethods, plants }: CartListProps) => {
  const { data } = useSuspenseCart(token);

  return (
    <ul className="flex flex-col">
      {data.cartItems.map((item) => (
        <li
          key={item.itemInfo.productId}
          className="border-b border-b-wurth-gray-250 px-4 pb-7 md:px-0 [&:not(:first-child)]:pt-7"
        >
          <Suspense fallback={<CartItemFallback />}>
            <CartItem
              key={item.itemInfo.productId}
              token={token}
              product={{
                id: item.itemInfo.productId,
                title: item.itemInfo.metaTitle,
                sku: item.itemInfo.productSku,
                manufacturerId: item.itemInfo.mfrPartNo,
                quantity: item.quantity,
                configuration: item.configuration,
                minAmount: item.itemInfo.minimumOrderQuantity,
                increment: item.itemInfo.quantityByIncrements,
                isFavourite: item.itemInfo.isFavourite,
                favoriteIds: item.itemInfo.favoriteIds,
              }}
              shippingMethods={shippingMethods}
              plants={plants}
            />
          </Suspense>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
