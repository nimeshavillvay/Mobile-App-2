"use client";

import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
import { cn } from "@/_lib/utils";
import { Button } from "@repo/web-ui/components/ui/button";
import { Calendar } from "@repo/web-ui/components/ui/calendar";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/web-ui/components/ui/popover";
import { Textarea } from "@repo/web-ui/components/ui/textarea";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Calendar as CalendarIcon } from "lucide-react";
import { useId, useState } from "react";
import SelectAddressDialog from "./select-address-dialog";

dayjs.extend(advancedFormat);

type ShippingAndPickupDetailsProps = {
  token: string;
};

const ShippingAndPickupDetails = ({ token }: ShippingAndPickupDetailsProps) => {
  const id = useId();
  const shipOrderId = `ship-order-${id}`;
  const driversNoteId = `drivers-note-${id}`;

  const [open, setOpen] = useState(true);

  const shippingAddressListQuery = useSuspenseShippingAddressList(token);
  const cartQuery = useSuspenseCart(token);

  const selectedAddress = shippingAddressListQuery.data.find(
    (address) =>
      address.xcAddressId === cartQuery.data.configuration.shippingAddressId,
  );

  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const checked =
    cartQuery.data.mappedConfiguration.completeDelivery === null
      ? false
      : cartQuery.data.mappedConfiguration.completeDelivery;
  const handleCheckboxChange = () => {
    updateCartConfigMutation.mutate({
      completeDelivery: !checked,
    });
  };

  const date = dayjs(
    cartQuery.data.mappedConfiguration.pickDate ?? undefined,
  ).toDate();
  const handleDateChange = (date?: Date) => {
    if (date) {
      updateCartConfigMutation.mutate({
        pickDate: dayjs(date).format("MM-DD-YYYY"),
      });
    }
  };

  const [driversNote, setDriversNote] = useState(
    cartQuery.data.mappedConfiguration.driverNote ?? "",
  );
  const handleDriversNoteChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDriversNote(event.target.value);
  };
  const handleDriversNoteBlur = () => {
    updateCartConfigMutation.mutate({
      driverNote: driversNote,
    });
  };

  return (
    <section className="flex flex-col gap-5 rounded-lg border border-wurth-gray-250 p-5 shadow-lg md:gap-6 md:p-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-title text-xl font-medium text-wurth-gray-800 md:text-2xl md:tracking-[-0.144px]">
          Shipping and Pickup Details
        </h2>

        {!open && (
          <Button
            variant="outline"
            className="font-bold text-black shadow-md"
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <h3 className="text-sm text-black">Shipping Address</h3>

            <div className="text-base text-wurth-gray-800">
              {selectedAddress?.streetAddress}, {selectedAddress?.county},
              <br />
              {selectedAddress?.locality}, {selectedAddress?.postalCode}-
              {selectedAddress?.zip4},
              <br />
              {selectedAddress?.countryName}
            </div>
          </div>

          {open && <SelectAddressDialog token={token} />}
        </div>

        <div className="flex-1 space-y-4">
          {open ? (
            <>
              <div className="space-y-1">
                <h3 className="text-sm text-black">Default Shipping</h3>

                <p className="text-base text-wurth-gray-800">
                  Standard Shipping via Truck
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm text-black">Set Future Delivery Date</h3>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start border-wurth-gray-250 text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon
                        className={cn(
                          "mr-2 h-4 w-4 stroke-wurth-gray-250",
                          !!date && "stroke-wurth-gray-800",
                        )}
                      />
                      {date ? (
                        dayjs(date).format("MMMM Do, YYYY")
                      ) : (
                        <span
                          className={cn(
                            "text-base text-wurth-gray-250",
                            !!date && "text-wurth-gray-800",
                          )}
                        >
                          Delivery date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <div className="flex flex-row items-center gap-2">
                  <Checkbox
                    id={shipOrderId}
                    checked={checked}
                    onCheckedChange={handleCheckboxChange}
                  />

                  <Label
                    htmlFor={shipOrderId}
                    className="text-sm font-medium text-wurth-gray-800"
                  >
                    Ships order complete
                  </Label>
                </div>

                <p className="ml-[1.375rem] text-sm text-wurth-gray-500">
                  Hold order until all items are in
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-1">
              <h3 className="text-sm text-black">Set Future Delivery Date</h3>

              <p className="text-base text-wurth-gray-800">
                {dayjs(date).format("MMMM Do, YYYY")}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-1.5">
          {open && (
            <>
              <Label
                htmlFor={driversNoteId}
                className="text-sm text-wurth-gray-800"
              >
                Driver&apos; Notes
              </Label>

              <Textarea
                id={driversNoteId}
                placeholder="Note here"
                className="min-h-[130px] resize-none p-3 text-base"
                value={driversNote}
                onChange={handleDriversNoteChange}
                onBlur={handleDriversNoteBlur}
              />
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="flex flex-row justify-end">
          <Button className="font-bold" onClick={() => setOpen(false)}>
            Save and Continue
          </Button>
        </div>
      )}
    </section>
  );
};

export default ShippingAndPickupDetails;