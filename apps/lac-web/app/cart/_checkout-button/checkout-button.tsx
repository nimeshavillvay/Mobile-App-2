"use client";

import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Shield } from "@repo/web-ui/components/icons/shield";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
  token: string;
};

const CheckoutButton = ({ token }: CheckoutButtonProps) => {
  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const simulationCheckoutQuery = useSuspenseSimulationCheckout(token);

  const handleClick = () => {
    if (checkLoginQuery.data.status_code === "OK") {
      router.push("/checkout");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className="h-fit w-full gap-2 rounded-lg px-5 py-4 text-lg font-normal shadow-md"
      onClick={handleClick}
      disabled={simulationCheckoutQuery.data.totalQuantity === 0}
    >
      <Shield className="size-5 stroke-white" />

      <span>Secure Checkout</span>
    </Button>
  );
};

export default CheckoutButton;
