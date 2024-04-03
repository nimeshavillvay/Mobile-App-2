"use client";

import AddToCartIcon from "@repo/web-ui/components/icons/add-to-cart";
import Check from "@repo/web-ui/components/icons/check";
import ChevronRight from "@repo/web-ui/components/icons/chevron-right";
import HeartOutline from "@repo/web-ui/components/icons/heart-outline";
import Minus from "@repo/web-ui/components/icons/minus";
import Plus from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { useState } from "react";

const AddToCart = () => {
  const [quantity, setQuantity] = useState(4);
  const reduceQuantity = () => {
    setQuantity((quantity) => quantity - 1);
  };
  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  return (
    <section className="my-6 container space-y-3">
      <div className="py-1 space-y-2">
        <div className="flex flex-row items-center gap-2">
          <div className="bg-green-50 text-green-700 py-2 px-4 rounded text-sm leading-4 font-semibold">
            In Stock
          </div>

          <div className="text-sm text-wurth-gray-800 font-medium">
            156 in stock at Brea, CA
          </div>
        </div>

        <Button
          variant="subtle"
          className="w-full flex flex-row items-center justify-between font-bold"
        >
          <span>Check Other Stores</span>

          <ChevronRight className="size-4" />
        </Button>
      </div>

      <form className="flex flex-row items-stretch gap-2">
        <div className="flex-[4] p-0.5 rounded-md border border-wurth-gray-250">
          <div className="uppercase text-center text-wurth-gray-400 text-xs leading-none font-medium">
            Qty / Each
          </div>

          <div className="flex flex-row items-center justify-between gap-2 shadow-sm">
            <Button
              type="button"
              variant="subtle"
              size="icon"
              className="size-10 rounded-sm"
              onClick={reduceQuantity}
              disabled={quantity === 1}
            >
              <Minus className="size-4" />
              <span className="sr-only">Reduce quantity</span>
            </Button>

            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex-1 border-0 shadow-none text-center p-0 text-wurth-gray-800 font-semibold text-lg rounded-sm"
            />

            <Button
              type="button"
              variant="subtle"
              size="icon"
              className="size-10 rounded-sm"
              onClick={increaseQuantity}
              disabled={quantity === 10}
            >
              <Plus className="size-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="flex-[5] px-5 py-4 shadow-md h-full rounded-lg gap-2"
        >
          <AddToCartIcon className="stroke-white" />

          <span className="text-lg font-semibold">Add to cart</span>
        </Button>
      </form>

      <div className="flex flex-row items-center justify-between gap-2">
        <div className="text-sm text-wurth-gray-500 flex-1">
          <div>
            Min Order:{" "}
            <span className="text-wurth-gray-800 font-semibold">4</span>
          </div>

          <div>
            Quantity Multiple by:{" "}
            <span className="text-wurth-gray-800 font-semibold">8</span>
          </div>
        </div>

        <Button variant="outline" disabled className="gap-1">
          <Check className="size-4" />
          <span>Compare</span>
        </Button>

        <Button variant="outline" size="icon">
          <HeartOutline className="size-4" />

          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
    </section>
  );
};

export default AddToCart;
