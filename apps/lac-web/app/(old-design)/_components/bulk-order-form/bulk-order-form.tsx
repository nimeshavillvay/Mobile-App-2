"use client";

import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdAdd, MdCheck } from "react-icons/md";
import * as z from "zod";
import Separator from "../separator";
import useGetStatusMutation from "./use-get-status-mutation.hook";

const formSchema = z.object({
  cart: z
    .object({
      sku: z.string().min(1),
      description: z.string().optional(),
      quantity: z.number().min(1),
      jobName: z.string().optional(),
      availability: z.string().optional(),
    })
    .array(),
});
type FormSchema = z.infer<typeof formSchema>;

const BulkOrderForm = () => {
  const id = useId();

  const { control, handleSubmit, register } = useForm<FormSchema>({
    defaultValues: {
      cart: [{ sku: "PROMD3-SCP", quantity: 2, jobName: "job1" }],
    },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });
  const { fields, append, update } = useFieldArray({
    name: "cart",
    control,
  });

  const getStatusMutation = useGetStatusMutation();

  const onSubmit = async (values: FormSchema) => {
    const response = await getStatusMutation.mutateAsync(values.cart);

    response.forEach((item, index) => {
      const value = values.cart[index];

      if (value) {
        update(index, {
          ...value,
          description: item.txt_product_summary,
          availability: item.availability,
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-brand-gray-500 font-wurth text-xl font-medium leading-6">
        Forgot Something? Add More Items to this Cart.
      </h3>

      <div className="flex flex-row items-center justify-end gap-1 py-2.5">
        <button className="bg-brand-primary font-wurth rounded-sm px-3 py-1.5 text-base font-extrabold uppercase leading-[22px] text-white">
          Delete
        </button>

        <button className="bg-brand-gray-200 font-wurth text-brand-gray-500 rounded-sm px-3 py-1.5 text-base font-extrabold uppercase leading-[22px]">
          Use large order pad
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item #*</TableHead>

            <TableHead>Description</TableHead>

            <TableHead>Qty *</TableHead>

            <TableHead>PO/Job Name</TableHead>

            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell>
                <Label htmlFor={`sku-${index}-${id}`} className="sr-only">
                  Item SKU/Part #
                </Label>

                <Input
                  id={`sku-${index}-${id}`}
                  placeholder="Item SKU/Part #"
                  className="h-7"
                  {...register(`cart.${index}.sku` as const, {
                    required: true,
                  })}
                />
              </TableCell>

              <TableCell>{field.description}</TableCell>

              <TableCell>
                <Label htmlFor={`quantity-${index}-${id}`} className="sr-only">
                  Quantity
                </Label>

                <Input
                  id={`quantity-${index}-${id}`}
                  placeholder="Qty"
                  type="number"
                  min={1}
                  className="h-7"
                  {...register(`cart.${index}.quantity` as const, {
                    required: true,
                  })}
                />
              </TableCell>

              <TableCell>
                <Label htmlFor={`jobName-${index}-${id}`} className="sr-only">
                  PO/Job name
                </Label>

                <Input
                  id={`jobName-${index}-${id}`}
                  placeholder="PO/Job name"
                  className="h-7"
                  {...register(`cart.${index}.jobName` as const)}
                />
              </TableCell>

              <TableCell className="text-2xl leading-none">
                {field.availability === "available" && (
                  <MdCheck className="text-brand-success" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <button
          type="button"
          className="flex flex-row items-center gap-1 text-sm font-semibold"
          onClick={() => append({ sku: "", quantity: 0 })}
        >
          <MdAdd />

          <span>Add more items</span>
        </button>
      </div>

      <Separator
        orientation="horizontal"
        className="my-4 h-px w-full bg-black/10"
      />

      <div className="flex flex-row items-center justify-between">
        <button
          type="reset"
          className="font-wurth bg-brand-gray-200 text-brand-gray-500 rounded-sm px-3.5 py-2 font-extrabold uppercase"
        >
          Clear form
        </button>

        <button
          type="submit"
          className="font-wurth bg-brand-primary rounded-sm px-3.5 py-2 font-extrabold uppercase text-white"
        >
          Validate
        </button>
      </div>
    </form>
  );
};

export default BulkOrderForm;
