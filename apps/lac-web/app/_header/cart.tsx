"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import { ShoppingCart } from "@repo/web-ui/components/icons/shopping-cart";

const Cart = ({
  token,
  type,
}: {
  readonly token: string;
  readonly type: string;
}) => {
  const cartQuery = useSuspenseCart(token);
  const quantity = cartQuery.data.cartItems.length;
  let displayQuantity = "0";
  if (quantity > 99) {
    displayQuantity = "99+";
  } else {
    displayQuantity = quantity.toString();
  }

  return (
    <div className="relative">
      <ShoppingCart className={type === "desktop" ? "size-7" : ""} />
      <span className="absolute -right-1 -top-1 min-w-5 max-w-7  rounded-full bg-wurth-red-650 p-1 text-center text-[0.625rem] font-semibold leading-none text-white">
        {displayQuantity}
      </span>
    </div>
  );
};

export default Cart;
