"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useItemInfo from "@/_hooks/product/use-item-info.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddToCartDialogSchema = z.object({
  poOrJobName: z.string(),
});

type AddToCartDialogProps = {
  token: string;
};

const AddToCartDialog = ({ token }: AddToCartDialogProps) => {
  const id = useId();
  const jobNameId = `job-name-${id}`;

  const open = useAddToCartDialog((state) => state.open);
  const productId = useAddToCartDialog((state) => state.productId);
  const { setOpen } = useAddToCartDialog((state) => state.actions);

  const itemInfoQuery = useItemInfo(productId ? [productId] : []);
  const itemInfo = itemInfoQuery.data?.[0];
  const cartQuery = useSuspenseCart(token);
  const simulationCheckoutQuery = useSuspenseSimulationCheckout(token);

  const itemInCart = cartQuery.data.cartItems.find(
    (item) => item.itemInfo.productId === productId,
  );
  const itemInSimulationCheckout =
    simulationCheckoutQuery.data.productslist.find(
      (item) => item.productId === productId,
    );

  const closeDialog = () => {
    setOpen(false);
  };

  const { register } = useForm<z.infer<typeof AddToCartDialogSchema>>({
    values: {
      poOrJobName: itemInCart?.configuration.poOrJobName ?? "",
    },
    resolver: zodResolver(AddToCartDialogSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-w-[31.75rem] flex-col gap-4">
        <DialogHeader>
          <div className="flex flex-row items-center gap-2">
            <CheckCircle width={20} height={20} className="stroke-green-700" />

            <DialogTitle className="text-lg font-normal text-wurth-gray-800">
              Item added
            </DialogTitle>
          </div>

          <DialogDescription className="sr-only">
            View the added item here.
          </DialogDescription>
        </DialogHeader>

        {itemInfo ? (
          <div className="flex flex-row items-start gap-4">
            <Image
              src={itemInfo.image}
              alt={`An image of ${itemInfo.productName}`}
              width={128}
              height={128}
              className="shrink-0 rounded border border-wurth-gray-250 object-contain shadow-sm"
            />

            <div className="flex flex-col gap-2">
              <h3 className="line-clamp-3 text-sm font-medium">
                {itemInfo.productName}
              </h3>

              <div className="flex flex-row items-start justify-between gap-4">
                <div className="font-normal text-wurth-gray-800">
                  <span className="text-base">${itemInfo.listPrice}</span>
                  <span className="text-sm font-medium">
                    /{itemInfo.unitOfMeasure}
                  </span>
                </div>

                {itemInSimulationCheckout?.price ? (
                  <div className="text-lg text-wurth-gray-800">
                    ${itemInSimulationCheckout?.price}
                  </div>
                ) : (
                  <Skeleton className="h-7 w-16" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <Skeleton className="h-32" />
        )}

        <form>
          <Label htmlFor={jobNameId} className="sr-only">
            PO # / Job Name
          </Label>

          <Input
            {...register("poOrJobName")}
            id={jobNameId}
            type="text"
            placeholder="PO # / Job Name"
          />
        </form>

        <DialogFooter className="flex flex-row items-center gap-2">
          <Button
            variant="outline"
            className="flex-1 border border-wurth-gray-400 font-bold shadow-md"
            onClick={closeDialog}
          >
            Continue shopping
          </Button>

          <Button
            className="flex-1 font-bold shadow-md"
            onClick={closeDialog}
            asChild
          >
            <Link href="/cart">Go to Cart</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;
