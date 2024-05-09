import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/old/_components/ui/radio-group";
import { nanoid } from "nanoid";
import { Dispatch, SetStateAction, useState } from "react";
import type {
  Address,
  AddressCheckSuggestions,
  AddressCheckSuggestionsWithUuid,
  AddressFormData,
} from "./types";
import useAddShippingAddressMutation from "./use-add-shipping-address-mutation.hook";
import useUpdateBillingAddressMutation from "./use-update-billing-address-mutation.hook";
import useUpdateShippingAddressMutation from "./use-update-shipping-address-mutation.hook";

type AddressDialogProps = {
  open: boolean;
  setOpenAddressSuggestionDialog: Dispatch<SetStateAction<boolean>>;
  setOpenAddressDialog: Dispatch<SetStateAction<boolean>>;
  setAddressCheckSuggestions: (
    addressCheckSuggestions?: AddressCheckSuggestionsWithUuid,
  ) => void;
  addressCheckSuggestions: AddressCheckSuggestionsWithUuid;
  isShippingAddress: boolean;
  isShippingAddressUpdate: boolean;
  address: AddressFormData;
};

const AddressSuggestionDialog = ({
  open,
  setOpenAddressSuggestionDialog,
  setOpenAddressDialog,
  setAddressCheckSuggestions,
  addressCheckSuggestions,
  isShippingAddress,
  isShippingAddressUpdate,
  address,
}: AddressDialogProps) => {
  const [selectedAddressSuggestionId, setSelectedAddressSuggestionId] =
    useState("");

  const selectedAddressSuggestion = addressCheckSuggestions.suggestions.find(
    (suggestion) => selectedAddressSuggestionId === suggestion?.uuid,
  );

  const onAddressSuggestionChange = (addressSuggestionUuid: string) => {
    setSelectedAddressSuggestionId(addressSuggestionUuid);
  };

  const onBackButtonClicked = () => {
    setOpenAddressSuggestionDialog(false);
    setOpenAddressDialog(true);
  };

  const addShippingAddressMutation = useAddShippingAddressMutation();
  const updateShippingAddressMutation = useUpdateShippingAddressMutation();
  const updateBillingAddressMutation = useUpdateBillingAddressMutation();

  const convertAddressSuggestionToFormDataFormat = (
    suggestion: Address,
  ): AddressFormData => {
    return {
      country: suggestion.countryName,
      county: suggestion.county ?? "",
      city: suggestion.locality,
      state: suggestion.region,
      addressLineOne: suggestion.streetAddress,
      zipCode: suggestion.postalCode,
      zip4: suggestion.zip4,
    };
  };

  const getAddressSuggestionsWithUuid = (
    data: AddressCheckSuggestions,
  ): AddressCheckSuggestionsWithUuid => {
    const suggestions = data.suggestions.map((suggestion) => {
      return { ...suggestion, uuid: nanoid() };
    });

    const addressSuggestions: AddressCheckSuggestionsWithUuid = {
      checkType: data.checkType,
      message: data.message,
      suggestions,
    };

    return addressSuggestions;
  };

  const onContinueOrSubmitButtonClicked = () => {
    if (selectedAddressSuggestion) {
      const selectedAddress = convertAddressSuggestionToFormDataFormat(
        selectedAddressSuggestion,
      );
      selectedAddress.skipAddressCheck = true;

      if (isShippingAddress) {
        if (isShippingAddressUpdate) {
          updateShippingAddressMutation.mutate(
            {
              xcAddressId: address.xcAddressId,
              shipTo: address.shipTo,
              company: address.company,
              phoneNumber: address.phoneNumber,
              ...selectedAddress,
            },
            {
              onSuccess: (data) => {
                setOpenAddressDialog(false);
                setOpenAddressSuggestionDialog(false);

                if ("checkType" in data) {
                  setAddressCheckSuggestions(
                    getAddressSuggestionsWithUuid(data),
                  );
                  setOpenAddressSuggestionDialog(true);
                }
              },
            },
          );
        } else {
          addShippingAddressMutation.mutate(
            {
              company: address.company,
              phoneNumber: address.phoneNumber,
              ...selectedAddress,
            },
            {
              onSuccess: (data) => {
                setOpenAddressDialog(false);
                setOpenAddressSuggestionDialog(false);

                if ("checkType" in data) {
                  setAddressCheckSuggestions(
                    getAddressSuggestionsWithUuid(data),
                  );
                  setOpenAddressSuggestionDialog(true);
                }
              },
            },
          );
        }
      } else {
        updateBillingAddressMutation.mutate(
          {
            company: address.company,
            phoneNumber: address.phoneNumber,
            ...selectedAddress,
          },
          {
            onSuccess: (data) => {
              setOpenAddressDialog(false);
              setOpenAddressSuggestionDialog(false);

              if ("checkType" in data) {
                setAddressCheckSuggestions(getAddressSuggestionsWithUuid(data));
                setOpenAddressSuggestionDialog(true);
              }
            },
          },
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpenAddressSuggestionDialog}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Address Suggestions</DialogTitle>
        </DialogHeader>

        <p className="mx-5 mb-1">{addressCheckSuggestions?.message}</p>

        <RadioGroup onValueChange={onAddressSuggestionChange}>
          {addressCheckSuggestions?.suggestions?.map((addressSuggestion) => (
            <div
              key={addressSuggestion?.uuid}
              className="mx-5 mt-1 flex cursor-default flex-row items-start gap-3 rounded border-2 border-gray-100 py-3 pl-5 shadow"
            >
              <RadioGroupItem value={addressSuggestion?.uuid} />

              <div className="font-bold text-brand-gray-500">
                {addressSuggestion?.streetAddress},{" "}
                {addressSuggestion?.locality}, {addressSuggestion?.region},{" "}
                {addressSuggestion?.county?.length ?? 0 > 0
                  ? addressSuggestion?.county + ","
                  : ""}
                {addressSuggestion?.countryName},{" "}
                {addressSuggestion?.postalCode}
                {addressSuggestion?.zip4?.length > 0
                  ? "- " + addressSuggestion?.zip4
                  : ""}
              </div>
            </div>
          ))}
        </RadioGroup>

        <div className="p-5 text-right">
          {addressCheckSuggestions?.suggestions?.length == 0 ? (
            <button
              onClick={onBackButtonClicked}
              className="mx-2rounded-[3px] border-2 border-gray-300 bg-transparent px-6 py-2 text-base font-normal uppercase text-black shadow"
            >
              back
            </button>
          ) : (
            <button
              onClick={onContinueOrSubmitButtonClicked}
              className="mx-2 rounded-[3px] bg-black px-6 py-2 text-base font-normal uppercase text-white"
            >
              {addressCheckSuggestions?.checkType == "ADDRESS"
                ? "continue"
                : "submit"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressSuggestionDialog;