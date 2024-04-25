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
          key={item.itemInfo.productid}
          className="border-b border-b-wurth-gray-250 px-4 pb-7 md:px-0 [&:not(:first-child)]:pt-7"
        >
          <Suspense fallback={<CartItemFallback />}>
            <CartItem
              key={item.itemInfo.productid}
              product={{
                id: parseInt(item.itemInfo.productid),
                title: item.itemInfo.txt_meta_title,
                sku: item.itemInfo.txt_wurth_lac_item,
                manufacturerId: item.itemInfo.txt_mfn,
                quantity: item.quantity,
                configuration: item.configuration,
                minAmount: parseInt(item.itemInfo.txt_min_order_amount),
                increment: parseInt(item.itemInfo.txt_order_qty_increments),
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
