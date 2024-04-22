import { STATE } from "@/(old-design)/_lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/old/_components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SAP_ADDRESS_CHECK_RESPONSE } from "./mock-response";
import useAddShippingAddressMutation from "./use-add-shipping-address-mutation.hook";
import useUpdateBillingAddressMutation from "./use-update-billing-address-mutation.hook";
import useUpdateShippingAddressMutation from "./use-update-shipping-address-mutation.hook";

type AddressDialogProps = {
  open: boolean;
  setOpenAddressSuggestionDialog: Dispatch<SetStateAction<boolean>>;
  setOpenAddressDialog: Dispatch<SetStateAction<boolean>>;
  setAddressCheckSuggestions: Dispatch<SetStateAction<any>>;
  addressCheckSuggestions: any;
  isShippingAddress: boolean;
  isShippingAddressUpdate: boolean;
  address: any;
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
    {} as any,
  );

  const onAddressSuggestionChange = (addressSuggestion: any) => {
    setSelectedAddressSuggestion(addressSuggestion);
  };

  const onBackButtonClicked = () => {
    setOpenAddressSuggestionDialog(false);
    setOpenAddressDialog(true);
  };

  const addShippingAddressMutation = useAddShippingAddressMutation();
  const updateShippingAddressMutation = useUpdateShippingAddressMutation();
  const updateBillingAddressMutation = useUpdateBillingAddressMutation();

  const onContinueButtonClicked = () => {
    selectedAddressSuggestion.skipAddressCheck = true;

    if (isShippingAddress) {
      if (isShippingAddressUpdate) {
        updateShippingAddressMutation.mutate(
          {
            xcAddressId: address.xcAddressId,
            shipTo: address.shipTo,
            default: address.default,
            company: address.company,
            phoneNumber: address.phoneNumber,
            ...selectedAddressSuggestion,
          },
          {
            onSuccess: () => {
              setOpenAddressDialog(false);
              setOpenAddressSuggestionDialog(false);
              //TODO: you must pass the response received by the mutation request as the argument for the following method
              setAddressCheckSuggestions(SAP_ADDRESS_CHECK_RESPONSE);
              setOpenAddressSuggestionDialog(true);
            },
          },
        );
      } else {
        addShippingAddressMutation.mutate(
          {
            default: address.default,
            company: address.company,
            phoneNumber: address.phoneNumber,
            ...selectedAddressSuggestion,
          },
          {
            onSuccess: () => {
              setOpenAddressDialog(false);
              setOpenAddressSuggestionDialog(false);
              //TODO: you must pass the response received by the mutation request as the argument for the following method
              setAddressCheckSuggestions(SAP_ADDRESS_CHECK_RESPONSE);
              setOpenAddressSuggestionDialog(true);
            },
          },
        );
      }
    } else {
      updateBillingAddressMutation.mutate(
        {
          company: address.company,
          phoneNumber: address.phoneNumber,
          ...selectedAddressSuggestion,
        },
        {
          // TODO: the following should be as onSuccess: () => {
          onError: () => {
            setOpenAddressDialog(false);
            setOpenAddressSuggestionDialog(false);

            //TODO: you must pass the response received by the mutation request as the argument for the following method
            // setAddressCheckSuggestions(UPS_ADDRESS_CHECK_RESPONSE);
            setAddressCheckSuggestions(SAP_ADDRESS_CHECK_RESPONSE);
            setOpenAddressSuggestionDialog(true);
          },
        },
      );
    }
  };

  const onSubmitButtonClicked = () => {
    if (isShippingAddress) {
      if (isShippingAddressUpdate) {
        updateShippingAddressMutation.mutate(
          {
            xcAddressId: address.xcAddressId,
            shipTo: address.shipTo,
            default: address.default,
            company: address.company,
            phoneNumber: address.phoneNumber,
            ...selectedAddressSuggestion,
          },
          {
            onSuccess: () => {
              setOpenAddressDialog(false);
              setOpenAddressSuggestionDialog(false);
            },
          },
        );
      } else {
        addShippingAddressMutation.mutate(
          {
            default: address.default,
            company: address.company,
            phoneNumber: address.phoneNumber,
            ...selectedAddressSuggestion,
          },
          {
            onSuccess: () => {
              setOpenAddressDialog(false);
              setOpenAddressSuggestionDialog(false);
            },
          },
        );
      }
    } else {
      updateBillingAddressMutation.mutate(
        {
          company: address.company,
          phoneNumber: address.phoneNumber,
          ...selectedAddressSuggestion,
        },
        {
          // TODO: the following should be as onSuccess: () => {
          onError: () => {
            setOpenAddressDialog(false);
            setOpenAddressSuggestionDialog(false);
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

        <div className="mx-5">
          <p className="mb-1">{addressCheckSuggestions?.message}</p>
        </div>

        <RadioGroup onValueChange={onAddressSuggestionChange}>
          {addressCheckSuggestions?.suggestions?.map(
            (addressSuggestion: any, index: number) => (
              <div
                key={index}
                className="mx-5 mt-1 flex cursor-default flex-row items-start gap-3 rounded border-2 border-gray-100 py-3 pl-5 shadow"
              >
                <RadioGroupItem value={addressSuggestion} />

                <div className="flex flex-col font-bold text-brand-gray-500">
                  <Label className="font-bold text-brand-gray-500">
                    {addressSuggestion?.streetAddress},{" "}
                    {addressSuggestion?.locality}, {addressSuggestion?.region},{" "}
                    {addressSuggestion?.county?.length > 0
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
          ) : addressCheckSuggestions?.checkType == "ADDRESS" ? (
            <button
              onClick={onContinueButtonClicked}
              className="mx-2 rounded-[3px] bg-black px-6 py-2 text-base font-normal uppercase text-white"
            >
              CONTINUE
            </button>
          ) : (
            <button
              onClick={onSubmitButtonClicked}
              className="mx-2 rounded-[3px] bg-black px-6 py-2 text-base font-normal uppercase text-white"
            >
              SUBMIT
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressSuggestionDialog;
