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
    <section>
      <h1 className="mb-6 mt-4 md:mb-7 md:mt-6 text-2xl font-light tracking-[-0.144px] text-wurth-gray-800 mx-4 md:mx-0 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
        <span className="font-medium">Cart</span> ({data["total-quantity"]}{" "}
        {data["total-quantity"] === 1 ? "item" : "items"})
      </h1>

      <ul className="flex flex-col">
        {data.cartItems.map((item) => (
          <li
            key={item.itemInfo.productid}
            className="px-4 md:px-0 pb-7 [&:not(:first-child)]:pt-7 border-b border-b-wurth-gray-250"
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
    </section>
  );
};

export default CartList;
