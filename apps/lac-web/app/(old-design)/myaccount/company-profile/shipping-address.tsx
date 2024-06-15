"use client";

import useSuspenseBillingAddress from "@/_hooks/address/use-suspense-billing-address.hook";
import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useSuspenseUsersList from "@/_hooks/user/use-suspense-users-list.hook";
import type { Address, AddressFormData } from "@/_lib/types";
import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import { useState } from "react";
import AddressDialog from "./address-dialog";
import AddressSuggestionDialog from "./address-suggestion-dialog";
import ShippingAddressCard from "./shipping-address-card";
import type { AddressCheckSuggestionsWithUuid } from "./types";

const emptyShippingAddress: Address = {
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

const ShippingAddress = ({ token }: { readonly token: string }) => {
  const [openShippingAddressDialog, setOpenShippingAddressDialog] =
    useState(false);

  const [
    openShippingAddressSuggestionDialog,
    setOpenShippingAddressSuggestionDialog,
  ] = useState(false);

  const [address, setAddress] = useState<AddressFormData>();
  const [addressCheckSuggestions, setAddressCheckSuggestions] =
    useState<AddressCheckSuggestionsWithUuid>();

  const billingAddressQuery = useSuspenseBillingAddress(token);
  const billingAddress = billingAddressQuery?.data;

  const shippingAddressQuery = useSuspenseShippingAddressList(token);
  const shippingAddresses = shippingAddressQuery?.data;

  const usersListQuery = useSuspenseUsersList(token);

  const { permission } = usersListQuery.data.manageContact.yourProfile;
  const isAdmin = permission.toLowerCase() === "admin";

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
        {shippingAddresses.map((address) => (
          <ShippingAddressCard
            key={address.xcAddressId}
            shippingAddress={address}
            soldTo={billingAddress.soldTo ?? ""}
            isAdmin={isAdmin}
          />
        ))}
        <button
          className="flex cursor-pointer flex-row items-center justify-center space-y-3 border-gray-100 bg-transparent p-5 text-center font-bold shadow hover:shadow-lg md:space-y-5 md:p-6"
          onClick={() => setOpenShippingAddressDialog(true)}
        >
          <span className="sr-only">Add shipping address</span>+ Add new
          shipping address
        </button>
      </div>

      <AddressDialog
        open={openShippingAddressDialog}
        setOpenAddressDialog={setOpenShippingAddressDialog}
        setOpenAddressSuggestionDialog={setOpenShippingAddressSuggestionDialog}
        setAddress={setAddress}
        setAddressCheckSuggestions={setAddressCheckSuggestions}
        isShippingAddress={true}
        isShippingAddressUpdate={false}
        address={emptyShippingAddress}
      />

      {!!addressCheckSuggestions && !!address && (
        <AddressSuggestionDialog
          open={openShippingAddressSuggestionDialog}
          setOpenAddressSuggestionDialog={
            setOpenShippingAddressSuggestionDialog
          }
          setOpenAddressDialog={setOpenShippingAddressDialog}
          setAddressCheckSuggestions={setAddressCheckSuggestions}
          addressCheckSuggestions={addressCheckSuggestions}
          isShippingAddress={true}
          isShippingAddressUpdate={false}
          address={address}
        />
      )}
    </>
  );
};

export default ShippingAddress;
