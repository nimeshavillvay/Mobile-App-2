"use client";

import VisuallyHidden from "@/_components/visually-hidden";
import useSimulationCheckout from "@/_hooks/cart/use-simulation-checkout.hook";
import { formatNumberToPrice } from "@/_utils/helpers";
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
    <div className="group flex flex-row gap-2">
      <div className="relative">
        <MdOutlineShoppingCart className="text-[42px] leading-none" />

        <div className="bg-brand-very-dark-gray absolute bottom-0 right-0 rounded-full px-2 text-white">
          {count}
        </div>
      </div>

      <div>
        <div className="group-hover:underline">Shopping Cart</div>

        <div>{formatNumberToPrice(price)}</div>
      </div>
    </div>
  );
};
