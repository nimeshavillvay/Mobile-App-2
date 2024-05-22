import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import AlertInline from "@/old/_components/alert-inline";
import ErrorBoundary from "@/old/_components/error-boundary";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import { cn } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useId, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as z from "zod";
import AddToShoppingListDialog from "../shopping-lists/add-to-shopping-list-dialog";
import ItemAttributes from "./_item-attributes/item-attributes";
import ItemPrices from "./_item-prices/item-prices";
import { generateItemUrl, isItemError } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import type { DetailedPurchasedItem } from "./types";

const schema = z.object({
  quantity: z.number().int().min(1).nullable(),
});

type Schema = z.infer<typeof schema>;

type PurchasedItemRowProps = {
  token: string;
  item: DetailedPurchasedItem;
  index: number;
};

const PurchasedItemRow = ({ token, item, index }: PurchasedItemRowProps) => {
  const [showItemAttributes, setShowItemAttributes] = useState(false);
  const [showMyPrice, setShowMyPrice] = useState(false);
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);
  const id = useId();
  const quantityId = `quantity-${id}`;
  const formId = `purchase-add-to-cart-form-${id}`;

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const methods = useForm<Schema>({
    values: { quantity: null },
    resolver: zodResolver(schema),
  });

  const quantity = methods.watch("quantity");

  const addToCartMutation = useAddToCartMutation(token, {
    productId: item.productId,
  });

  const onSubmit = methods.handleSubmit((data) => {
    if (data.quantity) {
      // Update the quantity in add to cart dialog
      setQuantity(data.quantity);

      addToCartMutation.mutate(
        {
          quantity: data.quantity,
        },
        {
          onSuccess: () => {
            // Reset the form after submission
            methods.reset();
          },
        },
      );
    }
  });

  const isEligible = (item: DetailedPurchasedItem) => {
    return (
      item &&
      item.productSku &&
      !item.isExcludedProduct &&
      item.productStatus !== "DL" &&
      !item.isDiscontinued
    );
  };

  const isItemNotAdded = !item.productSku;
  const isValidQuantity = !!(quantity && quantity >= 1);

  return (
    <>
      <FormProvider {...methods}>
        <TableRow
          key={`${index}_0`}
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell className="min-w-[76px]">
            <Link
              href={generateItemUrl(item)}
              className={
                isItemError(item)
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.productTitle}
                  width={76}
                  height={76}
                  className="border border-brand-gray-200 object-contain"
                />
              ) : (
                <WurthFullBlack
                  width={76}
                  height={76}
                  className="border border-brand-gray-200 px-2"
                />
              )}
            </Link>
          </TableCell>

          <TableCell className="flex flex-col gap-0.5">
            <Link
              href={generateItemUrl(item)}
              className={cn(
                "text-sm text-brand-gray-500",
                isItemError(item)
                  ? "pointer-events-none"
                  : "pointer-events-auto",
              )}
            >
              Item# : {item.productSku !== "" ? item.productSku : "N/A"}
            </Link>

            {!isItemNotAdded && (
              <>
                <div className="text-sm text-brand-gray-500">
                  MRF Part# : {item.mfrPartNo !== "" ? item.mfrPartNo : "N/A"}
                </div>

                <h4 className="line-clamp-3 text-wrap font-bold">
                  {item.productTitle}
                </h4>

                <div className="text-sm text-brand-gray-500">
                  Category :&nbsp;
                  {item.productCategory !== "" ? item.productCategory : "N/A"}
                </div>
              </>
            )}
          </TableCell>

          <TableCell className="min-w-[76px]">
            <Link
              href={generateItemUrl(item)}
              className={
                isItemError(item)
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.productTitle}
                  width={76}
                  height={76}
                  className="border border-brand-gray-200 object-contain"
                />
              ) : (
                <WurthFullBlack
                  width={76}
                  height={76}
                  className="border border-brand-gray-200 px-2"
                />
              )}
            </Link>
          </TableCell>

          <TableCell className="flex flex-col gap-0.5">
            <Link
              href={generateItemUrl(item)}
              className={cn(
                "text-sm text-brand-gray-500",
                isItemError(item)
                  ? "pointer-events-none"
                  : "pointer-events-auto",
              )}
            >
              Item# : {item.productSku !== "" ? item.productSku : "N/A"}
            </Link>

            {!isItemNotAdded && (
              <>
                <div className="text-sm text-brand-gray-500">
                  MRF Part# : {item.mfrPartNo !== "" ? item.mfrPartNo : "N/A"}
                </div>

                <h4 className="text-wrap font-bold">{item.productTitle}</h4>

                <div className="text-sm text-brand-gray-500">
                  Category :&nbsp;
                  {item.productCategory !== "" ? item.productCategory : "N/A"}
                </div>
              </>
            )}
          </TableCell>

          <TableCell className="text-center text-sm text-brand-gray-500">
            {item.purchaseOrderDate
              ? dayjs(item.purchaseOrderDate).format(DATE_FORMAT)
              : "N/A"}
          </TableCell>

          <TableCell className="text-center text-sm text-brand-gray-500">
            {item.totalItem ?? "N/A"}
          </TableCell>

          <TableCell rowSpan={2}>
            <Collapsible
              open={showMyPrice}
              onOpenChange={setShowMyPrice}
              disabled={isItemError(item)}
              className="min-w-[260px]"
            >
              <CollapsibleTrigger
                className={cn(
                  "group mx-auto flex cursor-pointer flex-row items-center justify-center text-sm",
                  isItemError(item)
                    ? "cursor-not-allowed text-brand-gray-400"
                    : "cursor-pointer text-brand-primary",
                )}
              >
                <span>{showMyPrice ? "Hide" : "Show"} my price</span>

                <MdKeyboardArrowDown className="text-lg leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <ErrorBoundary
                  fallback={
                    <div className="p-4 text-center text-brand-primary">
                      Failed to Load Prices!!!
                    </div>
                  }
                >
                  <Suspense
                    fallback={
                      <div className="p-4 text-center text-brand-gray-400">
                        Prices Loading...
                      </div>
                    }
                  >
                    <ItemPrices
                      token={token}
                      productId={item.productId}
                      quantity={1}
                      uom={item.unitOfMeasure}
                      salePrice={item.isSaleItem ? Number(item.listPrice) : 0}
                      showUnitPrice={true}
                    />
                  </Suspense>
                </ErrorBoundary>
              </CollapsibleContent>
            </Collapsible>
          </TableCell>

          <TableCell className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500">
            <Label htmlFor={quantityId} className="sr-only">
              Quantity
            </Label>
            <Input
              id={quantityId}
              type="number"
              step={item.quantityByIncrements}
              className="h-6 w-16 px-1 text-right text-base leading-4"
              {...methods.register("quantity", {
                valueAsNumber: true,
                min: item.minimumOrderQuantity,
                disabled: addToCartMutation.isPending || isItemError(item),
              })}
            />
            {!isItemError(item) && (
              <>
                <div className="text-nowrap">
                  <span className="font-bold text-black">Min: </span>
                  {item.minimumOrderQuantity}
                </div>

                <div className="text-nowrap">
                  <span className="font-bold text-black">Multiples: </span>
                  {item.quantityByIncrements}
                </div>
              </>
            )}
          </TableCell>

          <TableCell className="text-sm text-brand-gray-500">
            {item.unitOfMeasure !== "" ? item.unitOfMeasure : "N/A"}
          </TableCell>
        </TableRow>

        <TableRow
          key={`${index}_1`}
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell></TableCell>
          <TableCell colSpan={3} className={isEligible(item) ? "py-2" : ""}>
            <Collapsible
              open={showItemAttributes}
              onOpenChange={setShowItemAttributes}
              disabled={isItemNotAdded}
            >
              <CollapsibleTrigger
                className={cn(
                  "group flex flex-row items-center text-sm",
                  isItemNotAdded
                    ? "cursor-not-allowed text-brand-gray-400"
                    : "cursor-pointer text-brand-primary",
                )}
              >
                <span>
                  {showItemAttributes ? "Hide" : "View"} item attributes
                </span>

                <MdKeyboardArrowDown className="text-lg leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <ErrorBoundary
                  fallback={
                    <div className="p-4 text-center text-brand-primary">
                      Failed to Load Attributes!!!
                    </div>
                  }
                >
                  <ItemAttributes productId={item.productId} />
                </ErrorBoundary>
              </CollapsibleContent>
            </Collapsible>
          </TableCell>

          <TableCell colSpan={2}></TableCell>
        </TableRow>

        {isEligible(item) && (
          <TableRow
            className={cn(
              "border-b-0",
              index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
            )}
          >
            <TableCell colSpan={7}>
              <form
                id={formId}
                onSubmit={onSubmit}
                className="flex flex-row items-end justify-end gap-2"
              >
                <Button
                  type="submit"
                  className="w-[170px]"
                  disabled={!isValidQuantity || addToCartMutation.isPending}
                >
                  Add to cart
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowShoppingListsDialog(true)}
                >
                  {item?.isFavorite ? (
                    <IoMdHeart className="text-2xl text-brand-primary" />
                  ) : (
                    <IoMdHeartEmpty className="text-2xl text-brand-gray-500" />
                  )}
                </Button>
              </form>
            </TableCell>
          </TableRow>
        )}

        {isItemError(item) && (
          <TableRow
            className={cn(
              "border-b-0",
              index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
            )}
          >
            <TableCell colSpan={4} className="pt-0">
              <ErrorAlert item={item} />
            </TableCell>
          </TableRow>
        )}
      </FormProvider>

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={item.productId}
        favoriteIds={item.favoriteIds}
      />
    </>
  );
};

export default PurchasedItemRow;

const ErrorAlert = ({ item }: { item: DetailedPurchasedItem }) => {
  if (!item?.productSku) {
    return (
      <AlertInline
        variant="destructive"
        title="Error!"
        description="Not available online. Please call Customer Service for availability"
      />
    );
  }

  if (item?.isExcludedProduct) {
    return (
      <AlertInline
        variant="destructive"
        title="Error!"
        description="This item is not available in your territory."
      />
    );
  }

  if (item?.isDiscontinued || item?.productStatus === "DL") {
    return (
      <AlertInline
        variant="destructive"
        title="DISCONTINUED"
        description="This item is no longer available"
      />
    );
  }

  if (item?.productStatus === "DU" || item?.productStatus === "DV") {
    return (
      <AlertInline
        variant="destructive"
        title="Will be Discontinued"
        description="Stock is limited"
      />
    );
  }

  return null;
};
