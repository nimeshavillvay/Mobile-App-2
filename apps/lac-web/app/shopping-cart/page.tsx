import Separator from "@/_components/separator";
import Title from "@/_components/title";
import type { Metadata } from "next";
import { Suspense } from "react";
import ShoppingCartList from "./_shopping-cart-list";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const ShoppingCartPage = () => {
  return (
    <>
      <div className="max-w-desktop mx-auto flex flex-row items-center gap-2.5">
        <Title>Shopping Cart</Title>

        <Separator
          orientation="horizontal"
          className="bg-brand-gray-300 h-px flex-1"
        />
      </div>

      <Suspense fallback={<>Loading cart...</>}>
        <ShoppingCartList />
      </Suspense>
    </>
  );
};

export default ShoppingCartPage;
