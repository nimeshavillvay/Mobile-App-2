"use client";

import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useItemInfo from "@/_hooks/product/use-item-info.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddToCart as AddToCartIcon } from "@repo/web-ui/components/icons/add-to-cart";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { Minus } from "@repo/web-ui/components/icons/minus";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import { Suspense, useId } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const verificationDialogSchema = z.object({
  poOrJobName: z.string(),
  quantity: z.number(),
});
type VerificationDialogSchema = z.infer<typeof verificationDialogSchema>;

type VerificationDialogProps = {
  token: string;
};

const VerificationDialog = ({ token }: VerificationDialogProps) => {
  const id = useId();
  const jobNameId = `job-name-${id}`;
  const formId = `add-to-cart-form-${id}`;

  const open = useAddToCartDialog((state) => state.open);
  const productId = useAddToCartDialog((state) => state.productId);
  const { setOpen } = useAddToCartDialog((state) => state.actions);

  const onOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      addToCartForm.reset({
        poOrJobName: "",
        quantity: itemInfo?.minimumOrderQuantity ?? 1,
      });
      setOpen("closed");
    } else {
      setOpen(open);
    }
  };

  const itemInfoQuery = useItemInfo(productId ? [productId] : []);
  const itemInfo = itemInfoQuery.data?.[0];

  const addToCartForm = useForm<VerificationDialogSchema>({
    values: {
      poOrJobName: "",
      quantity: itemInfo?.minimumOrderQuantity ?? 1,
    },
    resolver: zodResolver(verificationDialogSchema),
  });

  return (
    <FormProvider {...addToCartForm}>
      <Dialog open={open === "verification"} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[31.625rem]">
          <DialogHeader className="sr-only">
            <DialogTitle>Add item to cart</DialogTitle>

            <DialogDescription>
              Choose the quantity and add the item to the cart
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5">
            {itemInfo ? (
              <div className="flex flex-row items-start gap-4">
                <Image
                  src={itemInfo.image}
                  alt={`An image of ${itemInfo.productName}`}
                  width={180}
                  height={180}
                  className="shrink-0 rounded object-contain"
                />

                <div className="space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-base text-black">
                      {itemInfo.productName}
                    </h3>

                    <h4 className="text-sm font-medium text-wurth-gray-500">
                      {itemInfo.productSku}
                    </h4>
                  </div>

                  {productId ? (
                    <Suspense fallback={<Skeleton className="h-20" />}>
                      <PriceCheck
                        token={token}
                        productId={productId}
                        uom={itemInfo.unitOfMeasure}
                      />
                    </Suspense>
                  ) : (
                    <Skeleton className="h-20" />
                  )}
                </div>
              </div>
            ) : (
              <Skeleton className="h-60" />
            )}

            <div className="flex flex-col gap-2">
              {itemInfo ? (
                <Suspense
                  fallback={<Skeleton className="h-[2.625rem] rounded-lg" />}
                >
                  <LocationStocks
                    token={token}
                    productId={itemInfo.productId}
                  />
                </Suspense>
              ) : (
                <Skeleton className="h-[2.625rem] rounded-lg" />
              )}

              <div>
                <Label htmlFor={jobNameId} className="sr-only">
                  PO # / Job Name
                </Label>

                <Input
                  {...addToCartForm.register("poOrJobName")}
                  id={jobNameId}
                  form={formId}
                  type="text"
                  placeholder="PO # / Job Name"
                />
              </div>

              {itemInfo ? (
                <div className="flex flex-row items-center gap-4 text-sm text-wurth-gray-500">
                  <div>
                    Min Order:{" "}
                    <span className="text-wurth-gray-800">
                      {itemInfo.minimumOrderQuantity}
                    </span>
                  </div>

                  <div>
                    Quantity Multiple by:{" "}
                    <span className="text-wurth-gray-800">
                      {itemInfo.quantityByIncrements}
                    </span>
                  </div>
                </div>
              ) : (
                <Skeleton className="h-5 w-2/3" />
              )}

              {itemInfo ? (
                <AddToCart
                  token={token}
                  productId={itemInfo.productId}
                  minAmount={itemInfo.minimumOrderQuantity}
                  increments={itemInfo.quantityByIncrements}
                  formId={formId}
                  uom={itemInfo.unitOfMeasure}
                />
              ) : (
                <Skeleton className="h-[3.75rem]" />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default VerificationDialog;

const PriceCheck = ({
  token,
  productId,
  uom,
}: {
  token: string;
  productId: number;
  uom: string;
}) => {
  const { watch } = useFormContext<VerificationDialogSchema>();
  const quantity = watch("quantity");

  const priceCheckQuery = useSuspensePriceCheck(token, [{ productId, qty: 1 }]);
  const priceData = priceCheckQuery.data.productPrices[0];

  let currentPrice = 0;
  let previousPrice = 0;

  if (priceData) {
    // First both get the normal price
    currentPrice = priceData.price;
    previousPrice = priceData.price;

    // Then look for the discounted price in the breakdowns
    const breakdown = priceData.priceBreakDowns.findLast(
      (breakdown) => quantity >= breakdown.quantity,
    );
    if (breakdown) {
      currentPrice = breakdown.price;
    }
  }

  const isDiscounted = currentPrice !== previousPrice;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm leading-none text-wurth-gray-800">
        <span className={isDiscounted ? "text-green-700" : "text-inherit"}>
          $
        </span>
        <span
          className={cn(
            "mr-1 text-xl font-medium leading-7 tracking-[-0.1px]",
            isDiscounted ? "text-green-700" : "text-inherit",
          )}
        >
          {currentPrice}
        </span>

        {isDiscounted && (
          <span className="text-base leading-6 text-wurth-gray-400 line-through">
            {previousPrice}
          </span>
        )}

        <span>/{uom}</span>
      </div>

      <div className="grid grid-cols-2 gap-0.5">
        {priceData?.priceBreakDowns.map((item) => (
          <div
            key={item.quantity}
            className="rounded-lg bg-wurth-gray-50 px-3 py-1 odd:rounded-r-none last:odd:rounded-r-lg even:rounded-l-none"
          >
            <h5 className="text-xs font-medium leading-5 text-wurth-gray-800">
              {item.quantity} items
            </h5>

            <div className="text-xs text-wurth-gray-800">
              <span className="text-sm">${item.price}</span>/{uom}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddToCart = ({
  token,
  productId,
  minAmount,
  increments,
  formId,
  uom,
}: {
  token: string;
  productId: number;
  minAmount: number;
  increments: number;
  formId: string;
  uom: string;
}) => {
  const { watch, setValue, register, handleSubmit } =
    useFormContext<VerificationDialogSchema>();
  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const quantity = watch("quantity");

  const reduceQuantity = () => {
    setValue("quantity", quantity - increments);
  };

  const increaseQuantity = () => {
    setValue("quantity", quantity + increments);
  };

  const addToCartMutation = useAddToCartMutation(token, {
    productId,
  });

  const onSubmit = handleSubmit((data) => {
    // Update the quantity in add to cart dialog
    setQuantity(data.quantity);

    addToCartMutation.mutate({
      quantity: data.quantity,
      poOrJobName: data.poOrJobName,
    });
  });

  return (
    <form
      className="flex flex-row items-stretch gap-2"
      id={formId}
      onSubmit={onSubmit}
    >
      <div className="flex-[4] rounded-md border border-wurth-gray-250 p-0.5 md:flex-1">
        <div className="text-center text-xs font-medium uppercase leading-none text-wurth-gray-400">
          Qty / {uom}
        </div>

        <div className="flex flex-row items-center justify-between gap-2 shadow-sm">
          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="size-10 rounded-sm"
            onClick={reduceQuantity}
            disabled={quantity === minAmount || addToCartMutation.isPending}
          >
            <Minus className="size-4" />
            <span className="sr-only">Reduce quantity</span>
          </Button>

          <Input
            {...register("quantity", {
              valueAsNumber: true,
            })}
            type="number"
            className="flex-1 rounded-sm border-0 p-0 text-center text-lg font-semibold text-wurth-gray-800 shadow-none"
            min={minAmount}
            step={increments}
            disabled={addToCartMutation.isPending}
          />

          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="size-10 rounded-sm"
            onClick={increaseQuantity}
            disabled={addToCartMutation.isPending}
          >
            <Plus className="size-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="h-full flex-[5] gap-2 rounded-lg px-5 py-4 shadow-md md:flex-[2]"
        disabled={addToCartMutation.isPending}
      >
        <AddToCartIcon className="stroke-white" />

        <span className="text-lg font-semibold">Add to cart</span>
      </Button>
    </form>
  );
};

const LocationStocks = ({
  token,
  productId,
}: {
  token: string;
  productId: number;
}) => {
  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: 1,
  });
  const firstLocation = checkAvailabilityQuery.data.availableLocations[0];
  const otherLocations =
    checkAvailabilityQuery.data.availableLocations.slice(1);
  const isBackordered = checkAvailabilityQuery.data.status === "notInStock";

  return (
    <Collapsible className="flex flex-col gap-1">
      <div className="flex flex-row items-center justify-between gap-2 rounded-lg bg-wurth-gray-50 p-2">
        <div className="flex shrink-0 flex-row items-center gap-2">
          <div
            className={cn(
              "rounded px-4 py-2 text-sm font-semibold leading-4 md:px-2 md:py-1",
              isBackordered
                ? "bg-yellow-50 text-yellow-700"
                : "bg-green-50 text-green-700",
            )}
          >
            {isBackordered ? "Backordered" : "In Stock"}
          </div>

          {!isBackordered && (
            <div className="text-sm font-medium text-wurth-gray-800">
              {firstLocation?.amount} in stock at {firstLocation?.name}
            </div>
          )}
        </div>

        <CollapsibleTrigger
          asChild
          className="group h-fit gap-1 p-0 pl-1 text-sm font-bold text-black"
        >
          <Button variant="subtle">
            <span>Check Other Stores</span>

            <ChevronRight
              width={16}
              height={16}
              className="transition duration-150 ease-out group-data-[state=open]:rotate-90"
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <table className="w-full border-separate rounded-lg border border-wurth-gray-150 [&_td]:p-3 [&_th]:p-3">
          <thead className="">
            <tr className="text-sm text-wurth-gray-500">
              <th className="border-b border-b-wurth-gray-150 text-left font-normal">
                Location
              </th>
              <th className="border-b border-b-wurth-gray-150 text-right font-normal">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {otherLocations.map((location) => (
              <tr
                key={location.location}
                className="text-sm text-wurth-gray-800 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-wurth-gray-150"
              >
                <td className="text-left font-normal">{location.name}</td>

                <td className="text-right font-normal">{location.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleContent>
    </Collapsible>
  );
};
