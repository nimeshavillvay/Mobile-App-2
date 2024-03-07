"use client";

import Separator from "@/old/_components/separator";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  code: z.string().min(1, { message: "Required" }),
});
type Schema = z.infer<typeof schema>;

const PromoCodeForm = () => {
  const id = useId();
  const codeId = `code-${id}`;

  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: Schema) => {
    console.log("> onSubmit: ", values);
  };

  return (
    <div>
      <h4 className="font-wurth text-[19px] font-medium leading-6 text-brand-gray-500">
        Promo Code
      </h4>

      <Separator
        orientation="horizontal"
        className="mb-5 mt-2 h-px w-full bg-brand-gray-500"
      />

      <form
        className="flex h-7 flex-row items-center gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor={codeId} className="sr-only">
          Coupon Code
        </Label>

        <Input id={codeId} className="h-full px-2" {...register("code")} />

        <button
          type="submit"
          className="h-full rounded-sm bg-brand-gray-200 px-2.5 font-wurth text-base font-extrabold uppercase leading-5 text-brand-gray-500"
        >
          Redeem
        </button>
      </form>
    </div>
  );
};

export default PromoCodeForm;
