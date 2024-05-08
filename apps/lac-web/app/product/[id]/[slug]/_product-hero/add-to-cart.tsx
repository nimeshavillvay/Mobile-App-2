"use client";

import { cn } from "@/_lib/utils";
import { AddToCart as AddToCartIcon } from "@repo/web-ui/components/icons/add-to-cart";
import { Check } from "@repo/web-ui/components/icons/check";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { HeartOutline } from "@repo/web-ui/components/icons/heart-outline";
import { Minus } from "@repo/web-ui/components/icons/minus";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { useState, type ChangeEvent } from "react";

type AddToCartProps = {
  minQty: number;
  incQty: number;
  className?: string;
};

const AddToCart = ({ minQty, incQty, className }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(minQty);
  const reduceQuantity = () => {
    setQuantity((quantity) => quantity - incQty);
  };
  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + incQty);
  };

  return (
    <section className={cn("space-y-3", className)}>
      <div className="space-y-2 py-1 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex shrink-0 flex-row items-center gap-2">
          <div className="rounded bg-green-50 px-4 py-2 text-sm font-semibold leading-4 text-green-700 md:px-2 md:py-1">
            In Stock
          </div>

          <div className="text-sm font-medium text-wurth-gray-800">
            156 in stock at Brea, CA
          </div>
        </div>

        <Button
          variant="subtle"
          className="flex h-fit w-full flex-row items-center justify-between font-bold md:w-fit md:px-2 md:py-0.5"
        >
          <span>Check Other Stores</span>

          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="flex flex-row items-stretch gap-2">
        <div className="flex-[4] rounded-md border border-wurth-gray-250 p-0.5 md:flex-1">
          <div className="text-center text-xs font-medium uppercase leading-none text-wurth-gray-400">
            Qty / Each
          </div>

          <div className="flex flex-row items-center justify-between gap-2 shadow-sm">
            <Button
              type="button"
              variant="subtle"
              size="icon"
              className="size-10 rounded-sm"
              onClick={reduceQuantity}
              disabled={quantity === minQty}
            >
              <Minus className="size-4" />
              <span className="sr-only">Reduce quantity</span>
            </Button>

            <Input
              type="number"
              min={minQty}
              step={incQty}
              value={quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuantity(Number(e.target.value))
              }
              className="flex-1 rounded-sm border-0 p-0 text-center text-lg font-semibold text-wurth-gray-800 shadow-none"
            />

            <Button
              type="button"
              variant="subtle"
              size="icon"
              className="size-10 rounded-sm"
              onClick={increaseQuantity}
            >
              <Plus className="size-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="h-full flex-[5] gap-2 rounded-lg px-5 py-4 shadow-md md:flex-[2]"
        >
          <AddToCartIcon className="stroke-white" />

          <span className="text-lg font-semibold">Add to cart</span>
        </Button>
      </div>

      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex-1 text-sm text-wurth-gray-500 md:flex md:flex-row md:items-center md:gap-4">
          <div>
            Min Order:{" "}
            <span className="font-semibold text-wurth-gray-800">{minQty}</span>
          </div>

          <div>
            Quantity Multiple by:{" "}
            <span className="font-semibold text-wurth-gray-800">{incQty}</span>
          </div>
        </div>

        <Button variant="outline" disabled className="gap-1 md:py-2">
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
