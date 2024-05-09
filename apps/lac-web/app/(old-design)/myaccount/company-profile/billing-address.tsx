"use client";

import { Button } from "@/(old-design)/_components/ui/button";
import useSuspenseBillingAddress from "@/_hooks/address/use-suspense-billing-address.hook";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import AddressDialog from "./address-dialog";
import AddressSuggestionDialog from "./address-suggestion-dialog";
import type { AddressCheckSuggestionsWithUuid, AddressFormData } from "./types";

const BillingAddress = ({ token }: { token: string }) => {
  const [openBillingAddressDialog, setOpenBillingAddressDialog] =
    useState(false);

  const [
    openBillingAddressSuggestionDialog,
    setOpenBillingAddressSuggestionDialog,
  ] = useState(false);

  const [address, setAddress] = useState<AddressFormData>();
  const [addressCheckSuggestions, setAddressCheckSuggestions] =
    useState<AddressCheckSuggestionsWithUuid>();

  const billingAddressQuery = useSuspenseBillingAddress(token);
  const billingAddress = billingAddressQuery?.data;

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="mb-5 border-gray-100 bg-transparent p-3 text-gray-500 shadow hover:shadow-lg">
          <h3 className="font-title text-xl font-bold">Billing Address</h3>
          <div className="flex flex-row gap-5 pt-2">
            <p className="my-auto flex-auto text-sm font-bold text-gray-500  md:text-base">
              Address:
            </p>
            <p className="my-auto flex-auto text-sm font-medium md:text-base">
              {billingAddress?.streetAddress}, {billingAddress?.locality},{" "}
              {billingAddress?.region},{" "}
              {billingAddress?.county?.length ?? 0 > 0
                ? billingAddress?.county + ","
                : ""}
              {billingAddress?.countryName}, {billingAddress?.postalCode}
              {billingAddress?.zip4?.length > 0
                ? "- " + billingAddress?.zip4
                : ""}
            </p>
            <Button
              variant="ghost"
              className="flex-auto text-center hover:bg-gray-200"
              onClick={() => setOpenBillingAddressDialog(true)}
            >
              <span className="sr-only">Edit Billing Address</span>
              <MdOutlineEdit className="text-2xl" />
            </Button>
          </div>
        </div>
      </div>

      <AddressDialog
        open={openBillingAddressDialog}
        setOpenAddressDialog={setOpenBillingAddressDialog}
        setOpenAddressSuggestionDialog={setOpenBillingAddressSuggestionDialog}
        setAddress={setAddress}
        setAddressCheckSuggestions={setAddressCheckSuggestions}
        isShippingAddress={false}
        isShippingAddressUpdate={false}
        address={billingAddress}
      />

      {!!addressCheckSuggestions && !!address && (
        <AddressSuggestionDialog
          open={openBillingAddressSuggestionDialog}
          setOpenAddressSuggestionDialog={setOpenBillingAddressSuggestionDialog}
          setOpenAddressDialog={setOpenBillingAddressDialog}
          setAddressCheckSuggestions={setAddressCheckSuggestions}
          addressCheckSuggestions={addressCheckSuggestions}
          isShippingAddress={false}
          isShippingAddressUpdate={false}
          address={address}
        />
      )}
    </>
  );
};

export default BillingAddress;
