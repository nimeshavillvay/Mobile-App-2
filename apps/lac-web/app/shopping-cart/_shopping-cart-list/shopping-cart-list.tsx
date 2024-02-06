"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import VisuallyHidden from "@/_components/visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSuspenseCart from "./use-suspense-cart.hook";

const formSchema = z.object({
  po: z.string().min(1, "Required"),
  jobName: z.string().min(1, "Required"),
});
type FormSchema = z.infer<typeof formSchema>;

type ShoppingCartTableProps = {
  accountToken: string;
};

const ShoppingCartList = ({ accountToken }: ShoppingCartTableProps) => {
  const cartQuery = useSuspenseCart(accountToken);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      po: cartQuery.data.configuration.po,
      jobName: cartQuery.data.configuration.jobName,
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log("> values: ", values);
  };

  return (
    <div className="max-w-desktop mx-auto">
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
                  <Input placeholder="Your PO#" {...field} />
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
                  <Input placeholder="Your job name" {...field} />
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
    </div>
  );
};

export default ShoppingCartList;
