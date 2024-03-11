"use client";

import { Label } from "@/old/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/old/_components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import useSelectedAddress from "@/old/_hooks/account/use-selected-address.hook";
import {
  AVAILABILITY_STATUSES,
  AVAILABLE_AVAILABILITY,
  BACK_ORDERED_AVAILABILITY,
} from "@/old/_lib/constants";
import { Availability } from "@/old/_lib/types";
import { cn, getStatusLabel } from "@/old/_utils/helpers";
import { getAvailabilityTypeLabel, getShippingMethods } from "./helpers";

type AvailabilityOption = {
  availability: Availability;
};

const AvailabilityOption = ({ availability }: AvailabilityOption) => {
  const address = useSelectedAddress();

  const shippingMethodsString = availability.options?.[0].shippingMethods_1;
  const shippingMethods = shippingMethodsString
    ? getShippingMethods(shippingMethodsString)
    : [];

  const availabilityType = availability.options?.[0].type;

  let quantity = "0";
  if (
    availabilityType === AVAILABLE_AVAILABILITY &&
    availability.options?.[0].quantity_1
  ) {
    quantity = availability.options?.[0].quantity_1;
  } else if (
    availabilityType === BACK_ORDERED_AVAILABILITY &&
    availability.options?.[0].backOrderQuantity_1
  ) {
    quantity = availability.options?.[0].backOrderQuantity_1;
  }

  return (
    <>
      <div
        className={cn("mb-2.5 mt-3 font-bold", {
          "text-brand-success":
            availability.status === AVAILABILITY_STATUSES.IN_STOCK,
          "text-brand-primary":
            availability.status === AVAILABILITY_STATUSES.NOT_IN_STOCK,
        })}
      >
        {getStatusLabel(availability.status)}
      </div>

      <div className="space-y-3 rounded-sm px-6 py-4 shadow-md">
        <RadioGroup defaultValue={availability.status}>
          <div className="flex flex-row items-center gap-3">
            <RadioGroupItem
              value={availability.status}
              id={`${availability.sku}-${availability.xplant}-${availability.status}`}
            />

            <Label
              htmlFor={`${availability.sku}-${availability.xplant}-${availability.status}`}
              className="font-bold"
            >
              {getStatusLabel(availability.status)}
            </Label>
          </div>
        </RadioGroup>

        <div className="text-brand-gray-500">
          {address?.locality}, {address?.region}
        </div>

        <Select
          defaultValue={shippingMethods[shippingMethods.length - 1]?.value}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Shipping Method" />
          </SelectTrigger>
          <SelectContent>
            {shippingMethods.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="font-bold leading-6 text-brand-gray-500">
          {quantity}{" "}
          <span
            className={cn({
              "text-brand-success": availabilityType === AVAILABLE_AVAILABILITY,
              "text-brand-primary":
                availabilityType === BACK_ORDERED_AVAILABILITY,
            })}
          >
            {availabilityType ? getAvailabilityTypeLabel(availabilityType) : ""}
          </span>{" "}
          now
        </div>
      </div>
    </>
  );
};

export default AvailabilityOption;
