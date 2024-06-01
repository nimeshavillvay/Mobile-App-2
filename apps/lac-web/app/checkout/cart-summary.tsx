"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import type { Plant } from "@/_lib/types";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { ChevronDown } from "@repo/web-ui/components/icons/chevron-down";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CartSummaryProps = {
  readonly token: string;
  readonly plants: Plant[];
};

const CartSummary = ({ token, plants }: CartSummaryProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const simulationCheckoutQuery = useSuspenseSimulationCheckout(token);
  const cartQuery = useSuspenseCart(token);

  return (
    <section className="flex max-w-full flex-col gap-6 rounded-lg border border-wurth-gray-250 p-5 shadow-lg md:p-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-title text-xl font-medium text-wurth-gray-800 md:text-2xl md:tracking-[-0.144px]">
          Cart Summary{" "}
          <span className="text-base leading-7 text-wurth-gray-500 md:text-xl md:leading-7">
            ({simulationCheckoutQuery.data.cartItemsCount}{" "}
            {simulationCheckoutQuery.data.totalQuantity === 1
              ? "item"
              : "items"}
            )
          </span>
        </h2>

        <Link
          href="/cart"
          replace
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "font-bold text-black shadow-md",
          )}
        >
          Edit Cart
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {!showDetails ? (
          <div className="flex w-full snap-x flex-row items-center gap-3 overflow-x-auto">
            {cartQuery.data.cartItems.map((item) => (
              <div
                key={item.itemInfo.productId}
                className="relative shrink-0 snap-start"
              >
                <Link
                  href={`/product/${item.itemInfo.productId}/${item.itemInfo.slug}`}
                >
                  <Image
                    src={item.itemInfo.image}
                    alt={`An image of ${item.itemInfo.productName}`}
                    width={96}
                    height={96}
                    className="aspect-1 rounded border border-wurth-gray-250 object-contain shadow-sm"
                  />
                  <span className="sr-only">{item.itemInfo.productName}</span>

                  <span className="absolute bottom-1 right-1 rounded-full bg-wurth-gray-800 p-1 text-center text-[0.625rem] font-semibold leading-none text-white">
                    {item.quantity}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 divide-y divide-wurth-gray-150">
            {cartQuery.data.cartItems.map((item) => (
              <div
                key={item.itemInfo.productId}
                className="flex flex-col gap-2 [&:not(:first-child)]:pt-4"
              >
                <div className="flex flex-row gap-3">
                  <Link
                    href={`/product/${item.itemInfo.productId}/${item.itemInfo.slug}`}
                  >
                    <Image
                      src={item.itemInfo.image}
                      alt={`An image of ${item.itemInfo.productName}`}
                      width={84}
                      height={84}
                      className="aspect-1 shrink-0 rounded border border-wurth-gray-250 object-contain shadow-sm"
                    />
                  </Link>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-row items-center justify-between text-sm text-wurth-gray-800">
                      <div>
                        {item.quantity} {item.itemInfo.unitOfMeasure}
                      </div>

                      <div>
                        $
                        {formatNumberToPrice(
                          parseFloat(
                            (
                              simulationCheckoutQuery.data.productslist.find(
                                (product) =>
                                  product.productId === item.itemInfo.productId,
                              )?.extendedPrice ?? 0
                            ).toFixed(2),
                          ),
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/product/${item.itemInfo.productId}/${item.itemInfo.slug}`}
                    >
                      <h4 className="text-sm font-medium text-wurth-gray-800">
                        {item.itemInfo.productName}
                      </h4>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap text-sm text-wurth-gray-800">
                  {item.mappedConfiguration.availability.map(
                    (itemLine, index) =>
                      itemLine &&
                      typeof itemLine.quantity === "number" &&
                      itemLine.quantity !== 0 && (
                        <div key={index} className="mr-2">
                          <span className="text-green-700">
                            {itemLine.quantity}{" "}
                            {itemLine.quantity === 1 ? "item" : "items"}
                          </span>{" "}
                          pickup at{" "}
                          {plants.find((plant) => plant.code === itemLine.plant)
                            ?.name ?? ""}
                        </div>
                      ),
                  )}

                  {item.configuration.backorder_quantity &&
                    item.configuration.backorder_date &&
                    parseInt(item.configuration.backorder_quantity) > 0 && (
                      <div className="ml-1 mr-4">
                        <span className="text-yellow-700">&#x2022;</span>
                        <span className="ml-2 text-yellow-700">
                          Backorder
                        </span>{" "}
                        {item.configuration.backorder_quantity} items, ship by{" "}
                        {dayjs(item.configuration.backorder_date).format(
                          "ddd, MMMM.DD, YYYY",
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="subtle"
          onClick={() => setShowDetails((showDetails) => !showDetails)}
          className="md:self-start"
        >
          <ChevronDown
            width={16}
            height={16}
            className={cn(
              "font-bold text-black transition duration-150 ease-out",
              showDetails && "rotate-180",
            )}
          />
          <span>{showDetails ? "Hide" : "Show"} details</span>
        </Button>
      </div>
    </section>
  );
};

export default CartSummary;
