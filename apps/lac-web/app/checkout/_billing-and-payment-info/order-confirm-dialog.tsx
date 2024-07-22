"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useState } from "react";
import useCheckoutMutation from "./use-checkout-mutation.hook";

type OrderConfirmDialogProps = {
  readonly token: string;
  readonly paymentMethodSelected: boolean;
};

const OrderConfirmDialog = ({
  token,
  paymentMethodSelected,
}: OrderConfirmDialogProps) => {
  const [open, setOpen] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const cartQuery = useSuspenseCart(token);

  const checkoutMutation = useCheckoutMutation();

  const clickConfirmOrder = async () => {
    // Check if a valid payment method is selected
    setConfirmClicked(true);
    try {
      await checkoutMutation.mutateAsync();
    } catch {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="h-fit rounded-lg px-20 py-4 text-lg font-normal shadow-md md:max-w-60 md:self-end"
          disabled={cartQuery.data.allRegionalExluded || !paymentMethodSelected}
        >
          Place your Order
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {confirmClicked ? "Please wait" : "Confirm Your Order"}
          </DialogTitle>

          <DialogDescription>
            {confirmClicked
              ? "Order is processing"
              : "Place your OrderUpon confirmation, your order will be placed."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={checkoutMutation.isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => clickConfirmOrder()}
            disabled={checkoutMutation.isPending}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmDialog;
