import OrderSummary from "@/_components/order-summary";
import { getPlants, getShippingMethods } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import AddMoreItemsForm from "./_add-more-items/add-more-items-form";
import AddMoreItemsFormMobile from "./_add-more-items/add-more-items-form-mobile";
import CartList from "./_cart-list";
import CheckoutButton from "./_checkout-button";
import CartDetails from "./cart-details";
import CartHeading from "./cart-heading";
import CartItemFallback from "./cart-item-fallback";
import ShippingMethod from "./shipping-method";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = async () => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  const [shippingMethods, plants] = await Promise.all([
    getShippingMethods(),
    getPlants(),
  ]);

  if (!sessionToken?.value) {
    return null;
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="container">
            <Skeleton className="mb-6 mt-4 h-8 w-40 md:mb-7 md:mt-6 md:h-14" />
          </div>
        }
      >
        <CartHeading token={sessionToken.value} />
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
            {/* <CartList token={sessionToken.value} plants={plants} /> */}

            <div className="hidden md:block">
              <AddMoreItemsForm token={sessionToken.value} />
            </div>
            <div className="flex gap-2 px-4 md:hidden">
              <div className="w-1/2">{/* delete cart button goes here*/}</div>
              <div className="w-1/2">
                <AddMoreItemsFormMobile />
              </div>
            </div>
          </Suspense>
        </div>

        <aside className="flex flex-col gap-5 px-6 py-4 md:w-[19.75rem] md:px-0 md:py-0">
          <Suspense
            fallback={<Skeleton className="h-[182px] rounded-lg shadow-md" />}
          >
            <CartDetails token={sessionToken.value} />
          </Suspense>

          <Suspense
            fallback={<Skeleton className="h-[158px] rounded-lg shadow-md" />}
          >
            <ShippingMethod
              token={sessionToken.value}
              options={shippingMethods}
            />
          </Suspense>

          <Suspense
            fallback={<Skeleton className="h-[316px] rounded-lg shadow-md" />}
          >
            <OrderSummary token={sessionToken.value}>
              <CheckoutButton />
            </OrderSummary>
          </Suspense>
        </aside>
      </div>
    </>
  );
};

export default CartPage;
