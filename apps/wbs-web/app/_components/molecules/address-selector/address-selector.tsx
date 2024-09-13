import type { ResponseAddress } from "@/(auth)/register/_components/types";
import FullAddress from "@/_components/molecules/full-address/full-address";

import { cn } from "@/_lib/utils/";
import { Button } from "@repo/web-ui/components/base/atoms/button";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { useState } from "react";

type AddressSelectorProps = {
  readonly billingAddresses: ResponseAddress[];
  readonly shippingAddresses: ResponseAddress[];
  readonly clearSuggestions: () => void;
  readonly updateAddress: ({
    billing,
    shipping,
  }: {
    billing?: ResponseAddress;
    shipping?: ResponseAddress;
  }) => void;
  readonly disabled: boolean;
  readonly currentBillingAddress?: ResponseAddress[];
  readonly currentShippingAddress?: ResponseAddress[];
};

const AddressSelector = ({
  billingAddresses,
  shippingAddresses,
  clearSuggestions,
  updateAddress,
  disabled,
  currentBillingAddress,
  currentShippingAddress,
}: AddressSelectorProps) => {
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<number>();
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<number>();
  const [userSelectedBillingAddress, setUserSelectedBillingAddress] =
    useState<number>();
  const [userSelectedShippingAddress, setUserSelectedShippingAddress] =
    useState<number>();

  const getAddress = (
    selectedAddress: number | undefined,
    addresses: ResponseAddress[] | undefined,
  ): ResponseAddress | undefined =>
    typeof selectedAddress === "number" && addresses
      ? addresses[selectedAddress]
      : undefined;

  const onSubmit = () => {
    updateAddress({
      billing: getAddress(
        userSelectedBillingAddress !== undefined
          ? userSelectedBillingAddress
          : selectedBillingAddress,
        userSelectedBillingAddress !== undefined
          ? currentBillingAddress
          : billingAddresses,
      ),
      shipping: getAddress(
        userSelectedShippingAddress !== undefined
          ? userSelectedShippingAddress
          : selectedShippingAddress,
        userSelectedShippingAddress !== undefined
          ? currentShippingAddress
          : shippingAddresses,
      ),
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
          most accurate one. If none match, please update your address.
        </p>
      </div>

      <div className="space-y-3">
        {!!billingAddresses.length && (
          <>
            <div>
              {currentBillingAddress ? (
                <div>
                  <AddressList
                    title="Billing address entered by you"
                    addresses={currentBillingAddress}
                    selectedIndex={userSelectedBillingAddress}
                    setSelectedIndex={setUserSelectedBillingAddress}
                    disabled={disabled}
                    data-testid="select-userBillingAddress"
                  />
                </div>
              ) : null}
            </div>
            <div>
              <AddressList
                title="Billing address recommended by UPS"
                addresses={billingAddresses}
                selectedIndex={selectedBillingAddress}
                setSelectedIndex={setSelectedBillingAddress}
                disabled={disabled}
                data-testid="select-BillingAddressSuggestions"
              />
            </div>
          </>
        )}

        {!!shippingAddresses.length && (
          <>
            {currentShippingAddress ? (
              <div>
                <AddressList
                  title="Shipping address entered by you"
                  addresses={currentShippingAddress}
                  selectedIndex={userSelectedShippingAddress}
                  setSelectedIndex={setUserSelectedShippingAddress}
                  disabled={disabled}
                  data-testid="select-userShippingAddress"
                />
              </div>
            ) : null}
            <div>
              <AddressList
                title="Shipping address recommended by UPS"
                addresses={shippingAddresses}
                selectedIndex={selectedShippingAddress}
                setSelectedIndex={setSelectedShippingAddress}
                disabled={disabled}
                data-testid="select-shippingAddressSuggestions"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-row items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={clearSuggestions}
          disabled={disabled}
          data-testid="button-editSelectSubmit"
        >
          Edit address
        </Button>

        <Button
          disabled={
            (billingAddresses.length > 0 &&
              selectedBillingAddress === undefined &&
              userSelectedBillingAddress === undefined) ||
            (shippingAddresses.length > 0 &&
              selectedShippingAddress === undefined &&
              userSelectedShippingAddress === undefined) ||
            disabled
          }
          onClick={() => onSubmit()}
          data-testid="button-addressSelectSubmit"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddressSelector;

const AddressList = ({
  title,
  addresses,
  selectedIndex,
  setSelectedIndex,
  disabled,
}: {
  readonly title: string;
  readonly addresses: ResponseAddress[];
  readonly selectedIndex?: number;
  readonly setSelectedIndex: (index: number) => void;
  readonly disabled: boolean;
}) => {
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-wurth-gray-800">{title}</h4>

      <ul className="flex flex-col gap-2">
        {addresses.map((address, index) => (
          <li key={index}>
            <Button
              variant="outline"
              className={cn(
                "flex h-fit w-full flex-row justify-start overflow-hidden rounded-lg border-2 border-wurth-gray-150 p-4",
                selectedIndex === index && "border-wurth-gray-800",
              )}
              onClick={() => setSelectedIndex(index)}
              disabled={disabled}
            >
              <CheckCircle
                className={cn(
                  "size-5 shrink-0 stroke-wurth-gray-150",
                  selectedIndex === index && "stroke-wurth-gray-800",
                )}
              />

              <FullAddress address={address} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
