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
    <div>
      <h3>Email Exclusives</h3>
      <p>Sign up to receive promotions and special offers.</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center gap-2"
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
          className="flex-1"
        />

        <button className="bg-brand-primary p-2 uppercase text-white">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default EmailSignup;
