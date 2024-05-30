"use client";

import useSuspenseWillCallPlant from "@/_header/_will-call-plant/use-suspense-will-call-plant.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import type { Plant } from "@/_lib/types";
import { Suspense } from "react";
import CartItemFallback from "../cart-item-fallback";
import CartItem from "./cart-item";

type CartListProps = {
  readonly token: string;
  readonly plants: Plant[];
};

const CartList = ({ token, plants }: CartListProps) => {
  const { data } = useSuspenseCart(token);
  const willCallPlantQuery = useSuspenseWillCallPlant(token);

  return (
    <ul className="flex flex-col">
      {data.cartItems.map((item) => (
        <li
          key={`${item.itemInfo.productId}-${item.cartItemId}`}
          className="border-b border-b-wurth-gray-250 px-4 pb-7 md:px-0 [&:not(:first-child)]:pt-7"
        >
          <Suspense fallback={<CartItemFallback />}>
            <CartItem
              key={`${item.itemInfo.productId}-${item.cartItemId}`}
              token={token}
              product={{
                id: item.itemInfo.productId,
                title:
                  item.itemInfo.metaTitle === ""
                    ? item.itemInfo.productName
                    : item.itemInfo.metaTitle,
                sku: item.itemInfo.productSku,
                manufacturerId: item.itemInfo.mfrPartNo,
                quantity: item.quantity,
                configuration: item.configuration,
                minAmount: item.itemInfo.minimumOrderQuantity,
                increment: item.itemInfo.quantityByIncrements,
                image: item.itemInfo.image,
                cartItemId: item.cartItemId,
                slug: item.itemInfo.slug,
              }}
              plants={plants}
              cartConfiguration={data.configuration}
              willCallPlant={willCallPlantQuery?.data}
            />
          </Suspense>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
