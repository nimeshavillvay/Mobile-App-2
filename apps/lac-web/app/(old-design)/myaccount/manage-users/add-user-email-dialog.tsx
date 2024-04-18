"use client";

import { Button } from "@/old/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
    defaultValues: {
      email: "",
    },
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
          <DialogTitle className="text-left font-wurth">Add User</DialogTitle>

          <DialogDescription className="sr-only">
            Add a new user by entering the email address
          </DialogDescription>
        </DialogHeader>

        <div className="px-12 pb-12 pt-6">
          <p className="mb-4 text-center">
            Please enter your new user&apos;s email address to add them
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className="sr-only">
                      Enter email address for the new user
                    </FormDescription>

                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        type="email"
                        required
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full text-base">
                Add user
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserEmailDialog;
