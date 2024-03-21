"use client";

import Title from "@/old/_components/title";
import VisuallyHidden from "@/old/_components/visually-hidden";
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
    <div className="text-brand-gray-500">
      <Title className="text-[19px] leading-6" asChild>
        <h3>Email Exclusives</h3>
      </Title>
      <p className="mb-3 mt-1">
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
          className="h-9 flex-1 rounded px-2 placeholder:text-brand-gray-400"
        />

        <button className="h-9 rounded bg-brand-primary px-2 py-[7px] font-wurth text-base font-extrabold uppercase leading-[22px] text-white">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default EmailSignup;
