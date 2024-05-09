import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { useId, useState } from "react";
import type { ShippingMethod } from "../types";

const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";
const BACK_ORDER = "back-order";

type CartItemShippingMethodProps = {
  options: ShippingMethod[];
};

const CartItemShippingMethod = ({ options }: CartItemShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `ship-to-me-${id}`;
  const willCallId = `will-call-${id}`;
  const backOrderId = `back-order-${id}`;

  const [selectedSection, setSelectedSection] = useState<string>();

  const handleSelectValueChange = (value: string) => {
    console.log(value);
  };

  return (
    <ul className="flex flex-col gap-3">
      <li className="flex flex-col items-stretch gap-2">
        <div className="flex flex-row items-center gap-3">
          <Checkbox
            id={shipToMeId}
            className="size-5 rounded-full"
            iconClassName="size-4"
            checked={selectedSection === SHIP_TO_ME}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setSelectedSection(SHIP_TO_ME);
              } else {
                setSelectedSection(undefined);
              }
            }}
            disabled={false}
          />

          <Label htmlFor={shipToMeId} className="text-base font-bold">
            Ship to me
          </Label>
        </div>

        <div className="ml-[1.625rem] flex flex-col gap-2">
          <Select
            disabled={selectedSection !== SHIP_TO_ME}
            onValueChange={handleSelectValueChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a delivery method" />
            </SelectTrigger>

            <SelectContent>
              {options?.length > 0 &&
                options.map((option) => (
                  <SelectItem key={option.code} value={option.code}>
                    {option.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <div>
            Get it by <span>today</span> if you
          </div>
        </div>
      </li>

      <li className="flex flex-col items-stretch gap-2">
        <div className="flex flex-row items-center gap-3">
          <Checkbox
            id={willCallId}
            className="size-5 rounded-full"
            iconClassName="size-4"
            checked={selectedSection === WILL_CALL}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setSelectedSection(WILL_CALL);
              } else {
                setSelectedSection(undefined);
              }
            }}
            disabled={false}
          />

          <Label htmlFor={willCallId} className="text-base font-bold">
            Store pick up (Will call)
          </Label>
        </div>
      </li>

      <li className="flex flex-col items-stretch gap-2">
        <div className="flex flex-row items-center gap-3">
          <Checkbox
            id={backOrderId}
            className="size-5 rounded-full"
            iconClassName="size-4"
            checked={selectedSection === BACK_ORDER}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setSelectedSection(BACK_ORDER);
              } else {
                setSelectedSection(undefined);
              }
            }}
            disabled={false}
          />

          <Label htmlFor={backOrderId} className="text-base font-bold">
            Backorder everything
          </Label>
        </div>
      </li>
    </ul>
  );
};

export default CartItemShippingMethod;
