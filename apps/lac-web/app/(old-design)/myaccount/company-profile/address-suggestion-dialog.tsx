import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { Label } from "@/old/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/old/_components/ui/radio-group";
import { Dispatch, SetStateAction, useState } from "react";
import { SAP_ADDRESS_CHECK_RESPONSE } from "./mock-response";
import { Address, AddressCheckSuggestions, AddressFormData } from "./types";
import useAddShippingAddressMutation from "./use-add-shipping-address-mutation.hook";
import useUpdateBillingAddressMutation from "./use-update-billing-address-mutation.hook";
import useUpdateShippingAddressMutation from "./use-update-shipping-address-mutation.hook";

type AddressDialogProps = {
  open: boolean;
  setOpenAddressSuggestionDialog: Dispatch<SetStateAction<boolean>>;
  setOpenAddressDialog: Dispatch<SetStateAction<boolean>>;
  setAddressCheckSuggestions: (
    addressCheckSuggestions?: AddressCheckSuggestions,
  ) => void;
  addressCheckSuggestions: AddressCheckSuggestions;
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
  const [selectedAddressSuggestion, setSelectedAddressSuggestion] = useState(
    {} as Address,
  );

  const onAddressSuggestionChange = (addressSuggestion: string) => {
    setSelectedAddressSuggestion(JSON.parse(addressSuggestion) as Address);
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

  const onContinueOrSubmitButtonClicked = () => {
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
            onSuccess: () => {
              setOpenAddressDialog(false);
              setOpenAddressSuggestionDialog(false);

              //TODO: you must pass the response received by the mutation request as the argument for the following method
              // you must add mutate the response in such a way that each and every suggestion have a unique id. use nanoid package
              const response = SAP_ADDRESS_CHECK_RESPONSE;

              if (!response?.checkType) {
                setOpenAddressSuggestionDialog(false);
              } else {
                setAddressCheckSuggestions(response);
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
            onSuccess: () => {
              setOpenAddressDialog(false);
              setOpenAddressSuggestionDialog(false);

              //TODO: you must pass the response received by the mutation request as the argument for the following method
              const response = SAP_ADDRESS_CHECK_RESPONSE;

              if (!response?.checkType) {
                setOpenAddressSuggestionDialog(false);
              } else {
                setAddressCheckSuggestions(response);
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
          // TODO: the following should be as onSuccess: () => {
          onSuccess: () => {
            setOpenAddressDialog(false);
            setOpenAddressSuggestionDialog(false);

            //TODO: you must pass the response received by the mutation request as the argument for the following method
            // setAddressCheckSuggestions(UPS_ADDRESS_CHECK_RESPONSE);
            const response = SAP_ADDRESS_CHECK_RESPONSE;

            if (!response?.checkType) {
              setOpenAddressSuggestionDialog(false);
            } else {
              setAddressCheckSuggestions(response);
              setOpenAddressSuggestionDialog(true);
            }
          },
        },
      );
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
          {addressCheckSuggestions?.suggestions?.map(
            (addressSuggestion, index) => (
              <div
                key={index}
                className="mx-5 mt-1 flex cursor-default flex-row items-start gap-3 rounded border-2 border-gray-100 py-3 pl-5 shadow"
              >
                <RadioGroupItem value={JSON.stringify(addressSuggestion)} />

                <div className="flex flex-col font-bold text-brand-gray-500">
                  <Label className="font-bold text-brand-gray-500">
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
                  </Label>
                </div>
              </div>
            ),
          )}
        </RadioGroup>

        <div className="p-5 text-right">
          {addressCheckSuggestions?.suggestions?.length == 0 ? (
            <button
              onClick={onBackButtonClicked}
              className="mx-2rounded-[3px] border-2 border-gray-300 bg-transparent px-6 py-2 text-base font-normal uppercase text-black shadow"
            >
              BACK
            </button>
          ) : (
            <button
              onClick={onContinueOrSubmitButtonClicked}
              className="mx-2 rounded-[3px] bg-black px-6 py-2 text-base font-normal uppercase text-white"
            >
              {addressCheckSuggestions?.checkType == "ADDRESS"
                ? "CONTINUE"
                : "SUBMIT"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressSuggestionDialog;
