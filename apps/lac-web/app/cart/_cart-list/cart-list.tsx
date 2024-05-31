"use client";

import useSuspenseWillCallPlant from "@/_header/_will-call-plant/use-suspense-will-call-plant.hook";
import useDeleteCartItemMutation from "@/_hooks/cart/use-delete-cart-item-mutation.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import type { Plant } from "@/_lib/types";
import { Trash } from "@repo/web-ui/components/icons/trash";
import { Button } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import CartItemFallback from "../cart-item-fallback";
import CartItem from "./cart-item";

type CartListProps = {
  readonly token: string;
  readonly plants: Plant[];
};

const DynamicAddMoreItemsSectionForMobile = dynamic(
  () => import("../_add-more-items/add-more-items-form-mobile"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[36px] w-full" />,
  },
);

const CartList = ({ token, plants }: CartListProps) => {
  const { data } = useSuspenseCart(token);
  const willCallPlantQuery = useSuspenseWillCallPlant(token);
  const deleteCartItemMutation = useDeleteCartItemMutation(token);

  const handleClearCart = () => {
    if (data.cartItems.length > 0) {
      const cartItemIds = data.cartItems.map((item) => ({
        cartid: item.cartItemId,
      }));

      if (cartItemIds.length > 0) {
        deleteCartItemMutation.mutate({
          products: cartItemIds,
        });
      }
    }
  };

  return (
    <ul className="flex flex-col gap-2.5">
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
                isExcludedProduct: item.itemInfo.isExcludedProduct,
              }}
              plants={plants}
              cartConfiguration={data.configuration}
              willCallPlant={willCallPlantQuery?.data}
            />
          </Suspense>
        </li>
      ))}

      <div className="flex w-full justify-end gap-4 px-4 md:px-0">
        {data.cartItems.length > 0 && (
          <Button
            variant="subtle"
            className="flex-1 bg-red-50 font-bold text-wurth-red-650 hover:bg-red-100 md:flex-none"
            onClick={() => handleClearCart()}
          >
            <Trash className="size-4 fill-wurth-red-650" />
            <span>Clear cart</span>
          </Button>
        )}

        <div className="flex-1">
          <DynamicAddMoreItemsSectionForMobile token={token} />
        </div>
      </div>
    </ul>
  );
};

export default CartList;
