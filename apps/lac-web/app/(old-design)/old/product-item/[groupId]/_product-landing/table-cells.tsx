"use client";

import AddToCartIcon from "@/old/_components/icons/add-to-cart";
import AddToFavoritesIcon from "@/old/_components/icons/add-to-favorites";
import FavoriteIcon from "@/old/_components/icons/favorite";
import { Button } from "@/old/_components/ui/button";
import { Input } from "@/old/_components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/old/_components/ui/popover";
import { TableCell } from "@/old/_components/ui/table";
import VisuallyHidden from "@/old/_components/visually-hidden";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import useLoginDialog from "@/old/_hooks/account/use-login-dialog.hook";
import useAddToFavoritesMutation from "@/old/_hooks/product/use-add-to-favorites-mutation.hook";
import useFavoriteSkus from "@/old/_hooks/product/use-favorite-skus.hook";
import usePriceCalculation from "@/old/_hooks/product/use-price-calculation.hook";
import usePriceCheck from "@/old/_hooks/product/use-price-check.hook";
import Link from "next/link";
import { useId } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";

type FormSchema = { quantity: number };

export const PriceTableCell = ({
  sku,
  uom,
  quantity,
}: {
  sku: string;
  uom: string;
  quantity: number;
}) => {
  const priceCheckQuery = usePriceCheck(sku, quantity);
  const { discountedPrice, actualPrice, discountPercentage } =
    usePriceCalculation(sku, quantity);

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
    <TableCell className="flex flex-col items-end gap-1.5">
      <div className="text-sm font-normal text-brand-gray-500">
        <span className="font-bold">${discountedPrice}</span> / {uom}
      </div>

      {!!discountPercentage && (
        <div className="flex flex-row items-center gap-2.5">
          <div className="text-brand-gray-400 line-through">${actualPrice}</div>

          <div className="rounded-sm bg-brand-success/10 px-1 py-0.5 text-sm font-bold leading-[15px] text-brand-success">
            {Math.round(discountPercentage)}% off
          </div>
        </div>
      )}

      <Popover>
        <PopoverTrigger className="group flex flex-row items-center gap-1 font-wurth text-sm font-extrabold uppercase leading-[18px]">
          <span className="text-nowrap">Price breakdown</span>

          <FaChevronDown className="transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
        </PopoverTrigger>

        <PopoverContent>
          <table className="mt-2.5t ext-brand-gray-500">
            <thead className="border-b border-b-brand-gray-300 pb-1 font-bold">
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

                  <td>{uom}</td>

                  <td>
                    ${breakdown.price} / {uom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PopoverContent>
      </Popover>
    </TableCell>
  );
};

export const QuantityTableCell = ({
  minOrder,
  multiples,
  formRegister,
}: {
  minOrder: string;
  multiples: string;
  formRegister: UseFormRegister<FormSchema>;
}) => {
  const id = useId();
  const qtyId = `qty-${id}`;

  return (
    <TableCell className="text-sm leading-[18px] text-brand-gray-500">
      <VisuallyHidden>
        <label htmlFor={qtyId}>Quantity</label>
      </VisuallyHidden>

      <Input
        id={qtyId}
        type="number"
        className="h-7 w-16 px-2 py-1 leading-5"
        min={minOrder}
        step={multiples}
        {...formRegister("quantity")}
      />

      <div className="my-1.5 text-nowrap">Min: {minOrder}</div>

      <div className="text-nowrap">Multiples: {multiples}</div>
    </TableCell>
  );
};

export const AddItemCell = ({
  product,
  handleSubmit,
}: {
  product: { sku: string };
  handleSubmit: UseFormHandleSubmit<FormSchema>;
}) => {
  const accountListQuery = useAccountList();
  const setLoginDialogOpen = useLoginDialog((state) => state.setOpen);
  const favoriteSkusQuery = useFavoriteSkus(product.sku);

  const addToFavoritesMutation = useAddToFavoritesMutation();
  const addToFavorites = () => {
    addToFavoritesMutation.mutate({
      sku: product.sku,
    });
  };

  const onSubmit = (data: FormSchema) => {
    console.log("> data: ", data);
  };

  return (
    <TableCell>
      {!accountListQuery.data ? (
        <Button onClick={() => setLoginDialogOpen(true)}>Login to buy</Button>
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
                className="grid size-9 place-items-center border-2 border-brand-success px-0"
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
            <PopoverTrigger className="flex flex-row items-center gap-1 font-wurth text-sm font-extrabold uppercase leading-[18px]">
              <span>Change shipping options</span>

              <FaChevronDown />
            </PopoverTrigger>
          </Popover>
        </>
      )}
    </TableCell>
  );
};
