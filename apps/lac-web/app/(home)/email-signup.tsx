"use client";

import VisuallyHidden from "@/_components/visually-hidden";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label";
import { useId } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
});
type Schema = z.infer<typeof schema>;

const EmailSignup = () => {
  const id = useId();
  const emailId = `email-${id}`;
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    console.log(data);
  };

  return (
    <div className="text-very-dark-gray">
      <h3 className="text-[19px] font-medium leading-6">Email Exclusives</h3>
      <p className="mb-3 mt-1 text-[15px] leading-5">
        Sign up to receive promotions and special offers.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center gap-1"
      >
        <VisuallyHidden>
          <Label.Root htmlFor={emailId}>Email</Label.Root>
        </VisuallyHidden>

        <input
          {...register("email")}
          id={emailId}
          type="email"
          required
          placeholder="Enter your Email to sign up"
          className="placeholder:text-brand-dark-gray h-9 flex-1 rounded px-2 text-[15px] leading-5"
        />

        <button className="bg-brand-primary h-9 rounded px-2 py-[7px] text-base font-extrabold uppercase leading-[22px] text-white">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default EmailSignup;
