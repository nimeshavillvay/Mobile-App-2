"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import type { PaymentMethod } from "@/_lib/types";
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
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useState } from "react";
import { getPaymentId } from "./helpers";
import useCheckoutMutation from "./use-checkout-mutation.hook";
import useSuspenseCreditCards from "./use-suspense-credit-cards.hook";

type OrderConfirmDialogProps = {
  readonly token: string;
  readonly otherPaymentMethods: PaymentMethod[];
};

const OrderConfirmDialog = ({
  token,
  otherPaymentMethods,
}: OrderConfirmDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const cartQuery = useSuspenseCart(token);
  const creditCartsQuery = useSuspenseCreditCards(token);

  const selectedPaymentId = getPaymentId(
    {
      paymentToken: cartQuery.data.configuration.paymentToken,
      paymentMethod: cartQuery.data.configuration.paymentMethod,
    },
    { creditCards: creditCartsQuery.data, paymentMethods: otherPaymentMethods },
  );

  const checkoutMutation = useCheckoutMutation();

  const clickConfirmOrder = async () => {
    // Check if a valid payment method is selected
    if (selectedPaymentId) {
      setConfirmClicked(true);
      try {
        await checkoutMutation.mutateAsync();
      } catch {
        setOpen(false);
      }
    } else {
      setOpen(false);
      toast({
        variant: "destructive",
        title: "Please select a payment method",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="h-fit rounded-lg px-20 py-4 text-lg font-normal shadow-md md:max-w-60 md:self-end"
          disabled={cartQuery.data.allRegionalExluded}
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
