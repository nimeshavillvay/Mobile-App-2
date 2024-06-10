import ProductNotAvailable from "@/_components/product-not-available";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { cn } from "@/_lib/utils";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useId, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as z from "zod";
import ItemAttributes from "./_item-attributes/item-attributes";
import ItemPrices from "./_item-prices/item-prices";
import { generateItemUrl, isItemError } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import FavoriteButton from "./favorite-button";
import type { DetailedPurchasedItem } from "./types";

type PurchasedItemRowProps = {
  readonly token: string;
  readonly item: DetailedPurchasedItem;
  readonly index: number;
};

const PurchasedItemRow = ({ token, item, index }: PurchasedItemRowProps) => {
  const [showItemAttributes, setShowItemAttributes] = useState(false);
  const [showMyPrice, setShowMyPrice] = useState(false);

  const id = useId();
  const quantityId = `quantity-${id}`;
  const formId = `purchase-add-to-cart-form-${id}`;

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const schema = z.object({
    quantity: z
      .number()
      .int()
      .min(item.minimumOrderQuantity, {
        message: `Please consider minimum order quantity of: ${item.minimumOrderQuantity}`,
      })
      .multipleOf(item.quantityByIncrements, {
        message: `This product is sold in multiples of: ${item.quantityByIncrements}`,
      })
      .nullable(),
  });
  type Schema = z.infer<typeof schema>;

  const methods = useForm<Schema>({
    values: { quantity: null },
    resolver: zodResolver(schema),
  });

  const quantity = methods.watch("quantity");

  const addToCartMutation = useAddToCartMutation(token, {
    productId: item.productId,
  });

  const [isNotAvailableProduct, setIsNotAvailableProduct] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    if (data.quantity) {
      // Update the quantity in add to cart dialog
      setQuantity(data.quantity);

      addToCartMutation.mutate(
        {
          quantity: data.quantity,
        },
        {
          onSuccess: (data) => {
            if (data === undefined) {
              setIsNotAvailableProduct(true);
            }
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
      item.productStatus !== "DL" &&
      !item.isDiscontinued
    );
  };

  const isItemNotAdded = !item.productSku;
  const isValidQuantity = !!(quantity && quantity >= 1);

  return (
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
              isItemError(item) ? "pointer-events-none" : "pointer-events-auto"
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
              isItemError(item) ? "pointer-events-none" : "pointer-events-auto",
            )}
          >
            Item# : {item.productSku !== "" ? item.productSku : "N/A"}
          </Link>

          {!isItemNotAdded && (
            <>
              <div className="text-sm text-brand-gray-500">
                MRF Part# : {item.mfrPartNo !== "" ? item.mfrPartNo : "N/A"}
              </div>

              <h4
                className="line-clamp-3 text-wrap font-bold"
                dangerouslySetInnerHTML={{ __html: item.productCategory }}
              />

              <div className="text-sm text-brand-gray-500">
                Category :&nbsp;
                {item.productCategory !== "" ? item.productCategory : "N/A"}
              </div>
            </>
          )}
        </TableCell>

        <TableCell className="min-w-[76px]">
          {item.purchaseOrderDate
            ? dayjs(item.purchaseOrderDate).format(DATE_FORMAT)
            : "N/A"}
        </TableCell>

        <TableCell className="flex flex-col gap-0.5">
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
                    listPrice={item.listPrice}
                    showUnitPrice={true}
                  />
                </Suspense>
              </ErrorBoundary>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>

        <TableCell className="text-sm text-brand-gray-500" colSpan={2}>
          {item.unitOfMeasure !== "" ? item.unitOfMeasure : "N/A"}
        </TableCell>

        <TableCell className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500">
          <Label htmlFor={quantityId} className="sr-only">
            Quantity
          </Label>
          <Input
            id={quantityId}
            form={formId}
            type="number"
            className={cn(
              "h-6 w-16 px-1 text-right text-base leading-4",
              !!methods.formState.errors.quantity?.message &&
                "border-wurth-red-650",
            )}
            disabled={addToCartMutation.isPending || isItemError(item)}
            {...methods.register("quantity", {
              valueAsNumber: true,
            })}
          />
          {!!methods.formState.errors.quantity?.message && (
            <div className="text-wurth-red-650">
              {methods.formState.errors.quantity?.message}
            </div>
          )}
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

          {isEligible(item) && (
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

              <Suspense fallback={<Skeleton className="h-9 w-14" />}>
                <FavoriteButton productId={item.productId} token={token} />
              </Suspense>
            </form>
          )}

          {isItemError(item) && <ErrorAlert item={item} />}
        </TableCell>
      </TableRow>

      {isNotAvailableProduct && (
        <TableRow
          key="error"
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell />
          <TableCell
            colSpan={3}
            className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500"
          >
            <ProductNotAvailable />
          </TableCell>
          <TableCell colSpan={6} />
        </TableRow>
      )}

      <TableRow
        key={`${index}_1`}
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell />
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

        <TableCell colSpan={4} />
      </TableRow>
    </FormProvider>
  );
};

export default PurchasedItemRow;

const ErrorAlert = ({ item }: { readonly item: DetailedPurchasedItem }) => {
  if (!item?.productSku) {
    return (
      <AlertInline
        variant="destructive"
        title="Error!"
        description="Not available online. Please call Customer Service for availability"
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
