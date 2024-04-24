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
    <div className="flex flex-col md:container md:flex-row md:gap-12">
      <div className="flex-1">
        <Suspense
          fallback={
            <section>
              <Skeleton className="mx-4 mb-6 mt-4 h-8 w-40 md:mx-0 md:mb-7 md:mt-6 md:h-14" />

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
            </section>
          }
        >
          <CartList shippingMethods={shippingMethods} />
        </Suspense>
      </div>

      <aside className="px-6 py-4 md:w-[19.75rem] md:px-0 md:py-0"></aside>
    </div>
  );
};

export default CartPage;
