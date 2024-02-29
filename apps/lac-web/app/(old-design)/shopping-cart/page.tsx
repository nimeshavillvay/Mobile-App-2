import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ShoppingCartList from "./_shopping-cart-list";
import ShoppingCartDetailsForm from "./shopping-cart-details-form";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const ShoppingCartPage = () => {
  const accountTokenCookie = cookies().get(ACCOUNT_TOKEN_COOKIE);

  if (!accountTokenCookie?.value) {
    return redirect("/");
  }

  return (
    <>
      <div className="mb-4 mt-7 flex flex-row items-center gap-2.5">
        <Title>Shopping Cart</Title>

        <Separator
          orientation="horizontal"
          className="bg-brand-gray-300 h-px flex-1"
        />
      </div>

      <ShoppingCartDetailsForm accountToken={accountTokenCookie.value} />

      <ShoppingCartList accountToken={accountTokenCookie.value} />
    </>
  );
};

export default ShoppingCartPage;