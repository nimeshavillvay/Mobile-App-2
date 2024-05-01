import { STATE } from "@/(old-design)/_lib/constants";
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UPS_ADDRESS_CHECK_RESPONSE } from "./mock-response";
import { Address, AddressCheckSuggestions, AddressFormData } from "./types";
import useAddShippingAddressMutation from "./use-add-shipping-address-mutation.hook";
import useUpdateBillingAddressMutation from "./use-update-billing-address-mutation.hook";
import useUpdateShippingAddressMutation from "./use-update-shipping-address-mutation.hook";

type AddressDialogProps = {
  open: boolean;
  setOpenAddressDialog: Dispatch<SetStateAction<boolean>>;
  setOpenAddressSuggestionDialog: Dispatch<SetStateAction<boolean>>;
  setAddress: Dispatch<SetStateAction<AddressFormData>>;
  setAddressCheckSuggestions: Dispatch<SetStateAction<AddressCheckSuggestions>>;
  isShippingAddress: boolean;
  isShippingAddressUpdate: boolean;
  address: Address;
};

const AddressDialog = ({
  open,
  setOpenAddressDialog,
  setOpenAddressSuggestionDialog,
  setAddress,
  setAddressCheckSuggestions,
  isShippingAddress,
  isShippingAddressUpdate,
  address,
}: AddressDialogProps) => {
  const addressDataSchema = z.object({
    county: z.string(),
    zip4: z.string().refine((value) => /^\d{0,10}$/.test(value), {
      message: "Please enter a valid ZIP4",
    }),
    company: z.string(),
    addressLineOne: z
      .string()
      .trim()
      .min(1, "Please enter address line one")
      .max(40),
    city: z.string().trim().min(1, "Please enter city").max(40),
    state: z.string().trim().min(1, "Please select a state").max(40),
    zipCode: z.string().refine((value) => /^\d+$/.test(value), {
      message: "Please enter a valid ZIP4",
    }),
    phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
      message: "Please enter a valid phone number",
    }),
    country: z.string().trim().min(1, "Please enter country").max(40),
  });

  type AddressDataSchema = z.infer<typeof addressDataSchema>;

  const form = useForm<AddressDataSchema>({
    resolver: zodResolver(addressDataSchema),
    defaultValues: {
      company: address.organization,
      addressLineOne: address.streetAddress,
      city: address.locality,
      state: address.region,
      zipCode: address.postalCode,
      phoneNumber: address.phoneNumber,
      zip4: address.zip4,
      country: address.countryName,
      county: address.county ?? undefined,
    },
  });

  const addShippingAddressMutation = useAddShippingAddressMutation();
  const updateShippingAddressMutation = useUpdateShippingAddressMutation();
  const updateBillingAddressMutation = useUpdateBillingAddressMutation();

  const onAddressSubmit = (data: AddressDataSchema) => {
    const addressData: AddressFormData = {
      company: data.company,
      addressLineOne: data.addressLineOne,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      phoneNumber: data.phoneNumber,
      zip4: data.zip4,
      country: data.country,
      county: data.county,
    };

    if (isShippingAddress) {
      if (isShippingAddressUpdate) {
        const requestData: AddressFormData = {
          xcAddressId: address.xcAddressId,
          shipTo: address.shipTo,
          ...addressData,
        };

        updateShippingAddressMutation.mutate(requestData, {
          onSuccess: () => {
            setOpenAddressDialog(false);

            //TODO: you must pass the response received by the mutation request as the argument for the following method
            setAddressCheckSuggestions(UPS_ADDRESS_CHECK_RESPONSE);

            setAddress(requestData);
            setOpenAddressSuggestionDialog(true);
          },
        });
      } else {
        addShippingAddressMutation.mutate(addressData, {
          onSuccess: () => {
            setOpenAddressDialog(false);

            //TODO: you must pass the response received by the mutation request as the argument for the following method
            setAddressCheckSuggestions(UPS_ADDRESS_CHECK_RESPONSE);

            setAddress(addressData);
            setOpenAddressSuggestionDialog(true);
          },
        });
      }
    } else {
      updateBillingAddressMutation.mutate(addressData, {
        // TODO: the following should be as onSuccess: () => {
        onError: () => {
          setOpenAddressDialog(false);

          //TODO: you must pass the response received by the mutation request as the argument for the following method
          setAddressCheckSuggestions(UPS_ADDRESS_CHECK_RESPONSE);

          setAddress(addressData);
          setOpenAddressSuggestionDialog(true);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpenAddressDialog}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isShippingAddress ? "Shipping Address" : "Billing Address"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onAddressSubmit)}
            className="space-y-4 p-5"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Company</FormLabel>
                    <FormDescription className="sr-only">
                      Company
                    </FormDescription>

                    <FormControl>
                      <Input placeholder="Attn" type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Address CompanyName
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="addressLineOne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Address Line 1*</FormLabel>
                    <FormDescription className="sr-only">
                      Address Line 1
                    </FormDescription>

                    <FormControl>
                      <Input
                        placeholder="Address Line 1"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Address Line 1
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">City*</FormLabel>
                    <FormDescription className="sr-only">City</FormDescription>

                    <FormControl>
                      <Input placeholder="City" type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter City
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">State*</FormLabel>
                    <FormDescription className="sr-only">State</FormDescription>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {STATE.map((state) => (
                          <SelectItem key={state?.id} value={state?.id}>
                            {state?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      Enter State
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">County</FormLabel>
                    <FormDescription className="sr-only">
                      County
                    </FormDescription>

                    <FormControl>
                      <Input placeholder="County" type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter County
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Country*</FormLabel>
                    <FormDescription className="sr-only">
                      Country
                    </FormDescription>

                    <FormControl>
                      <Input placeholder="Country" type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Country
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Zip Code*</FormLabel>
                      <FormDescription className="sr-only">
                        Zip Code
                      </FormDescription>

                      <FormControl>
                        <Input placeholder="Zip Code" type="text" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Zip Code
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Zip 4</FormLabel>
                      <FormDescription className="sr-only">
                        Zip 4
                      </FormDescription>

                      <FormControl>
                        <Input placeholder="Zip 4" type="text" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Zip 4
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Phone Number*</FormLabel>
                    <FormDescription className="sr-only">
                      Phone Number
                    </FormDescription>

                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Phone Number
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="h-9 rounded-[3px] bg-brand-primary px-4 text-base font-normal uppercase text-white"
              >
                Done
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
