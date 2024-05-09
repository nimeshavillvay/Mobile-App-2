import OrderSummary from "@/_components/order-summary";
import { getPlants } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import CartSummary from "./cart-summary";

export const metadata: Metadata = {
  title: "Checkout",
};

const CheckoutPage = async () => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  const plants = await getPlants();

  return (
    <>
      <h1 className="container mb-6 mt-4 text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800">
        Checkout
      </h1>

      <div className="container flex flex-col md:flex-row md:gap-12">
        <div className="flex-1">
          <Suspense
            fallback={<Skeleton className="h-[246px] rounded-lg shadow-lg" />}
          >
            <CartSummary token={sessionCookie.value} plants={plants} />
          </Suspense>
        </div>

        <aside className="flex flex-col gap-5 py-4 md:w-[19.75rem] md:px-0 md:py-0">
          <Suspense
            fallback={<Skeleton className="h-[244px] rounded-lg shadow-md" />}
          >
            <OrderSummary token={sessionCookie.value} />
          </Suspense>
        </aside>
      </div>
    </>
  );
};

export default CheckoutPage;
