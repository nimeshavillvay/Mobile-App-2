"use client";

import ProductNotAvailable from "@/_components/product-not-available";
import useSuspenseWillCallPlant from "@/_hooks/address/use-suspense-will-call-plant.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { LIMITED_STOCK, NOT_AVAILABLE, NOT_IN_STOCK } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import { useDeferredValue } from "react";
import useAddToCartForm from "../../use-add-to-cart-form.hook";

type LocationStocksProps = {
  readonly token: string;
  readonly productId: number;
};

const LocationStocks = ({ token, productId }: LocationStocksProps) => {
  const { watch } = useAddToCartForm();
  const quantity = watch("quantity");
  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: deferredQuantity,
  });
  const willCallPlantQuery = useSuspenseWillCallPlant(token);

  const willCallPlant = willCallPlantQuery.data;
  const willCallPlantCode = willCallPlant?.plantCode;
  const { availableLocations, status } = checkAvailabilityQuery.data;

  const homeBranch = availableLocations?.find(
    (location) => location.location === willCallPlantCode,
  );
  const otherLocations = availableLocations?.filter(
    ({ location }) => location !== willCallPlantCode,
  );
  const isNotInStock = status === NOT_IN_STOCK;
  const isLimitedStock = status === LIMITED_STOCK;

  const checkLoginQuery = useSuspenseCheckLogin(token);

  // If there isn't even one location returned, show not available error
  if (
    !homeBranch &&
    otherLocations.length === 0 &&
    checkAvailabilityQuery.data.status === NOT_AVAILABLE
  ) {
    return <ProductNotAvailable />;
  }
  return (
    <Collapsible className="flex flex-col gap-1">
      <div className="space-y-2 py-1 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex shrink-0 flex-row items-center gap-2">
          <div
            className={cn(
              "rounded px-4 py-2 text-sm font-semibold leading-4 md:px-2 md:py-1",
              isNotInStock || isLimitedStock || !homeBranch
                ? "bg-yellow-50 text-yellow-700"
                : "bg-green-50 text-green-700",
            )}
          >
            {isNotInStock || !homeBranch
              ? "Backordered"
              : isLimitedStock
                ? "Limited Stock"
                : "In Stock"}
          </div>

          {homeBranch && !isNotInStock && (
            <div className="text-sm font-medium text-wurth-gray-800">
              {homeBranch?.amount} in stock at {homeBranch?.name}
            </div>
          )}
        </div>

        {checkLoginQuery.data.status_code === "OK" &&
          !isNotInStock &&
          otherLocations.length > 0 && (
            <CollapsibleTrigger
              className="group flex h-fit w-full flex-row items-center justify-between font-bold md:w-fit md:px-2 md:py-0.5"
              asChild
            >
              <Button type="button" variant="subtle">
                <span>Check Other Stores</span>

                <ChevronRight
                  width={16}
                  height={16}
                  className="transition duration-150 ease-out group-data-[state=open]:rotate-90"
                />
              </Button>
            </CollapsibleTrigger>
          )}
      </div>

      {checkLoginQuery.data.status_code === "OK" && (
        <CollapsibleContent>
          <table className="w-full border-separate rounded-lg border border-wurth-gray-150 [&_td]:p-3 [&_th]:p-3">
            <thead>
              <tr className="text-sm text-wurth-gray-500">
                <th className="border-b border-b-wurth-gray-150 text-left font-normal">
                  Location
                </th>
                <th className="border-b border-b-wurth-gray-150 text-right font-normal">
                  Stock
                </th>
              </tr>
            </thead>

            <tbody>
              {otherLocations.map((location) => (
                <tr
                  key={location.location}
                  className="text-sm text-wurth-gray-800 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-wurth-gray-150"
                >
                  <td className="text-left font-normal">{location.name}</td>

                  <td className="text-right font-normal">{location.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default LocationStocks;
