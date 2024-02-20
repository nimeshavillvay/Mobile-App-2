"use client";

import AddToCartIcon from "@/_components/icons/add-to-cart";
import AddToFavoritesIcon from "@/_components/icons/add-to-favorites";
import FavoriteIcon from "@/_components/icons/favorite";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import { TableCell, TableRow } from "@/_components/ui/table";
import VisuallyHidden from "@/_components/visually-hidden";
import useAccountList from "@/_hooks/account/use-account-list.hook";
import useLoginDialog from "@/_hooks/account/use-login-dialog.hook";
import useAddToFavoritesMutation from "@/_hooks/product/use-add-to-favorites-mutation.hook";
import useFavoriteSkus from "@/_hooks/product/use-favorite-skus.hook";
import usePriceCalculation from "@/_hooks/product/use-price-calculation.hook";
import usePriceCheck from "@/_hooks/product/use-price-check.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import * as z from "zod";
import type { Product } from "../../types";
import type { Attribute, Variant } from "../types";

const schema = z.object({
  quantity: z.number().int().min(1),
});
type Schema = z.infer<typeof schema>;

type VariantRowProps = {
  product: Product;
  variant: Variant;
  attributes: Attribute[];
};

const VariantRow = ({ product, variant, attributes }: VariantRowProps) => {
  const id = useId();
  const qtyId = `qty-${id}`;

  const setLoginDialogOpen = useLoginDialog((state) => state.setOpen);
  const accountListQuery = useAccountList();
  const favoriteSkusQuery = useFavoriteSkus(variant.txt_wurth_lac_item);

  const { register, handleSubmit, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const quantity = watch("quantity") ?? 1;

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  const priceCheckQuery = usePriceCheck(variant.txt_wurth_lac_item, quantity);
  const { discountedPrice, actualPrice, discountPercentage } =
    usePriceCalculation(variant.txt_wurth_lac_item, quantity);

  const addToFavoritesMutation = useAddToFavoritesMutation();
  const addToFavorites = () => {
    addToFavoritesMutation.mutate({
      brandId: parseInt(variant.sel_assigned_brand),
      brandName: product.brand_name,
      categoryId: product.group_id,
      sku: variant.txt_wurth_lac_item,
    });
  };

  const priceBreakdowns: { qty: number; price: number }[] = [];
  if (
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.quantity1 &&
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.price1
  ) {
    priceBreakdowns.push({
      qty: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.quantity1,
      price: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.price1,
    });
  }
  if (
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.quantity2 &&
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.price2
  ) {
    priceBreakdowns.push({
      qty: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.quantity2,
      price: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.price2,
    });
  }
  if (
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.quantity3 &&
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.price3
  ) {
    priceBreakdowns.push({
      qty: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.quantity3,
      price: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.price3,
    });
  }
  if (
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.quantity4 &&
    priceCheckQuery.data?.["list-sku-price"][0].pricebreakdowns.price4
  ) {
    priceBreakdowns.push({
      qty: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.quantity4,
      price: priceCheckQuery.data["list-sku-price"][0].pricebreakdowns.price4,
    });
  }

  return (
    <TableRow key={variant.txt_wurth_lac_item}>
      <TableCell className="space-y-0.5 text-sm leading-5">
        <div className="font-bold">{variant.txt_wurth_lac_item}</div>
        <div className="text-brand-gray-500">{variant.txt_mfn}</div>
      </TableCell>

      {attributes.map((attribute) => (
        <TableCell
          key={attribute.slug}
          className="text-brand-gray-500 text-center text-sm leading-5"
        >
          {
            variant.Attributes.find(
              (variantAttribute) => variantAttribute.slug === attribute.slug,
            )?.value
          }
        </TableCell>
      ))}

      {!!accountListQuery.data && (
        <>
          <TableCell className="flex flex-col items-end gap-1.5">
            <div className="text-brand-gray-500 text-sm font-normal">
              <span className="font-bold">${discountedPrice}</span> /{" "}
              {variant.txt_uom_label}
            </div>

            {!!discountPercentage && (
              <div className="flex flex-row items-center gap-2.5">
                <div className="text-brand-gray-400 line-through">
                  ${actualPrice}
                </div>

                <div className="text-brand-success bg-brand-success/10 rounded-sm px-1 py-0.5 text-sm font-bold leading-[15px]">
                  {Math.round(discountPercentage)}% off
                </div>
              </div>
            )}

            <Popover>
              <PopoverTrigger className="font-wurth flex flex-row items-center gap-1 text-sm font-extrabold uppercase leading-[18px]">
                <span>Price breakdown</span>

                <FaChevronDown />
              </PopoverTrigger>

              <PopoverContent>
                <table className="mt-2.5t ext-brand-gray-500">
                  <thead className="border-b-brand-gray-300 border-b pb-1 font-bold">
                    <tr className="[&>th]:min-w-20 [&>th]:text-left">
                      <th>Qty</th>
                      <th>UOM</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {priceBreakdowns.map((breakdown) => (
                      <tr key={breakdown.qty}>
                        <td>{breakdown.qty}</td>

                        <td>{variant.txt_uom_label}</td>

                        <td>
                          ${breakdown.price} / {variant.txt_uom_label}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PopoverContent>
            </Popover>
          </TableCell>

          <TableCell className="text-brand-gray-500 text-sm leading-[18px]">
            <VisuallyHidden>
              <label htmlFor={qtyId}>Quantity</label>
            </VisuallyHidden>

            <Input
              id={qtyId}
              type="number"
              className="h-7 w-16 px-2 py-1 leading-5"
              min={variant.txt_min_order_amount}
              step={variant.txt_order_qty_increments}
              {...register("quantity")}
            />

            <div className="my-1.5">Min: {variant.txt_min_order_amount}</div>

            <div>Multiples: {variant.txt_order_qty_increments}</div>
          </TableCell>
        </>
      )}

      <TableCell className="text-brand-gray-500 text-left text-sm leading-5">
        {variant.txt_uom_label}
      </TableCell>

      <TableCell>
        {!accountListQuery.data ? (
          <Button
            onClick={() => setLoginDialogOpen(true)}
            disabled={accountListQuery.isLoading}
          >
            Login to buy
          </Button>
        ) : (
          <>
            <div className="mb-2 flex flex-row items-center justify-between gap-2">
              <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
                <Button className="w-full" type="submit">
                  <AddToCartIcon />

                  <span>Add to cart</span>
                </Button>
              </form>

              {favoriteSkusQuery.data?.[0].isFavourite ? (
                <Link
                  href="/myaccount/myfavorites"
                  className="border-brand-success grid size-9 place-items-center border-2 px-0"
                >
                  <VisuallyHidden>Favorites</VisuallyHidden>

                  <FavoriteIcon />
                </Link>
              ) : (
                <Button
                  variant="secondary"
                  className="grid size-9 place-items-center px-0"
                  onClick={addToFavorites}
                  disabled={addToFavoritesMutation.isPending}
                >
                  <VisuallyHidden>Add to favorites</VisuallyHidden>

                  <AddToFavoritesIcon />
                </Button>
              )}
            </div>

            <Popover>
              <PopoverTrigger className="font-wurth flex flex-row items-center gap-1 text-sm font-extrabold uppercase leading-[18px]">
                <span>Change shipping options</span>

                <FaChevronDown />
              </PopoverTrigger>
            </Popover>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default VariantRow;
