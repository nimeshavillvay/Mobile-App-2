import BulkOrderForm from "@/old/_components/bulk-order-form";
import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ShoppingCartList from "./_shopping-cart-list";
import OrderSummary from "./order-summary";
import PromoCodeForm from "./promo-code-form";
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
    <div className="mb-4 mt-7 flex flex-row items-start gap-8">
      <div className="flex-1">
        <div className="flex flex-row items-center gap-2.5">
          <Title>Shopping Cart</Title>

          <Separator
            orientation="horizontal"
            className="h-px flex-1 bg-brand-gray-300"
          />
        </div>

        <ShoppingCartDetailsForm accountToken={accountTokenCookie.value} />

        <ShoppingCartList accountToken={accountTokenCookie.value} />

        <BulkOrderForm />
      </div>

      <aside className="sticky top-0 w-64 space-y-5">
        <PromoCodeForm />

        <OrderSummary />
      </aside>
    </div>
  );
};

export default ShoppingCartPage;
