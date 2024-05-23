"use client";

import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { cn } from "@/_lib/utils";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import useAddToCartForm from "../use-add-to-cart-form.hook";

type LocationStocksProps = {
  token: string;
  productId: number;
};

const LocationStocks = ({ token, productId }: LocationStocksProps) => {
  const { watch } = useAddToCartForm();
  const quantity = watch("quantity");
  const delayedQuantity = useDebouncedState(quantity);

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: delayedQuantity,
  });
  const firstLocation = checkAvailabilityQuery.data.availableLocations[0];
  const otherLocations =
    checkAvailabilityQuery.data.availableLocations.slice(1);
  const isBackordered = checkAvailabilityQuery.data.status === "notInStock";
  const isLimitedStock = checkAvailabilityQuery.data.status === "limitedStock";

  const checkLoginQuery = useSuspenseCheckLogin(token);

  return (
    <Collapsible className="flex flex-col gap-1">
      <div className="space-y-2 py-1 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex shrink-0 flex-row items-center gap-2">
          <div
            className={cn(
              "rounded px-4 py-2 text-sm font-semibold leading-4 md:px-2 md:py-1",
              isBackordered || isLimitedStock
                ? "bg-yellow-50 text-yellow-700"
                : "bg-green-50 text-green-700",
            )}
          >
            {isBackordered
              ? "Backordered"
              : isLimitedStock
                ? "Limited Stock"
                : "In Stock"}
          </div>

          {!isBackordered && (
            <div className="text-sm font-medium text-wurth-gray-800">
              {firstLocation?.amount} in stock at {firstLocation?.name}
            </div>
          )}
        </div>

        {checkLoginQuery.data.status_code === "OK" && (
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
