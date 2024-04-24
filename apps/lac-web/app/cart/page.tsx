import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import CartList from "./_cart-list";
import { getShippingMethods } from "./apis";
import CartItemFallback from "./cart-item-fallback";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = async () => {
  const shippingMethods = await getShippingMethods();

  return (
    <div className="flex flex-col md:flex-row md:gap-12 md:container">
      <div className="flex-1">
        <Suspense
          fallback={
            <section>
              <Skeleton className="mb-6 mt-4 h-8 w-40 mx-4 md:mx-0 md:h-14 md:mb-7 md:mt-6" />

              <ul className="flex flex-col">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="px-4 md:px-0 pb-7 [&:not(:first-child)]:pt-7 border-b border-b-wurth-gray-250"
                  >
                    <CartItemFallback />
                  </li>
                ))}
              </ul>
            </section>
          }
        >
          <CartList shippingMethods={shippingMethods} />
        </Suspense>
      </div>

      <aside className="md:w-[19.75rem]"></aside>
    </div>
  );
};

export default CartPage;
