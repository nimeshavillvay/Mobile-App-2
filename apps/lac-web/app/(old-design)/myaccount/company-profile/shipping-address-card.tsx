import { Button } from "@/(old-design)/_components/ui/button";
import { useState } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import AddressDialog from "./address-dialog";
import AddressSuggestionDialog from "./address-suggestion-dialog";
import { Address, AddressCheckSuggestions, AddressFormData } from "./types";
import useDeleteShippingAddressMutation from "./use-delete-shipping-address-mutation.hook";
import useUpdateShippingAddressMutation from "./use-update-shipping-address-mutation.hook";

const ShippingAddressCard = ({
  shippingAddress,
}: {
  shippingAddress: Address;
  index: number;
}) => {
  const [openShippingAddressDialog, setOpenShippingAddressDialog] =
    useState(false);

  const [
    openShippingAddressSuggestionDialog,
    setOpenShippingAddressSuggestionDialog,
  ] = useState(false);

  const [address, setAddress] = useState({} as AddressFormData);
  const [addressCheckSuggestions, setAddressCheckSuggestions] = useState(
    {} as AddressCheckSuggestions,
  );

  const updateShippingAddressMutation = useUpdateShippingAddressMutation();
  const deleteShippingAddressMutation = useDeleteShippingAddressMutation();

  return (
    <>
      <div className="flex flex-row space-y-3 border-gray-100 bg-transparent p-5 shadow hover:shadow-lg md:space-y-5 md:p-6">
        <div className="flex-auto gap-3 text-gray-500 md:flex-row md:items-center md:gap-6">
          <h3 className="font-title text-xl font-bold uppercase">
            {shippingAddress?.organization}
          </h3>
          <p className="text-sm font-medium md:text-base">
            {shippingAddress?.streetAddress}, {shippingAddress?.locality},{" "}
            {shippingAddress?.region}, {shippingAddress?.postalCode}
            <br />
            <span className="font-bold">Phone:</span>{" "}
            {shippingAddress.phoneNumber}
          </p>
          {!shippingAddress?.default ? (
            <Button
              variant="ghost"
              onClick={() =>
                updateShippingAddressMutation.mutate({
                  shipTo: shippingAddress.shipTo,
                  default: true,
                } as AddressFormData)
              }
            >
              <span className="p-1 font-bold hover:bg-gray-200">
                Set Default
              </span>
            </Button>
          ) : (
            <p className="p-1 font-bold text-brand-secondary">Default</p>
          )}
        </div>
        <div className="w-20 text-center">
          <Button
            variant="ghost"
            className="hover:bg-gray-200"
            onClick={() => setOpenShippingAddressDialog(true)}
          >
            <MdOutlineEdit className="text-2xl" />
          </Button>

          <Button
            variant="ghost"
            className="hover:bg-gray-200"
            onClick={() =>
              deleteShippingAddressMutation.mutate(
                shippingAddress.shipTo as string,
              )
            }
          >
            <MdOutlineDelete className="text-2xl" />
          </Button>
        </div>
      </div>

      <AddressDialog
        open={openShippingAddressDialog}
        setOpenAddressDialog={setOpenShippingAddressDialog}
        setOpenAddressSuggestionDialog={setOpenShippingAddressSuggestionDialog}
        setAddress={setAddress}
        setAddressCheckSuggestions={setAddressCheckSuggestions}
        isShippingAddress={true}
        isShippingAddressUpdate={true}
        address={shippingAddress}
      />

      <AddressSuggestionDialog
        open={openShippingAddressSuggestionDialog}
        setOpenAddressSuggestionDialog={setOpenShippingAddressSuggestionDialog}
        setOpenAddressDialog={setOpenShippingAddressDialog}
        setAddressCheckSuggestions={setAddressCheckSuggestions}
        addressCheckSuggestions={addressCheckSuggestions}
        isShippingAddress={true}
        isShippingAddressUpdate={true}
        address={address}
      />
    </>
  );
};

export default ShippingAddressCard;
