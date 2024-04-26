"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import { Suspense } from "react";
import CartItemFallback from "../cart-item-fallback";
import { ShippingMethod } from "../types";
import CartItem from "./cart-item";

type CartListProps = {
  shippingMethods: ShippingMethod[];
};

const CartList = ({ shippingMethods }: CartListProps) => {
  const { data } = useSuspenseCart();

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
              product={{
                id: item.itemInfo.productId,
                title: item.itemInfo.metaTitle,
                sku: item.itemInfo.productSku,
                manufacturerId: item.itemInfo.mfrPartNo,
                quantity: item.quantity,
                configuration: item.configuration,
                minAmount: item.itemInfo.minimumOrderQuantity,
                increment: item.itemInfo.quantityByIncrements,
              }}
              shippingMethods={shippingMethods}
            />
          </Suspense>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
