"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { CartItemConfiguration } from "@/_lib/types";
import { Shield } from "@repo/web-ui/components/icons/shield";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";
import { type ComponentProps } from "react";
import { useCartFormIdContext } from "../cart-form-id-context";

type CheckoutButtonProps = {
  readonly token: string;
};

const CheckoutButton = ({ token }: CheckoutButtonProps) => {
  const router = useRouter();
  const cartFormId = useCartFormIdContext();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const simulationCheckoutQuery = useSuspenseSimulationCheckout(token);
  const cartQueryGet = useSuspenseCart(token);

  // Check if item cartItemConfiguration has a hash value (not empty string)
  const isCartItemConfigurationComplete = (
    config: CartItemConfiguration,
  ): boolean => {
    return config.hashvalue !== "";
  };

  // Check if all cart items have complete configurations
  const areAllCartItemsConfigured = cartQueryGet.data.cartItems.every(
    (cartItem) => isCartItemConfigurationComplete(cartItem.configuration),
  );

  const isButtonDisabled =
    !areAllCartItemsConfigured ||
    simulationCheckoutQuery.data.totalQuantity === 0;

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    if (checkLoginQuery.data.status_code === "OK") {
      router.push("/checkout");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <form id={cartFormId} onSubmit={handleSubmit}>
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="h-fit w-full gap-2 rounded-lg px-5 py-4 text-lg font-normal shadow-md"
        disabled={isButtonDisabled}
      >
        <Shield className="size-5 stroke-white" />

        <span>Secure Checkout</span>
      </Button>
    </form>
  );
};

export default CheckoutButton;
