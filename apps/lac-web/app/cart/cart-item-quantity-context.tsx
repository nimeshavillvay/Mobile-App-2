"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// todo
// This context is used to check the validity of various elements in the cart page
// when clicking the "Secure Checkout" button without wrapping the entire page in
// a single form element.

const CartItemQuantityContext = createContext<{
  lineQuantity: number;
  // totalQuantity: number;
  setLineQuantity: (quantity: number) => void;
  // setTotalQuantity: (quantity: number) => void;
}>({
  lineQuantity: 0,
  // totalQuantity: 0,
  setLineQuantity: () => {},
  // setTotalQuantity: () => {},
});

export const useCartItemQuantityContext = () => {
  return useContext(CartItemQuantityContext);
};

export const CartItemQuantityProvider = ({
  children,
  lineQuantity: initialLineQuantity,
  // totalQuantity: initialTotalQuantity,
}: {
  readonly children: ReactNode;
  readonly lineQuantity: number;
  // readonly totalQuantity: number;
}) => {
  console.log(
    ">> CartItemQuantityProvider initialLineQuantity",
    initialLineQuantity,
  );
  const [lineQuantity, setLineQuantity] = useState(Number(initialLineQuantity));
  // const [totalQuantity, setTotalQuantity] = useState(initialTotalQuantity);
  console.log(">> CartItemQuantityProvider lineQuantity", lineQuantity);

  return (
    <CartItemQuantityContext.Provider value={{ lineQuantity, setLineQuantity }}>
      {children}
    </CartItemQuantityContext.Provider>
  );
};
