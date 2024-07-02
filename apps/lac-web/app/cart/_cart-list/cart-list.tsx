"use client";

import useSuspenseWillCallPlant from "@/_hooks/address/use-suspense-will-call-plant.hook";
import useDeleteCartItemMutation from "@/_hooks/cart/use-delete-cart-item-mutation.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
import type { Plant } from "@/_lib/types";
import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import { Close } from "@repo/web-ui/components/icons/close";
import { Trash } from "@repo/web-ui/components/icons/trash";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/web-ui/components/ui/alert-dialog";
import { Button } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import CartItemFallback from "../cart-item-fallback";
import useCartPageStore from "../use-cart-page-store.hook";
import useCartStore from "../use-cart-store.hook";
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
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { data } = useSuspenseCart(token);
  const willCallPlantQuery = useSuspenseWillCallPlant(token);
  const deleteCartItemMutation = useDeleteCartItemMutation(token);
  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const handleClearCart = () => {
    if (data.cartItems.length > 0) {
      const cartItemIds = data.cartItems.map((item) => ({
        cartid: item.cartItemId,
      }));

      if (cartItemIds.length > 0) {
        deleteCartItemMutation.mutate(
          {
            products: cartItemIds,
          },
          {
            onSettled: () => {
              setDeleteConfirmation(false);
            },
          },
        );

        updateCartConfigMutation.mutate({ coupon: "" });
      }
    }
  };

  // TODO Delete this hook after refactoring the entire cart item section
  const cartItemKey = useCartPageStore((state) => state.cartItemKey);

  const excludedSkus = useCartStore((state) => state.excludedSkus);
  const discontinuedSkus = useCartStore((state) => state.discontinuedSkus);
  const { setExcludedSkus, setDiscontinuedSkus } = useCartStore(
    (state) => state.actions,
  );

  return (
    <>
      {Array.isArray(excludedSkus) && excludedSkus.length > 0 && (
        <Alert variant="destructive" className="mb-2">
          <AlertIcon className="size-4" />
          <AlertContent>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {excludedSkus
                .join(", ")
                .concat(
                  excludedSkus.length === 1 ? " Product is" : " Products are",
                )
                .concat(
                  " not available online. Please call Customer Service for availability",
                )}
            </AlertDescription>
          </AlertContent>
          <Button
            className="absolute right-1 top-1 h-fit w-fit cursor-pointer hover:bg-transparent"
            variant="ghost"
            type="button"
            onClick={() => setExcludedSkus([])}
          >
            <Close className="stroke-red-800" width={12} height={12} />
          </Button>
        </Alert>
      )}

      {Array.isArray(discontinuedSkus) && discontinuedSkus.length > 0 && (
        <Alert variant="destructive" className="mb-2">
          <AlertIcon className="size-4" />
          <AlertContent>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {discontinuedSkus
                .join(", ")
                .concat(
                  discontinuedSkus.length === 1
                    ? " Product has"
                    : " Products have",
                )
                .concat(" been discontinued")}
            </AlertDescription>
          </AlertContent>
          <Button
            className="absolute right-1 top-1 h-fit w-fit cursor-pointer hover:bg-transparent"
            variant="ghost"
            type="button"
            onClick={() => setDiscontinuedSkus([])}
          >
            <Close className="stroke-red-800" width={12} height={12} />
          </Button>
        </Alert>
      )}

      <ul className="flex flex-col gap-2.5">
        {data.cartItems.map((item) => (
          <li
            key={`${item.itemInfo.productId}-${item.cartItemId}`}
            className="border-b border-b-wurth-gray-250 px-4 pb-7 md:px-0 [&:not(:first-child)]:pt-7"
          >
            <Suspense fallback={<CartItemFallback />}>
              <CartItem
                key={cartItemKey.toString()}
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
                  uom: item.itemInfo.unitOfMeasure,
                  isHazardous: item.itemInfo.isHazardous,
                  isDirectlyShippedFromVendor:
                    item.itemInfo.isDirectlyShippedFromVendor,
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
            <AlertDialog
              open={deleteConfirmation}
              onOpenChange={setDeleteConfirmation}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="subtle"
                  className="flex-1 bg-red-50 font-bold text-wurth-red-650 hover:bg-red-100 md:flex-none"
                  disabled={deleteCartItemMutation.isPending}
                >
                  <Trash className="size-4 fill-wurth-red-650" />
                  <span>Clear cart</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure want to delete your cart?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleClearCart()}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <div className="flex-1 md:hidden">
            <DynamicAddMoreItemsSectionForMobile token={token} />
          </div>
        </div>
      </ul>
    </>
  );
};

export default CartList;
