"use client";

import { Role } from "@/(old-design)/_lib/types";
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
  FormLabel,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { MdPermIdentity } from "react-icons/md";
import * as z from "zod";
import useAddUserDataMutation from "./use-add-user-data-mutation.hook";

const USER_PERMISSIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Buyer", value: "BUYER" },
] as const;

const addUserDataSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter first name.").max(40),
  lastName: z.string().trim().min(1, "Please enter last name.").max(40),
  jobTitle: z.string().min(1, "Please enter job title."),
  permission: z.string().min(1, "Please enter permission type."),
});
type AddUserDataSchema = z.infer<typeof addUserDataSchema>;

type AddUserDataProps = {
  jobRoles: Role[];
  open: boolean;
  email: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddUserDataDialog = ({
  jobRoles,
  open,
  email,
  setOpen,
}: AddUserDataProps) => {
  const addUserDataMutation = useAddUserDataMutation();

  const form = useForm<AddUserDataSchema>({
    resolver: zodResolver(addUserDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      permission: "",
    },
  });

  const onSubmit = (data: AddUserDataSchema) => {
    addUserDataMutation.mutate(
      {
        firstName: data.firstName,
        email: email,
        jobTitle: data.jobTitle,
        lastName: data.lastName,
        permission: data.permission,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>

          <FormDescription className="sr-only">
            Add a new user by entering the email
          </FormDescription>
        </DialogHeader>

        <div className="px-5 pb-8 pt-2">
          <div className="m-auto max-w-[300px] text-center">
            <MdPermIdentity className="m-auto text-8xl leading-none text-brand-gray-500" />

            <p className="text-brand-primary">User Not Found!</p>

            <p className="mb-5">
              Please provide following details to add{" "}
              <span className="text-[#0056B3]">{email}</span> to this account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">First Name*</FormLabel>
                      <FormDescription className="sr-only">
                        Email
                      </FormDescription>

                      <FormControl>
                        <Input
                          placeholder="First name"
                          type="text"
                          required
                          {...field}
                        />
                      </FormControl>

                      <FormDescription className="sr-only">
                        Enter new user&apos;s first name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Last Name*</FormLabel>
                      <FormDescription className="sr-only">
                        Last name
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          type="text"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter new user&apos;s last name
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0.5">
                      <FormLabel className="font-bold">Job Title</FormLabel>

                      <FormDescription className="sr-only">
                        Job Title
                      </FormDescription>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                            <SelectValue placeholder="Job Title" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {jobRoles.map((role) => (
                            <SelectItem key={role?.code} value={role?.code}>
                              {role?.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormDescription className="sr-only">
                        This is the job title for selected user
                      </FormDescription>

                      <FormMessage className="text-xs dark:text-brand-primary" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="permission"
                  render={({ field }) => (
                    <FormItem className="mb-2 flex-1 space-y-0.5">
                      <FormLabel className="font-bold">Permission*</FormLabel>

                      <FormDescription className="sr-only">
                        Permission
                      </FormDescription>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                            <SelectValue placeholder="Permission" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {USER_PERMISSIONS.map((permission) => (
                            <SelectItem
                              value={permission?.value}
                              key={permission?.value}
                            >
                              {permission?.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormDescription className="sr-only">
                        This is the permission of your profile
                      </FormDescription>

                      <FormMessage className="text-xs dark:text-brand-primary" />
                    </FormItem>
                  )}
                />
              </div>

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

export default AddUserDataDialog;
