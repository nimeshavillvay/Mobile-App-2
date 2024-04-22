import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";
import type { ResponseAddress } from "./use-register-new-user-mutation.hook";

type AddressSelectorProps = {
  billingAddresses: ResponseAddress[];
  shippingAddresses: ResponseAddress[];
  updateAddressManually: () => void;
  updateAddress: ({
    billing,
    shipping,
  }: {
    billing?: ResponseAddress;
    shipping?: ResponseAddress;
  }) => void;
};

const AddressSelector = ({
  billingAddresses,
  shippingAddresses,
  updateAddressManually,
  updateAddress,
}: AddressSelectorProps) => {
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<number>();
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<number>();

  const onSubmit = () => {
    updateAddress({
      billing: selectedBillingAddress
        ? billingAddresses[selectedBillingAddress]
        : undefined,
      shipping: selectedShippingAddress
        ? shippingAddresses[selectedShippingAddress]
        : undefined,
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-wurth-gray-250 bg-white p-6 shadow-lg">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-wurth-gray-800">
          Address Conflict
        </h3>

        <p className="text-sm text-wurth-gray-800">
          We found a few possible versions of your address. Please select the
          most accurate one to ensure correct shipping and taxes. If none match,
          please update your address.
        </p>
      </div>

      <div className="space-y-3">
        {!!billingAddresses.length && (
          <AddressList
            type="Billing"
            addresses={billingAddresses}
            selectedIndex={selectedBillingAddress}
            setSelectedIndex={setSelectedBillingAddress}
          />
        )}

        {!!shippingAddresses.length && (
          <AddressList
            type="Shipping"
            addresses={shippingAddresses}
            selectedIndex={selectedShippingAddress}
            setSelectedIndex={setSelectedShippingAddress}
          />
        )}
      </div>

      <div className="flex flex-row items-center justify-end gap-2">
        <Button variant="outline" onClick={updateAddressManually}>
          Update address
        </Button>

        <Button
          disabled={
            (billingAddresses.length > 0 && !selectedBillingAddress) ||
            (shippingAddresses.length > 0 && !selectedShippingAddress)
          }
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddressSelector;

const AddressList = ({
  type,
  addresses,
  selectedIndex,
  setSelectedIndex,
}: {
  type: "Billing" | "Shipping";
  addresses: ResponseAddress[];
  selectedIndex?: number;
  setSelectedIndex: (index: number) => void;
}) => {
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-wurth-gray-800">
        {type} {addresses.length > 1 ? "addresses" : "address"}
      </h4>

      <ul className="flex flex-col gap-2">
        {addresses.map((address, index) => (
          <li key={index}>
            <Button
              variant="outline"
              className={cn(
                "flex h-fit w-full flex-row justify-start rounded-lg border-2 border-wurth-gray-150 p-4",
                selectedIndex === index && "border-wurth-gray-800",
              )}
              onClick={() => setSelectedIndex(index)}
            >
              <CheckCircle
                className={cn(
                  "size-5 stroke-wurth-gray-150",
                  selectedIndex === index && "stroke-wurth-gray-800",
                )}
              />

              <div className="text-base font-medium text-wurth-gray-800">
                {address["street-address"]}, {address.locality},{" "}
                {address.region}, {address["postal-code"]}-{address.zip4}
              </div>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
