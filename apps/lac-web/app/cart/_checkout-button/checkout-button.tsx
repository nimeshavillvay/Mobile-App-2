"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Shield } from "@repo/web-ui/components/icons/shield";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";
import { useCartFormIdContext } from "../cart-form-id-context";
import { TRUE_STRING } from "../constants";
import useUnSavedAlternativeQuantityState from "../use-cart-aternative-qty-method-store.hook";

type CheckoutButtonProps = {
  readonly token: string;
};

const CheckoutButton = ({ token }: CheckoutButtonProps) => {
  const router = useRouter();
  const cartFormId = useCartFormIdContext();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const simulationCheckoutQuery = useSuspenseSimulationCheckout(token);
  const cartQuery = useSuspenseCart(token);
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const skus = useUnSavedAlternativeQuantityState((state) => state.sku);
  const { popSku } = useUnSavedAlternativeQuantityState(
    (state) => state.actions,
  );

  // Check if all cart items have complete configurations
  const areAllCartItemsConfigured = cartQuery.data.cartItems.every(
    (cartItem) =>
      cartItem.configuration.hashvalue !== "" &&
      cartItem.configuration.will_call_not_in_stock !== TRUE_STRING,
  );

  const isButtonDisabled =
    !areAllCartItemsConfigured ||
    simulationCheckoutQuery.data.totalQuantity === 0;

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    if (checkLoginQuery.data?.status_code === "OK") {
      if (skus.length > 0) {
        setOpen(true);
      } else {
        router.push("/checkout");
      }
    } else {
      router.push("/sign-in");
    }
  };

  const proceedToCheckout = () => {
    popSku(skus);
    router.push("/checkout");
    setIsDisabled(true);
  };

  return (
    <>
      <form id={cartFormId} onSubmit={handleSubmit}>
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="btn-checkout h-fit w-full gap-2 rounded-lg px-5 py-4 text-lg font-normal shadow-md"
          disabled={isButtonDisabled}
        >
          <Shield
            className="size-5 stroke-white"
            data-button-action="Cart Secure Checkout"
          />

          <span data-button-action="Cart Secure Checkout">Secure Checkout</span>
        </Button>
      </form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Proceed to Secure Checkout</DialogTitle>

            <DialogDescription>
              There are some quantities or delivery methods in alternative
              branches selection {skus.length === 1 ? "has" : "have"} not been
              saved with Item # {skus.join(", ")}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => setOpen(false)}
              data-button-action="Save Unsaved Alternative Quantities"
              disabled={isDisabled}
            >
              Cancel
            </Button>
            <Button
              onClick={() => proceedToCheckout()}
              disabled={isDisabled}
              data-button-action="Proceed to Secure Checkout"
            >
              Discard and Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutButton;
