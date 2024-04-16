"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { useId } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});
type FormSchema = z.infer<typeof formSchema>;

const Subscribe = () => {
  const id = useId();
  const emailId = `email-${id}`;

  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log("> values: ", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <h3 className="text-center text-base font-semibold text-wurth-gray-800 md:text-left">
        Get the latest deals and more.
      </h3>

      <div className="flex flex-row items-center gap-2">
        <Label htmlFor={emailId} className="sr-only">
          Email
        </Label>

        <Input
          {...register("email")}
          id={emailId}
          type="email"
          required
          placeholder="Email"
          className="flex-1 rounded border-wurth-gray-250 shadow-sm"
        />

        <Button type="submit" className="shrink-0">
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default Subscribe;
