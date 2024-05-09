"use client";

import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { Shield } from "@repo/web-ui/components/icons/shield";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Link from "next/link";

type CheckoutButtonProps = {
  token: string;
};

const CheckoutButton = ({ token }: CheckoutButtonProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  return (
    <Link
      href={
        checkLoginQuery.data.status_code === "OK" ? "/checkout" : "/sign-in"
      }
      className={buttonVariants({
        variant: "secondary",
        size: "lg",
        className:
          "h-fit w-full gap-2 rounded-lg px-5 py-4 text-lg font-normal shadow-md",
      })}
    >
      <Shield className="size-5 stroke-white" />

      <span>Secure Checkout</span>
    </Link>
  );
};

export default CheckoutButton;
