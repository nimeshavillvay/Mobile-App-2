"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";

const CartHeading = () => {
  const { data } = useSuspenseCart();

  return (
    <h1 className="container mb-6 mt-4 text-2xl font-light tracking-[-0.144px] text-wurth-gray-800 md:mb-7 md:mt-6 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
      <span className="font-medium">Cart</span> ({data["total-quantity"]}{" "}
      {data["total-quantity"] === 1 ? "item" : "items"})
    </h1>
  );
};

export default CartHeading;
