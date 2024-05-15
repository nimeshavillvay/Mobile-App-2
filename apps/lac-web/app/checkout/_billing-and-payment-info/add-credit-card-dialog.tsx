import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Input, inputStyles } from "@repo/web-ui/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddCreditCardMutation from "./use-add-credit-card-mutation.hook";
import useSuspenseCreditCardSignature from "./use-suspense-credit-card-signature.hook";

const formSchema = z.object({
  name: z.string().min(2),
  token: z.string().min(16, {
    message: "Please enter a valid card number.",
  }),
  brand: z.string().min(1),
  date: z.string().min(5),
  save: z.boolean(),
});

type AddCreditCardDialogProps = {
  token: string;
};

const AddCreditCardDialog = ({ token }: AddCreditCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const creditCardSignatureQuery = useSuspenseCreditCardSignature(token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      token: "",
      brand: "",
      date: "",
      save: true,
    },
  });

  const addCreditCardMutation = useAddCreditCardMutation();

  const onSubmit = form.handleSubmit((values) => {
    addCreditCardMutation.mutate(
      {
        token: values.token,
        expDate: values.date,
        holderName: values.name,
        type: values.brand,
        defaultCard: false,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  });

  useEffect(() => {
    // Listener for the token returned from the Snappay iframe
    const eventListener = (event: MessageEvent) => {
      if (typeof event.data === "string" && event.data.includes("token")) {
        const pairs = event.data.split("&");

        pairs.forEach((pair) => {
          const [key, value] = pair.split("=");

          if (key === "token") {
            if (value) {
              form.setValue("token", value ?? "");
            } else {
              form.setError("token", {
                message: "Please enter a valid card number.",
              });
            }
          } else if (key === "brand") {
            form.setValue("brand", value ?? "");
          }
        });
      }
    };

    window.addEventListener("message", eventListener, false);

    return () => {
      window.removeEventListener("message", eventListener, false);
    };
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-fit font-bold shadow-md">
          <Plus width={16} height={16} />

          <span>Add new card</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[27.75rem]">
        <DialogHeader>
          <DialogTitle>Add Credit Card</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on card</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is the name of the holder of the card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card number</FormLabel>
                  <FormControl>
                    <>
                      <iframe
                        title="Snappay credit card iframe"
                        src={`${process.env.NEXT_PUBLIC_SNAPPAY_URL}/Interop/InteropRequest?reqno=${creditCardSignatureQuery.data.requestId}`}
                        className={cn(
                          inputStyles(),
                          "block w-full px-0 py-0 [&_input]:!p-0",
                        )}
                      />

                      <Input
                        placeholder="MM / YY"
                        type="hidden"
                        id="token"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <FormDescription className="sr-only">
                    The card number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="sr-only">
                  <FormLabel>Name on card</FormLabel>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the holder of the card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM / YY" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    The expiration data of the card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="save"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="overflow-hidden rounded-sm"
                    />
                  </FormControl>

                  <FormLabel>Save for future</FormLabel>

                  <FormDescription className="sr-only">
                    Save the card for future purchases
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="self-end">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditCardDialog;
