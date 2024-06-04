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

const UI_DATE_FORMAT = "ddd, MMMM.DD, YYYY";

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
            {cartQuery.data.cartItems.map(
              ({ itemInfo, quantity, mappedConfiguration }) => (
                <div
                  key={itemInfo.productId}
                  className="flex flex-col gap-2 [&:not(:first-child)]:pt-4"
                >
                  <div className="flex flex-row gap-3">
                    <Link
                      href={`/product/${itemInfo.productId}/${itemInfo.slug}`}
                    >
                      <Image
                        src={itemInfo.image}
                        alt={`An image of ${itemInfo.productName}`}
                        width={84}
                        height={84}
                        className="aspect-1 shrink-0 rounded border border-wurth-gray-250 object-contain shadow-sm"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex flex-row items-center text-sm text-wurth-gray-800">
                        <Link
                          href={`/product/${itemInfo.productId}/${itemInfo.slug}`}
                          className="w-2/4 md:w-4/6"
                        >
                          <h4 className="line-clamp-3 text-sm font-medium text-wurth-gray-800">
                            {itemInfo.metaTitle === ""
                              ? itemInfo.productName
                              : itemInfo.metaTitle}
                          </h4>
                        </Link>

                        <div className="w-1/4 self-start md:w-1/6">
                          {quantity} {itemInfo.unitOfMeasure}
                        </div>

                        <div className="w-1/4 self-start text-right md:w-1/6">
                          $
                          {formatNumberToPrice(
                            parseFloat(
                              (
                                simulationCheckoutQuery.data.productslist.find(
                                  (product) =>
                                    product.productId === itemInfo.productId,
                                )?.extendedPrice ?? 0
                              ).toFixed(2),
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap text-sm text-wurth-gray-800">
                        {mappedConfiguration?.availability?.length > 0 &&
                          mappedConfiguration.availability.map(
                            (itemLine, index) =>
                              itemLine &&
                              typeof itemLine.quantity === "number" &&
                              itemLine.quantity !== 0 &&
                              !isNaN(itemLine?.quantity) && (
                                <div key={index} className="">
                                  <span className="text-green-700">
                                    {itemLine?.quantity}
                                    &nbsp;
                                    {itemLine?.quantity === 1
                                      ? "item"
                                      : "items"}
                                  </span>
                                  &nbsp;pickup at&nbsp;
                                  {plants.find(
                                    (plant) => plant.code === itemLine.plant,
                                  )?.name ?? "Plant N/A"}
                                  &nbsp;&nbsp;
                                  {mappedConfiguration.availability.length -
                                    1 !==
                                    index && (
                                    <span className="text-black">
                                      &#x2022;&nbsp;&nbsp;
                                    </span>
                                  )}
                                  {mappedConfiguration.availability.length -
                                    1 ===
                                    index &&
                                    mappedConfiguration.backOrderQuantity >
                                      0 && (
                                      <span className="text-black">
                                        &#x2022;&nbsp;&nbsp;
                                      </span>
                                    )}
                                </div>
                              ),
                          )}

                        {mappedConfiguration.backOrderQuantity > 0 &&
                          mappedConfiguration.backOrderDate && (
                            <div className="mr-4">
                              <span className="text-yellow-700">Backorder</span>
                              &nbsp;
                              {mappedConfiguration.backOrderQuantity}
                              &nbsp;items, ship by&nbsp;
                              {dayjs(mappedConfiguration.backOrderDate).format(
                                UI_DATE_FORMAT,
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
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
