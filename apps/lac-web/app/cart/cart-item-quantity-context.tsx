"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// todo
// This context is used to check the validity of various elements in the cart page
// when clicking the "Secure Checkout" button without wrapping the entire page in
// a single form element.

const CartItemQuantityContext = createContext<{
  lineQuantity: number;
  setLineQuantity: (quantity: number) => void;
} | null>(null);

export const useCartItemQuantityContext = () => {
  const context = useContext(CartItemQuantityContext);

  if (!context) {
    throw new Error(
      "useCartItemQuantityContext should be used within CartItemQuantityProvider",
    );
  }

  return context;
};

export const CartItemQuantityProvider = ({
  children,
  lineQuantity: initialLineQuantity,
}: {
  readonly children: ReactNode;
  readonly lineQuantity: number;
}) => {
  const [lineQuantity, setLineQuantity] = useState(Number(initialLineQuantity));

  return (
    <CartItemQuantityContext.Provider value={{ lineQuantity, setLineQuantity }}>
      {children}
    </CartItemQuantityContext.Provider>
  );
};
