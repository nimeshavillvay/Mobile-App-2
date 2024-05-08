"use client";

import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useDebounce from "@/_hooks/misc/use-debouce.hook";
import useItemInfo from "@/_hooks/product/use-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddToCart as AddToCartIcon } from "@repo/web-ui/components/icons/add-to-cart";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { Minus } from "@repo/web-ui/components/icons/minus";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Badge } from "@repo/web-ui/components/ui/badge";
import { Button } from "@repo/web-ui/components/ui/button";
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
import { Suspense, useId, type ComponentProps } from "react";
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
      setOpen("closed");
    } else {
      setOpen(open);
    }
  };

  const itemInfoQuery = useItemInfo(productId ? [productId] : []);
  const itemInfo = itemInfoQuery.data?.[0];

  const methods = useForm<VerificationDialogSchema>({
    values: {
      poOrJobName: "",
      quantity: itemInfo?.minimumOrderQuantity ?? 1,
    },
    resolver: zodResolver(verificationDialogSchema),
  });

  return (
    <FormProvider {...methods}>
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
              <div className="flex flex-row items-center justify-between gap-2 rounded-lg bg-wurth-gray-50 p-2">
                <div className="flex flex-row items-center gap-2">
                  <Badge
                    variant="success-alt"
                    className="rounded px-2 py-1 text-sm font-semibold leading-4 shadow-none"
                  >
                    In Stock
                  </Badge>

                  <div className="text-sm font-medium text-wurth-gray-800">
                    156 in stock at Brea, CA
                  </div>
                </div>

                <Button
                  variant="subtle"
                  className="h-fit gap-1 p-0 pl-1 text-sm font-bold text-black"
                >
                  <span>Check Other Stores</span>

                  <ChevronRight width={16} height={16} />
                </Button>
              </div>

              <div>
                <Label htmlFor={jobNameId} className="sr-only">
                  PO # / Job Name
                </Label>

                <Input
                  {...methods.register("poOrJobName")}
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
                <Suspense
                  fallback={
                    <AddToCartContent
                      formProps={{
                        id: formId,
                      }}
                      decrementButtonProps={{
                        disabled: true,
                      }}
                      inputProps={{
                        ...methods.register("quantity", {
                          valueAsNumber: true,
                        }),
                        disabled: true,
                      }}
                      incrementButtonProps={{
                        disabled: true,
                      }}
                      submitButtonProps={{
                        disabled: true,
                      }}
                    />
                  }
                >
                  <AddToCart
                    token={token}
                    productId={itemInfo.productId}
                    minAmount={itemInfo.minimumOrderQuantity}
                    increments={itemInfo.quantityByIncrements}
                    formId={formId}
                  />
                </Suspense>
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

// This is a separate component so that its disabled state can be used
// in the Suspense fallback
const AddToCartContent = ({
  formProps,
  decrementButtonProps,
  inputProps,
  incrementButtonProps,
  submitButtonProps,
}: {
  formProps: Omit<ComponentProps<"form">, "className">;
  decrementButtonProps: Omit<
    ComponentProps<typeof Button>,
    "type" | "variant" | "size" | "className" | "children"
  >;
  inputProps: Omit<ComponentProps<typeof Input>, "type" | "className">;
  incrementButtonProps: Omit<
    ComponentProps<typeof Button>,
    "type" | "variant" | "size" | "className" | "children"
  >;
  submitButtonProps: Omit<
    ComponentProps<typeof Button>,
    "type" | "variant" | "className" | "children"
  >;
}) => {
  return (
    <form className="flex flex-row items-stretch gap-2" {...formProps}>
      <div className="flex-[4] rounded-md border border-wurth-gray-250 p-0.5 md:flex-1">
        <div className="text-center text-xs font-medium uppercase leading-none text-wurth-gray-400">
          Qty / Each
        </div>

        <div className="flex flex-row items-center justify-between gap-2 shadow-sm">
          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="size-10 rounded-sm"
            {...decrementButtonProps}
          >
            <Minus className="size-4" />
            <span className="sr-only">Reduce quantity</span>
          </Button>

          <Input
            type="number"
            className="flex-1 rounded-sm border-0 p-0 text-center text-lg font-semibold text-wurth-gray-800 shadow-none"
            {...inputProps}
          />

          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="size-10 rounded-sm"
            {...incrementButtonProps}
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
        {...submitButtonProps}
      >
        <AddToCartIcon className="stroke-white" />

        <span className="text-lg font-semibold">Add to cart</span>
      </Button>
    </form>
  );
};

const AddToCart = ({
  token,
  productId,
  minAmount,
  increments,
  formId,
}: {
  token: string;
  productId: number;
  minAmount: number;
  increments: number;
  formId: string;
}) => {
  const { watch, setValue, register, handleSubmit } =
    useFormContext<VerificationDialogSchema>();
  const quantity = watch("quantity");
  const delayedQuantity = useDebounce(quantity);

  const reduceQuantity = () => {
    setValue("quantity", quantity - increments);
  };

  const increaseQuantity = () => {
    setValue("quantity", quantity + increments);
  };

  const addToCartMutation = useAddToCartMutation(token, {
    productId,
    quantity: delayedQuantity,
  });

  const onSubmit = handleSubmit((data) => {
    addToCartMutation.mutate({
      poOrJobName: data.poOrJobName,
    });
  });

  return (
    <AddToCartContent
      formProps={{
        id: formId,
        onSubmit: onSubmit,
      }}
      decrementButtonProps={{
        onClick: reduceQuantity,
        disabled: quantity === minAmount || addToCartMutation.isPending,
      }}
      inputProps={{
        ...register("quantity", {
          valueAsNumber: true,
        }),
        min: minAmount,
        step: increments,
        disabled: addToCartMutation.isPending,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled: addToCartMutation.isPending,
      }}
      submitButtonProps={{
        disabled: addToCartMutation.isPending,
      }}
    />
  );
};