import OrderSummary from "@/_components/order-summary";
import { getShippingMethods } from "@/_lib/apis/server";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import CartList from "./_cart-list";
import CartDetails from "./cart-details";
import CartHeading from "./cart-heading";
import CartItemFallback from "./cart-item-fallback";
import CheckoutButton from "./checkout-button";
import ShippingMethod from "./shipping-method";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = async () => {
  const shippingMethods = await getShippingMethods();

  return (
    <>
      <Suspense
        fallback={
          <div className="container">
            <Skeleton className="mb-6 mt-4 h-8 w-40 md:mb-7 md:mt-6 md:h-14" />
          </div>
        }
      >
        <CartHeading />
      </Suspense>

      <div className="flex flex-col md:container md:flex-row md:gap-12">
        <div className="flex-1">
          <Suspense
            fallback={
              <ul className="flex flex-col">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="border-b border-b-wurth-gray-250 px-4 pb-7 md:px-0 [&:not(:first-child)]:pt-7"
                  >
                    <CartItemFallback />
                  </li>
                ))}
              </ul>
            }
          >
            <CartList shippingMethods={shippingMethods} />
          </Suspense>
        </div>

        <aside className="flex flex-col gap-5 px-6 py-4 md:w-[19.75rem] md:px-0 md:py-0">
          <Suspense
            fallback={<Skeleton className="h-[182px] rounded-lg shadow-md" />}
          >
            <CartDetails />
          </Suspense>

          <Suspense
            fallback={<Skeleton className="h-[158px] rounded-lg shadow-md" />}
          >
            <ShippingMethod options={shippingMethods} />
          </Suspense>

          <Suspense
            fallback={<Skeleton className="h-[316px] rounded-lg shadow-md" />}
          >
            <OrderSummary>
              <CheckoutButton />
            </OrderSummary>
          </Suspense>
        </aside>
      </div>
    </>
  );
};

export default CartPage;
