"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CurrentUser } from "./types";
import useAddUserEmailMutation from "./use-add-user-email-mutation.hook";

type AddUserEmailProps = {
  currentUsers: CurrentUser[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenAddUserDataDialog: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

const AddUserEmailDialog = ({
  currentUsers,
  open,
  setOpen,
  setOpenAddUserDataDialog,
  setEmail,
}: AddUserEmailProps) => {
  const addUserEmailMutation = useAddUserEmailMutation();

  const addUserSchema = z.object({
    email: z
      .string()
      .email()
      .refine(
        (email) => {
          const userExists = currentUsers.find((currentUser) => {
            return currentUser.email == email;
          });
          if (userExists) return false;
          return true;
        },
        {
          message: "User is already assigned to this account",
        },
      ),
  });
  type AddUserSchema = z.infer<typeof addUserSchema>;

  const form = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = (data: AddUserSchema) => {
    addUserEmailMutation.mutate(
      { email: data.email },
      {
        onSuccess: () => {
          setOpenAddUserDataDialog(true);
          setEmail(data.email);
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>

          <FormDescription className="sr-only">
            Add a new user by entering the email
          </FormDescription>
        </DialogHeader>

        <div className="px-12 pb-12 pt-6">
          <p className="mb-4 text-center">
            Please enter your new user’s email address to add them
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="sr-only">Email</FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        type="email"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter new user&apos;s email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="block h-9 w-full rounded-[3px] bg-brand-primary px-4 text-base font-normal uppercase text-white"
              >
                Add user
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserEmailDialog;
