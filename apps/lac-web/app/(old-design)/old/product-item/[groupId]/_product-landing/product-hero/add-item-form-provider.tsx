"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { addItemSchema, type AddItemSchema } from "./helpers";

type AddItemFormProviderProps = {
  children: ReactNode;
  minOrder: number;
  qtyIncrements: number;
};

const AddItemFormProvider = ({
  children,
  minOrder,
  qtyIncrements,
}: AddItemFormProviderProps) => {
  const methods = useForm<AddItemSchema>({
    resolver: zodResolver(
      addItemSchema.merge(
        z.object({
          quantity: z.number().int().gte(minOrder).multipleOf(qtyIncrements),
        }),
      ),
    ),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default AddItemFormProvider;
