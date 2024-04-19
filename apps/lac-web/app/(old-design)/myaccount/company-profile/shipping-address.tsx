"use client";

import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import { useState } from "react";
import AddressDialog from "./address-dialog";
import AddressSuggestionDialog from "./address-suggestion-dialog";
import ShippingAddressCard from "./shipping-address-card";
import { ShippingAddress } from "./types";
import useSuspenseShippingAddressList from "./use-suspense-shipping-address-list.hook";

const emptyShippingAddress: ShippingAddress = {
  xcAddressId: "",
  countryName: "",
  county: "",
  locality: "",
  organization: "",
  phoneNumber: "",
  region: "",
  streetAddress: "",
  postalCode: "",
  zip4: "",
  shipTo: "",
  default: false,
};

const ShippingAddress = ({ token }: { token: string }) => {
  const [openShippingAddressDialog, setOpenShippingAddressDialog] =
    useState(false);

  const [
    openShippingAddressSuggestionDialog,
    setOpenShippingAddressSuggestionDialog,
  ] = useState(false);

  const [addressCheckSuggestions, setAddressCheckSuggestions] = useState(null);

  const shippingAddressQuery = useSuspenseShippingAddressList(token);
  const shippingAddresses: ShippingAddress[] = shippingAddressQuery?.data;

  return (
    <>
      <div className="mb-4 flex flex-row items-center gap-2.5">
        <Title className="relative font-wurth text-xl font-medium text-brand-primary">
          Shipping Addresses
        </Title>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {shippingAddresses.map((address, index) => (
          <ShippingAddressCard
            key={address.xcAddressId}
            shippingAddress={address}
            index={index}
          ></ShippingAddressCard>
        ))}
        <div
          className="flex cursor-pointer flex-row space-y-3 border-gray-100 bg-transparent p-5 shadow hover:shadow-lg md:space-y-5 md:p-6"
          onClick={() => setOpenShippingAddressDialog(true)}
        >
          <div className="flex-auto p-10 text-center font-bold">
            + Add new shipping address
          </div>
        </div>
      </div>

      <AddressDialog
        open={openShippingAddressDialog}
        setOpenAddressDialog={setOpenShippingAddressDialog}
        setOpenAddressSuggestionDialog={setOpenShippingAddressSuggestionDialog}
        setAddressCheckSuggestions={setAddressCheckSuggestions}
        isShippingAddress={true}
        isShippingAddressUpdate={false}
        address={emptyShippingAddress}
      />

      <AddressSuggestionDialog
        open={openShippingAddressSuggestionDialog}
        setOpenAddressSuggestionDialog={setOpenShippingAddressSuggestionDialog}
        setOpenAddressDialog={setOpenShippingAddressDialog}
        addressCheckSuggestions={addressCheckSuggestions}
      />
    </>
  );
};

export default ShippingAddress;
