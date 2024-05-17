import useAddShippingAddressMutation from "@/(old-design)/myaccount/company-profile/use-add-shipping-address-mutation.hook";
import useCounties from "@/_hooks/registration/use-counties.hook";
import useCountries from "@/_hooks/registration/use-countries.hook";
import useStates from "@/_hooks/registration/use-states.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import { Input } from "@repo/web-ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  state: z.string().min(1),
  county: z.string().min(1),
  postCode: z.string().min(5),
  zip: z.string().optional(),
});

type AddShippingAddressDialogProps = {
  open: boolean;
  closeDialog: () => void;
};

const AddShippingAddressDialog = ({
  open,
  closeDialog,
}: AddShippingAddressDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      city: "",
      country: "",
      state: "",
      county: "",
      postCode: "",
      zip: "",
    },
  });

  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  const countriesQuery = useCountries();
  const statesQuery = useStates(selectedCountry);
  const countiesQuery = useCounties(selectedState);

  const addShippingAddressMutation = useAddShippingAddressMutation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addShippingAddressMutation.mutate(
      {
        country: values.country,
        county: values.county,
        city: values.city,
        company: "",
        phoneNumber: "244234",
        state: values.state,
        addressLineOne: values.address,
        zipCode: values.postCode,
        zip4: values.zip,
      },
      {
        onSuccess: (data) => {
          if ("xcAddressId" in data) {
            form.reset();
            closeDialog();
          }
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          closeDialog();
        }
      }}
    >
      <DialogContent className="max-w-[27.75rem]">
        <DialogHeader>
          <DialogTitle>Add New Shipping Address</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid-col-6 grid gap-4"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Street address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your street name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your city
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {countriesQuery.data?.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription className="sr-only">
                    Select your country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedCountry}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {statesQuery.data?.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription className="sr-only">
                    Select your country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>County</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedState}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="County" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {countiesQuery.data?.map(({ county }) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription className="sr-only">
                    Select your country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postCode"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Zip/Post code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip/Post code" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your postal code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Zip4 (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip4 (Optional)" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your Zip4
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="col-span-6">
              <Button
                variant="outline"
                type="button"
                className="font-bold shadow-md"
                onClick={() => {
                  form.reset();
                  closeDialog();
                }}
              >
                Back
              </Button>

              <Button type="submit" className="font-bold shadow-md">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingAddressDialog;
