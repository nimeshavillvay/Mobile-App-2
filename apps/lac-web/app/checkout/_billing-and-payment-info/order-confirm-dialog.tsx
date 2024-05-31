"use client";

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

const OrderConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const checkoutMutation = useCheckoutMutation();

  const clickConfirmOrder = () => {
    checkoutMutation.mutate();
    setButtonDisable(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="h-fit rounded-lg px-20 py-4 text-lg font-normal shadow-md md:max-w-60 md:self-end"
          onClick={() => setOpen(true)}
        >
          Place your Order
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Order</DialogTitle>

          <DialogDescription>
            Upon confirmation, your order will be placed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button disabled={buttonDisable} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => clickConfirmOrder()} disabled={buttonDisable}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmDialog;
