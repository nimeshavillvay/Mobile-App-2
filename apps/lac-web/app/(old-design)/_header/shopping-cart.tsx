"use client";

import VisuallyHidden from "@/old/_components/visually-hidden";
import useSimulationCheckout from "@/old/_hooks/cart/use-simulation-checkout.hook";
import { formatNumberToPrice } from "@/old/_utils/helpers";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

const ShoppingCart = () => {
  const simulationCheckoutQuery = useSimulationCheckout();

  if (!simulationCheckoutQuery.data) {
    return <ShoppingCartContent />;
  }

  return (
    <Link href="/shopping-cart">
      <VisuallyHidden>Shopping cart</VisuallyHidden>

      <ShoppingCartContent
        count={simulationCheckoutQuery.data.cartItemsCount}
        price={simulationCheckoutQuery.data.net}
      />
    </Link>
  );
};

export default ShoppingCart;

const ShoppingCartContent = ({
  count = 0,
  price = 0,
}: {
  count?: number;
  price?: number;
}) => {
  return (
    <div className="group flex flex-row items-center gap-2.5">
      <div className="relative">
        <MdOutlineShoppingCart className="text-brand-gray-500 text-3xl leading-none" />

        <div className="bg-brand-primary absolute -bottom-2 -right-2 min-w-5 rounded-full p-0.5 text-center text-[10px] font-bold leading-4 text-white">
          {count}
        </div>
      </div>

      <div>
        <div className="text-brand-gray-400 text-sm leading-4 group-hover:underline">
          Shopping Cart
        </div>

        <div className="font-wurth text-base font-extrabold leading-none text-black">
          ${formatNumberToPrice(price)}
        </div>
      </div>
    </div>
  );
};
