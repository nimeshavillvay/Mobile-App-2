"use client";

import { Shield } from "@repo/web-ui/components/icons/shield";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";

const CheckoutButton = () => {
  const router = useRouter();

  const checkout = () => {
    router.push("/checkout");
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className="h-fit w-full gap-2 rounded-lg px-5 py-4 text-lg font-normal shadow-md"
      onClick={checkout}
    >
      <Shield className="size-5 stroke-white" />

      <span>Secure Checkout</span>
    </Button>
  );
};

export default CheckoutButton;
