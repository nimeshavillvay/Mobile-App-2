"use client";

import { Checkbox } from "@/old/_components/ui/checkbox";
import { Label } from "@/old/_components/ui/label";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import useCheckAvailability from "@/old/_hooks/product/use-check-availability.hook";
import { useId, type ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AvailabilityOption from "./availability-option";

type ShippingOptionsProps = {
  sku: string;
  quantity: number;
};

const ShippingOptions = ({ sku, quantity }: ShippingOptionsProps) => {
  const id = useId();
  const willCallId = `willCall-${id}`;

  const accountListQuery = useAccountList();

  const checkAvailabilityQuery = useCheckAvailability(sku, quantity);

  if (!accountListQuery.data) {
    return <Container />;
  }

  return (
    <Container>
      {quantity ? (
        !checkAvailabilityQuery.data?.length ? (
          <div className="mt-[15px] flex flex-row justify-center">
            <AiOutlineLoading3Quarters className="text-brand-primary animate-spin text-4xl leading-none" />
          </div>
        ) : (
          <>
            {checkAvailabilityQuery.data.map((availability) => (
              <AvailabilityOption
                key={`${availability.sku}-${availability.xplant}`}
                availability={availability}
              />
            ))}

            <div className="mt-3.5 flex flex-row gap-3">
              <Checkbox id={willCallId} />

              <Label htmlFor={willCallId}>
                <span className="font-bold">Will Call Anywhere.</span> Pickup
                this item from an alternate location.
              </Label>
            </div>
          </>
        )
      ) : (
        <div className="bg-brand-gray-100 mt-[15px] px-6 py-4 font-medium">
          <div className="mb-1">Enter a quantity to:</div>

          <ul className="list-outside list-disc space-y-[5px] pl-10">
            <li>Check Stock</li>
            <li>Choose Shipping Options</li>
          </ul>
        </div>
      )}
    </Container>
  );
};

export default ShippingOptions;

const Container = ({ children }: { children?: ReactNode }) => {
  return <div className="w-full max-w-[322px]">{children}</div>;
};
