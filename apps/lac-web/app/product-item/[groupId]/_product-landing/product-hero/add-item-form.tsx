"use client";

import AddToCartIcon from "@/_components/icons/add-to-cart";
import AddToFavoritesIcon from "@/_components/icons/add-to-favorites";
import FavoriteIcon from "@/_components/icons/favorite";
import Separator from "@/_components/separator";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import VerifyProductDialog from "@/_components/verify-product-dialog";
import useAccountList from "@/_hooks/account/use-account-list.hook";
import useLoginDialog from "@/_hooks/account/use-login-dialog.hook";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToFavoritesMutation from "@/_hooks/product/use-add-to-favorites-mutation.hook";
import useFavoriteSkus from "@/_hooks/product/use-favorite-skus.hook";
import usePriceCalculation from "@/_hooks/product/use-price-calculation.hook";
import { cn, getMediaUrl } from "@/_utils/helpers";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useId, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { Product } from "../../types";
import { type AddItemSchema } from "./helpers";

const buttonBaseClasses = cva(
  "flex h-9 w-full max-w-64 flex-row items-center justify-center font-wurth gap-2.5 rounded-sm border-2 text-center font-extrabold uppercase disabled:opacity-50",
);

type AddItemFormProps = {
  product: Product;
};

const AddItemForm = ({ product }: AddItemFormProps) => {
  const id = useId();
  const qtyId = `qty-${id}`;
  const { handleSubmit, register, watch } = useFormContext<AddItemSchema>();
  const quantity = watch("quantity");
  const [open, setOpen] = useState(false);

  const accountListQuery = useAccountList();
  const setOpenLoginDialog = useLoginDialog((state) => state.setOpen);

  const sku = product.selected_item?.txt_wurth_lac_item ?? "";
  const uom = product.selected_item?.txt_uom_label ?? "";
  const imgSrc = product.selected_item?.item_img[0] ?? "";

  const parsedMinOrder = parseInt(
    product.selected_item?.txt_min_order_amount ?? "1",
  );
  const minOrder = !isNaN(parsedMinOrder) ? parsedMinOrder : 1;
  const parsedQtyIncrements = parseInt(
    product.selected_item?.txt_order_qty_increments ?? "1",
  );
  const qtyIncrements = !isNaN(parsedQtyIncrements) ? parsedQtyIncrements : 1;

  const { discountedPrice, actualPrice, discountPercentage } =
    usePriceCalculation(sku, quantity, product.selected_item?.override_price);
  const isDiscounted = discountedPrice !== actualPrice;
  const favoriteSkusQuery = useFavoriteSkus(sku);
  const isFavorite = favoriteSkusQuery.data?.[0].isFavourite ?? false;

  const addToCartMutation = useAddToCartMutation();
  const onSubmit = (values: AddItemSchema) => {
    addToCartMutation.mutate(
      { sku, quantity: values.quantity },
      {
        onSuccess: () => {
          setOpen(true);
        },
      },
    );
  };

  const addToFavoritesMutation = useAddToFavoritesMutation();
  const addToFavorites = () => {
    if (product.selected_item) {
      addToFavoritesMutation.mutate({
        brandId: parseInt(product.selected_item.item_brand_code),
        brandName: product.selected_item.item_brand_name,
        categoryId: product.group_id,
        sku: product.selected_item.txt_wurth_lac_item,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="my-2.5 space-y-2">
        {!!accountListQuery.data && (
          <>
            <div className="flex flex-row items-center gap-2.5">
              <div className="text-brand-gray-500">Price: </div>

              <div className="text-lg leading-5">
                <span className="font-bold">${discountedPrice}</span> / {uom}
              </div>
            </div>

            {isDiscounted && (
              <div className="flex flex-row items-center gap-2.5">
                <div className="text-brand-gray-400 line-through">
                  ${actualPrice}
                </div>

                <div className="bg-brand-success/10 text-brand-success rounded-sm px-1 py-0.5 font-bold leading-none">
                  Save ${actualPrice - discountedPrice} ({discountPercentage}%)
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex flex-row items-center gap-[5px]">
          <Label htmlFor={qtyId}>Quantity:</Label>

          <Input
            {...register("quantity", { valueAsNumber: true })}
            type="number"
            id={qtyId}
            placeholder="Qty"
            required
            className="h-7 max-w-16 px-2"
            disabled={!accountListQuery.data}
            min={minOrder}
            step={qtyIncrements}
          />

          <span className="text-brand-gray-500">{uom}</span>
        </div>

        <div className="flex flex-row items-center gap-1.5 text-[#4F4F4F]">
          <span>Min Order : {minOrder}</span>

          <Separator
            orientation="vertical"
            className="bg-brand-gray-500 h-5 w-px"
          />

          <span>Quantity Multiple : {qtyIncrements}</span>
        </div>

        {!accountListQuery.data ? (
          <button
            className={cn(
              buttonBaseClasses(),
              "bg-brand-primary border-0 text-white",
            )}
            disabled={accountListQuery.isLoading}
            onClick={() => setOpenLoginDialog(true)}
            type="button"
          >
            Login to view price and buy
          </button>
        ) : (
          <>
            <button
              className={cn(
                buttonBaseClasses(),
                "bg-brand-primary border-0 text-white",
              )}
              disabled={addToCartMutation.isPending}
              type="submit"
            >
              <AddToCartIcon />

              <span>Add to cart</span>
            </button>

            {isFavorite ? (
              <Link
                href="/myaccount/myfavorites"
                className={cn(
                  buttonBaseClasses(),
                  "text-brand-success border-brand-success",
                )}
              >
                <FavoriteIcon />

                <span>Added to favorites</span>
              </Link>
            ) : (
              <button
                className={cn(
                  buttonBaseClasses(),
                  "text-brand-secondary border-brand-secondary",
                )}
                type="button"
                onClick={addToFavorites}
                disabled={addToFavoritesMutation.isPending}
              >
                <AddToFavoritesIcon />

                <span>Add to favorites</span>
              </button>
            )}
          </>
        )}
      </form>

      <VerifyProductDialog
        open={open}
        onOpenChange={setOpen}
        product={{
          image: {
            src: getMediaUrl(imgSrc),
            alt: `An image of ${product.page_title}`,
          },
          sku,
          name: product.page_title,
          uom,
          price: product.selected_item?.override_price,
        }}
        quantity={quantity}
      />
    </>
  );
};

export default AddItemForm;
