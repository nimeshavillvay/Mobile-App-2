"use client";

import { Button } from "@/(old-design)/_components/ui/button";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import AddressDialog from "./address-dialog";
import AddressSuggestionDialog from "./address-suggestion-dialog";
import { BillingAddress } from "./types";
import useSuspenseBillingAddressList from "./use-suspense-billing-address-list.hook";

const BillingAddress = ({ token }: { token: string }) => {
  const [openBillingAddressDialog, setOpenBillingAddressDialog] =
    useState(false);

  const [
    openBillingAddressSuggestionDialog,
    setOpenBillingAddressSuggestionDialog,
  ] = useState(false);

  const [address, setAddress] = useState(null);
  const [addressCheckSuggestions, setAddressCheckSuggestions] = useState(null);

  const billingAddressQuery = useSuspenseBillingAddressList(token);
  const billingAddress: BillingAddress = billingAddressQuery?.data;

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="mb-5 border-gray-100 bg-transparent p-3 shadow hover:shadow-lg">
          <h3 className="font-title text-xl font-bold">Billing Address</h3>
          <div className="flex flex-row gap-5 pt-2">
            <div className="my-auto flex-auto text-gray-500">
              <h3 className="text-sm font-bold  md:text-base">Address:</h3>
            </div>
            <div className="my-auto flex-auto">
              <p className="text-sm font-medium md:text-base">
                {billingAddress?.streetAddress}, {billingAddress?.locality},{" "}
                {billingAddress?.region},{" "}
                {billingAddress?.county?.length > 0
                  ? billingAddress?.county + ","
                  : ""}
                {billingAddress?.countryName}, {billingAddress?.postalCode}
                {billingAddress?.zip4?.length > 0
                  ? "- " + billingAddress?.zip4
                  : ""}
              </p>
            </div>
            <div className="flex-auto text-center">
              <Button
                variant="ghost"
                className="hover:bg-gray-200"
                onClick={() => setOpenBillingAddressDialog(true)}
              >
                <MdOutlineEdit className="text-2xl" />
              </Button>
            </div>
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
    </>
  );
};

export default BillingAddress;
