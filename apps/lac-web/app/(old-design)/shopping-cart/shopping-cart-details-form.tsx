"use client";

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
import VisuallyHidden from "@/old/_components/visually-hidden";
import useSuspenseCart from "@/old/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartConfigMutation from "@/old/_hooks/cart/use-update-cart-config-mutation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  po: z.string().min(1, "Required"),
  jobName: z.string().min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;

type ShoppingCartDetailsFormProps = {
  accountToken: string;
};

const ShoppingCartDetailsForm = ({
  accountToken,
}: ShoppingCartDetailsFormProps) => {
  const { data } = useSuspenseCart(accountToken);

  const updateCartMutation = useUpdateCartConfigMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      po: data.configuration.po ?? "",
      jobName: data.configuration.jobName ?? "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    updateCartMutation.mutate({ configuration: values, step: "cart_meta" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-center justify-between gap-[30px]"
      >
        <FormField
          control={form.control}
          name="po"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel>
                PO# <span className="text-brand-primary">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your PO#"
                  disabled={updateCartMutation.isPending}
                  {...field}
                />
              </FormControl>

              <VisuallyHidden>
                <FormDescription>
                  This is the PO number for the order
                </FormDescription>
              </VisuallyHidden>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobName"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel>
                Job Name <span className="text-brand-primary">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Your job name"
                  disabled={updateCartMutation.isPending}
                  {...field}
                />
              </FormControl>

              <VisuallyHidden>
                <FormDescription>
                  This is the job name for the order
                </FormDescription>
              </VisuallyHidden>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex-1">Change Shipping Method</div>

        <div className="flex-1">Home Branch</div>
      </form>
    </Form>
  );
};

export default ShoppingCartDetailsForm;
